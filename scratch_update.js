const fs = require('fs');
const path = require('path');

const componentsDir = 'c:\\Users\\Yash\\VS_PROJECTS\\FileFit\\src\\components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('-workspace.tsx'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // BTN_PRIMARY multi-line or single-line
  const primaryRegex = /const BTN_PRIMARY =[\s\n]*"px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";/g;
  
  // BTN_SUCCESS multi-line or single-line
  const successRegex = /const BTN_SUCCESS =[\s\n]*"px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2";/g;
  
  const newClass = '"px-5 py-2.5 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-brutal shadow-brutal-hover";';

  const before = content;
  content = content.replace(primaryRegex, `const BTN_PRIMARY = \n  ${newClass}`);
  content = content.replace(successRegex, `const BTN_SUCCESS = \n  ${newClass}`);
  
  // Fix hardcoded shadow-sm images
  content = content.replace(/shadow-sm/g, "shadow-brutal");
  
  if (before !== content) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
    updated++;
  }
});

console.log(`Updated ${updated} files.`);
