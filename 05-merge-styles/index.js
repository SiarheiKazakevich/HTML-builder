const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distDir, 'bundle.css');

function mergeStyles() {
  try {
    const files = fs.readdirSync(stylesDir);

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = cssFiles.map((file) => {
      const filePath = path.join(stylesDir, file);
      return fs.readFileSync(filePath, 'utf-8');
    });

    fs.writeFileSync(bundlePath, styles.join('\n'), 'utf-8');

    console.log('Компиляция стилей завершена.');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

mergeStyles();
