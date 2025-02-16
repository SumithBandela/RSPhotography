const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const imagesFolder = path.join(__dirname, 'public', 'images');
const jsonFilePath = path.join(__dirname, 'public', 'images.json');

// Function to update images.json
function updateImagesJson() {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading images.json:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const existingImages = jsonData.images.map(image => image.img_src);

    fs.readdir(imagesFolder, (err, files) => {
      if (err) {
        console.error('Error reading images folder:', err);
        return;
      }

      files.forEach((file, index) => {
        const imgSrc = `images/${file}`;
        if (!existingImages.includes(imgSrc)) {
          const newId = jsonData.images.length + 1;
          jsonData.images.push({
            id: newId,
            img_src: imgSrc,
            photos: [{ img_src: imgSrc }]
          });
        }
      });

      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error('Error writing images.json:', err);
        } else {
          console.log('images.json updated successfully.');
        }
      });
    });
  });
}

// Watch for changes in the images folder
chokidar.watch(imagesFolder).on('add', (filePath) => {
  console.log(`File added: ${filePath}`);
  updateImagesJson();
});