// scripts/optimize-images.js
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
const OUTPUT_FORMATS = ['webp', 'original'];
const SIZES = {
  mobile: { width: 400, suffix: '-mobile' },
  tablet: { width: 768, suffix: '-tablet' },
  desktop: { width: 1200, suffix: '-desktop' },
  full: { width: 1920, suffix: '' }
};

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase().slice(1);
  const basename = path.basename(imagePath, path.extname(imagePath));
  const dirname = path.dirname(imagePath);
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    console.log(`Skipping unsupported format: ${imagePath}`);
    return;
  }
  
  console.log(`Processing: ${imagePath}`);
  
  // Criar diretório de saída se não existir
  const outputDir = path.join(dirname, 'optimized');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Processar cada tamanho
  for (const [sizeName, config] of Object.entries(SIZES)) {
    try {
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Pular se a imagem for menor que o tamanho alvo
      if (metadata.width <= config.width) {
        console.log(`  Skipping ${sizeName} (image smaller than target)`);
        continue;
      }
      
      // Gerar WebP
      await image
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: sizeName === 'mobile' ? 70 : 80,
          effort: 6
        })
        .toFile(path.join(outputDir, `${basename}${config.suffix}.webp`));
      
      console.log(`  ✓ Generated ${sizeName} WebP`);
      
      // Gerar formato original otimizado
      if (ext === 'jpg' || ext === 'jpeg') {
        await image
          .resize(config.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({
            quality: sizeName === 'mobile' ? 75 : 85,
            progressive: true,
            mozjpeg: true
          })
          .toFile(path.join(outputDir, `${basename}${config.suffix}.jpg`));
          
        console.log(`  ✓ Generated ${sizeName} JPEG`);
      } else if (ext === 'png') {
        await image
          .resize(config.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png({
            quality: 85,
            compressionLevel: 9,
            progressive: true
          })
          .toFile(path.join(outputDir, `${basename}${config.suffix}.png`));
          
        console.log(`  ✓ Generated ${sizeName} PNG`);
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${sizeName}: ${error.message}`);
    }
  }
}

async function generateImageComponent(images) {
  const componentContent = `// src/components/ui/ResponsiveImage.tsx
// Auto-generated file - do not edit directly
import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

const imageMap = ${JSON.stringify(images, null, 2)};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px'
}) => {
  const imageSet = imageMap[src];
  
  if (!imageSet) {
    // Fallback para imagem não otimizada
    return <img src={src} alt={alt} className={className} loading={loading} />;
  }
  
  return (
    <picture>
      {/* WebP sources */}
      <source
        type="image/webp"
        srcSet={\`
          \${imageSet.mobile.webp} 400w,
          \${imageSet.tablet.webp} 768w,
          \${imageSet.desktop.webp} 1200w,
          \${imageSet.full.webp} 1920w
        \`}
        sizes={sizes}
      />
      
      {/* Original format sources */}
      <source
        type={\`image/\${imageSet.format}\`}
        srcSet={\`
          \${imageSet.mobile.original} 400w,
          \${imageSet.tablet.original} 768w,
          \${imageSet.desktop.original} 1200w,
          \${imageSet.full.original} 1920w
        \`}
        sizes={sizes}
      />
      
      {/* Fallback */}
      <img
        src={imageSet.desktop.original}
        alt={alt}
        className={className}
        loading={loading}
        width={imageSet.width}
        height={imageSet.height}
      />
    </picture>
  );
};

export default ResponsiveImage;
`;
  
  await fs.writeFile('src/components/ui/ResponsiveImage.tsx', componentContent);
  console.log('\n✓ Generated ResponsiveImage component');
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Encontrar todas as imagens
  const patterns = SUPPORTED_FORMATS.map(ext => `src/**/*.${ext}`);
  const images = [];
  
  for (const pattern of patterns) {
    const files = await glob(pattern, { ignore: '**/optimized/**' });
    images.push(...files);
  }
  
  console.log(`Found ${images.length} images to process\n`);
  
  const imageMap = {};
  
  // Processar cada imagem
  for (const image of images) {
    await optimizeImage(image);
    
    // Adicionar ao mapa para o componente
    const basename = path.basename(image, path.extname(image));
    const ext = path.extname(image).slice(1);
    const dirname = path.dirname(image);
    
    imageMap[image] = {
      format: ext === 'jpg' ? 'jpeg' : ext,
      width: 1920, // Você pode obter isso do metadata se necessário
      height: 1080,
      mobile: {
        webp: path.join(dirname, 'optimized', `${basename}-mobile.webp`),
        original: path.join(dirname, 'optimized', `${basename}-mobile.${ext}`)
      },
      tablet: {
        webp: path.join(dirname, 'optimized', `${basename}-tablet.webp`),
        original: path.join(dirname, 'optimized', `${basename}-tablet.${ext}`)
      },
      desktop: {
        webp: path.join(dirname, 'optimized', `${basename}-desktop.webp`),
        original: path.join(dirname, 'optimized', `${basename}-desktop.${ext}`)
      },
      full: {
        webp: path.join(dirname, 'optimized', `${basename}.webp`),
        original: path.join(dirname, 'optimized', `${basename}.${ext}`)
      }
    };
  }
  
  // Gerar componente React
  await generateImageComponent(imageMap);
  
  console.log('\n✅ Image optimization complete!');
  
  // Estatísticas
  const originalSize = await calculateTotalSize(images);
  const optimizedImages = await glob('src/**/optimized/*');
  const optimizedSize = await calculateTotalSize(optimizedImages);
  
  console.log(`\n📊 Statistics:`);
  console.log(`   Original: ${formatBytes(originalSize)}`);
  console.log(`   Optimized: ${formatBytes(optimizedSize)}`);
  console.log(`   Saved: ${formatBytes(originalSize - optimizedSize)} (${Math.round((1 - optimizedSize/originalSize) * 100)}%)`);
}

async function calculateTotalSize(files) {
  let total = 0;
  for (const file of files) {
    const stat = await fs.stat(file);
    total += stat.size;
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}