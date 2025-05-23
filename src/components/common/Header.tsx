// src/components/common/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'absorpcao', label: 'Como Funciona' },
    { id: 'video-depoimentos', label: 'Resultados em Vídeo' },
    { id: 'ugc-gallery', label: 'Comunidade' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'garantia', label: 'Garantia' },
    { id: 'ingredientes', label: 'Ingredientes' }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        offset: document.getElementById(item.id)?.offsetTop || 0
      }));

      const currentSection = sections.reduce((prev, curr) => {
        if (scrollPosition >= curr.offset - 100) {
          return curr;
        }
        return prev;
      }, sections[0]);

      setActiveSection(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`bg-white sticky top-10 z-40 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="text-juvelina-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-['Ws_Paradose'] text-2xl text-juvelina-gold">Juvelina</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-gray-600 hover:text-juvelina-gold transition font-medium relative ${
                    activeSection === item.id ? 'text-juvelina-gold' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-juvelina-gold"
                      style={{ opacity: 1 }}
                    />
                  )}
                </button>
              ))}
              
              {/* CTA Button */}
              <button
                onClick={onCtaClick}
                className="bg-juvelina-gold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={18} />
                <span>Comprar</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-juvelina-gold"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white w-80 h-full ml-auto shadow-xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-['Ws_Paradose'] text-2xl text-juvelina-gold">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      activeSection === item.id
                        ? 'bg-juvelina-gold text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={(e) => {
                  onCtaClick(e);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-6 bg-juvelina-gold text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart size={18} />
                <span>Comprar Agora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;