const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(targetDir, { recursive: true });

    const sourceFiles = await fs.readdir(sourceDir);
    const targetFiles = await fs.readdir(targetDir);

    for (const file of targetFiles) {
      if (!sourceFiles.includes(file)) {
        const targetPath = path.join(targetDir, file);
        await fs.rm(targetPath, { recursive: true, force: true });
      }
    }

    for (const file of sourceFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await copyDirRecursive(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }

    console.log('Копирование завершено и синхронизация выполнена.');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

async function copyDirRecursive(source, target) {
  await fs.mkdir(target, { recursive: true });

  const sourceFiles = await fs.readdir(source);
  const targetFiles = await fs.readdir(target);

  for (const file of targetFiles) {
    if (!sourceFiles.includes(file)) {
      const targetPath = path.join(target, file);
      await fs.rm(targetPath, { recursive: true, force: true });
    }
  }

  for (const file of sourceFiles) {
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
