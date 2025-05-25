// check-exports.js
import { promises as fs } from 'fs';
import path from 'path';

async function checkExports(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && !file.name.includes('node_modules')) {
      await checkExports(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = await fs.readFile(fullPath, 'utf-8');
      
      if (content.includes('export default')) {
        console.log('✅', fullPath, '- Has default export');
      } else if (content.includes('export {')) {
        console.log('⚠️', fullPath, '- Has named exports only');
      } else {
        console.log('❌', fullPath, '- No exports found');
      }
    }
  }
}

checkExports('./src/features').catch(console.error);