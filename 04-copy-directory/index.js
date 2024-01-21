const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await copyDirRecursive(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
    console.log('Копирование завершено.');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
async function copyDirRecursive(source, target) {
  await fs.mkdir(target, { recursive: true });

  const files = await fs.readdir(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      await copyDirRecursive(sourcePath, targetPath);
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

copyDir();
