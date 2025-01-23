const fs = require('fs').promises;
const path = require('path');
const baseDir = path.join(__dirname, 'project-dist', '06-build-page');
const assetsSrcDir = path.join(__dirname, 'assets');
const assetsDestDir = path.join(baseDir, 'assets');
const stylesDir = path.join(__dirname, 'styles');
const componentsDir = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');
const indexFile = path.join(baseDir, 'index.html');
const styleFile = path.join(baseDir, 'style.css');

async function copyFolder(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}






function processTemplate() {
  try {
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }

    let templateContent = fs.readFileSync(templatePath, 'utf-8');
    const matches = templateContent.match(/{{(.*?)}}/g);

    if (!matches) {
      console.error('Не найдены теги в шаблоне.');
      return;
    }
    for (const match of matches) {
      const componentName = match.slice(2, -2).trim();
      const componentPath = path.join(
        sourceDir,
        'components',
        `${componentName}.html`,
      );
      const componentContent = fs.readFileSync(componentPath, 'utf-8');

      templateContent = templateContent.replace(match, componentContent);
    }
    const indexPath = path.join(distDir, 'index.html');
    fs.writeFileSync(indexPath, templateContent, 'utf-8');
    console.log('Обработка шаблона завершена.');

    require('../05-merge-styles/index');

    require('../04-copy-directory/index');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

processTemplate();
