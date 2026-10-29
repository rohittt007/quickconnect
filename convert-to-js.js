const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = process.cwd();
const targets = [path.join(root, 'src'), path.join(root, 'vite.config.ts')];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  if (fs.statSync(target).isDirectory()) {
    walk(target);
  } else {
    files.push(target);
  }
}

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const ext = file.endsWith('.tsx') ? '.jsx' : '.js';
  const output = ts.transpileModule(text, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      allowJs: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
    },
    fileName: file,
  }).outputText;

  const newPath = file.replace(/\.tsx?$/, ext);
  const rewritten = output.replace(/(from\s+['"])(\.[^'"\n]+)(\.tsx|\.ts)(['"])/g, (_m, p1, p2, p3, p4) => `${p1}${p2}${p3 === '.tsx' ? '.jsx' : '.js'}${p4}`);

  fs.writeFileSync(newPath, rewritten, 'utf8');
  fs.unlinkSync(file);
}
