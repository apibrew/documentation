const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// Path to the folder you want to watch
const folderPath = 'src/';

// Initialize the watcher
const watcher = chokidar.watch(folderPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// On file change, run the algorithm
watcher.on('change', filePath => {
  if (pathMatchesPattern(filePath)) { // Check if the changed file path matches the desired pattern
    executeAlgorithm(filePath.substring(0, filePath.lastIndexOf('/')));
  }
});

function pathMatchesPattern(filePath) {
  console.log('Checking: ', filePath)
  if (filePath.endsWith('/files.ts')) {
    return false;
  }
  if (filePath.match(/\/files\//)) {
    return true
  }
  return false;
}

function executeAlgorithm(folderPath) {
  console.log('Executing doc-files on: ' + folderPath);
  const filesContent = {};

  fs.readdirSync(folderPath).forEach(fileName => {
    if (fileName !== 'files.ts') { // Avoid reading the index.json file itself
      const content = fs.readFileSync(path.join(folderPath, fileName), 'utf8');

      const lang = fileName.substring(fileName.lastIndexOf('.') + 1);
      let key;

      switch (lang) {
        case 'ts':
          key = 'typescript';
          break;
        case 'js':
          key = 'javascript';
          break;
        case 'jsx':
        case 'tsx':
          key = 'react';
          break;
        case "py":
          key = "python";
          break;
        case "java":
          key = "java";
          break;
        case "go":
          key = "golang";
          break;
      }

      filesContent[key] = content.trim();
    }
  });

  const folderName = folderPath.substring(folderPath.lastIndexOf('/') + 1);

  fs.writeFileSync(path.join(folderPath, 'files.ts'), `
export const ${folderName}Files = ${JSON.stringify(filesContent, null, 2)};
  `);

  console.log('Done!');
}

console.log(`Watching changes in ${folderPath} ...`);
