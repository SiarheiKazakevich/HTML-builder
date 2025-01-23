const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distDir, 'bundle.css');

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesDir);

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = await Promise.all(
      cssFiles.map(async (file) => {
        const filePath = path.join(stylesDir, file);
        return fs.readFile(filePath, 'utf-8');
      }),
    );

    await fs.writeFile(bundlePath, styles.join('\n'), 'utf-8');

    console.log('Компиляция стилей завершена.');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
async function prepareDistDir() {
  try {
    await fs.mkdir(distDir, { recursive: true });
  } catch (error) {
    console.error('Ошибка при создании папки project-dist:', error.message);
  }
}
(async () => {
  await prepareDistDir();
  await mergeStyles();
})();
