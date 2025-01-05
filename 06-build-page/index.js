const fs = require('fs');
const path = require('path');
const sourceDir = __dirname;
const distDir = path.join(__dirname, 'project-dist');
const templatePath = path.join(sourceDir, 'template.html');
//const styleDir = path.join(sourceDir, 'styles');
//const assetsDir = path.join(sourceDir, 'assets');

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
