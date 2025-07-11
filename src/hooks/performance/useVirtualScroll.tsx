// src/hooks/performance/useVirtualScroll.tsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface VirtualScrollConfig {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  data: any[];
}

export const useVirtualScroll = ({
  itemHeight,
  containerHeight,
  overscan = 3,
  data
}: VirtualScrollConfig) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Calcular itens visíveis
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      data.length - 1
    );

    // Adicionar overscan para melhor performance
    const overscanStartIndex = Math.max(0, startIndex - overscan);
    const overscanEndIndex = Math.min(data.length - 1, endIndex + overscan);

    return {
      startIndex: overscanStartIndex,
      endIndex: overscanEndIndex,
      visibleStartIndex: startIndex,
      visibleEndIndex: endIndex
    };
  }, [scrollTop, itemHeight, containerHeight, data.length, overscan]);

  // Itens virtualizados
  const virtualItems = useMemo(() => {
    const items = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      items.push({
        index: i,
        data: data[i],
        offsetTop: i * itemHeight,
        isVisible: i >= visibleRange.visibleStartIndex && i <= visibleRange.visibleEndIndex
      });
    }
    return items;
  }, [visibleRange, data, itemHeight]);

  // Handler de scroll otimizado
  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Scroll suave para índice específico
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (scrollElementRef.current) {
      const top = index * itemHeight;
      scrollElementRef.current.scrollTo({
        top,
        behavior
      });
    }
  }, [itemHeight]);

  // Scroll suave para item específico
  const scrollToItem = useCallback((item: any, behavior: ScrollBehavior = 'smooth') => {
    const index = data.findIndex(d => d === item || d.id === item.id);
    if (index !== -1) {
      scrollToIndex(index, behavior);
    }
  }, [data, scrollToIndex]);

  // Setup do event listener
  useEffect(() => {
    const element = scrollElementRef.current;
    if (!element) return;

    // Usar requestAnimationFrame para throttle do scroll
    let ticking = false;
    const throttledHandleScroll = (e: Event) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    element.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  // Altura total do conteúdo virtual
  const totalHeight = data.length * itemHeight;

  // Offset do espaçador superior
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    scrollElementRef,
    virtualItems,
    totalHeight,
    offsetY,
    scrollToIndex,
    scrollToItem,
    visibleRange,
    scrollTop
  };
};

export default useVirtualScroll;