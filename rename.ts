import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('./src', (filepath) => {
  if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let newContent = content
      .replace(/brand-sand/g, 'brand-light')
      .replace(/brand-terracotta/g, 'brand-primary')
      .replace(/brand-ochre/g, 'brand-accent')
      .replace(/brand-green/g, 'brand-muted');
    if (content !== newContent) {
      fs.writeFileSync(filepath, newContent, 'utf8');
      console.log('Updated ' + filepath);
    }
  }
});
