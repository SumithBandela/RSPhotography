// filepath: /c:/codeBaseDevelopment/RSPhotography/updateAlbums.js
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const imagesFolder = path.join(__dirname, 'images');
const jsonFilePath = path.join(__dirname, 'images.json');

// Function to update images.json
function updateAlbumsJson(newImage) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading images.json:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const existingAlbums = jsonData.albums.map(album => album.img_src);

    const imgSrc = `images/${newImage}`;
    if (!existingAlbums.includes(imgSrc)) {
      const newId = jsonData.albums.length + 1;
      jsonData.albums.push({
        id: newId,
        title: `New Album ${newId}`,
        description: `Description for new album ${newId}`,
        img_src: imgSrc,
        photos: [{ img_src: imgSrc }]
      });

      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error('Error writing images.json:', err);
        } else {
          console.log('images.json updated successfully.');
        }
      });
    }
  });
}

// Watch for changes in the images folder
chokidar.watch(imagesFolder).on('add', (filePath) => {
  const fileName = path.basename(filePath);
  console.log(`File added: ${fileName}`);
  updateAlbumsJson(fileName);
});