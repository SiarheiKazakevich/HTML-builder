const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);

      if (file.isFile()) {
        const fileStats = await fs.stat(filePath);

        const fileExtension = path.extname(filePath).slice(1);

        console.log(
          `${file.name} - ${fileExtension} - ${fileStats.size} bytes`,
        );
      }
    }
  } catch (error) {
    console.error('Error reading folder:', error.message);
  }
}

displayFileInfo();
