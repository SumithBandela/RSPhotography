const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const imagesFolder = path.join(__dirname, 'images');
const jsonFilePath = path.join(__dirname, 'images.json');

// Function to update images.json
function updateAlbumsJson(newImagePath) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading images.json:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const imgSrc = path.relative(path.join(__dirname, 'public'), newImagePath).replace(/\\/g, '/');
    const subfolderPath = path.dirname(newImagePath);
    const metadataFilePath = path.join(subfolderPath, 'metadata.json');

    fs.readFile(metadataFilePath, 'utf8', (err, metadata) => {
      if (err) {
        console.error('Error reading metadata.json:', err);
        return;
      }

      const metadataJson = JSON.parse(metadata);
      const existingAlbum = jsonData.albums.find(album => album.title === metadataJson.title && album.description === metadataJson.description);

      if (existingAlbum) {
        // Add new photo to existing album
        existingAlbum.photos.push({ img_src: imgSrc });
      } else {
        // Create new album
        const newId = jsonData.albums.length + 1;
        jsonData.albums.push({
          id: newId,
          title: metadataJson.title || `New Album ${newId}`,
          description: metadataJson.description || `Description for new album ${newId}`,
          img_src: imgSrc,
          photos: [{ img_src: imgSrc }]
        });
      }

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

// Function to remove deleted images from images.json
function removeDeletedImages(deletedImagePath) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading images.json:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const imgSrc = path.relative(path.join(__dirname, 'public'), deletedImagePath).replace(/\\/g, '/');

    jsonData.albums.forEach(album => {
      album.photos = album.photos.filter(photo => photo.img_src !== imgSrc);
    });

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
      if (err) {
        console.error('Error writing images.json:', err);
      } else {
        console.log('images.json updated successfully.');
      }
    });
  });
}

// Watch for changes in the images folder and subdirectories
chokidar.watch(imagesFolder, { persistent: true, ignoreInitial: true, depth: 99 })
  .on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    updateAlbumsJson(filePath);
  })
  .on('unlink', (filePath) => {
    console.log(`File removed: ${filePath}`);
    removeDeletedImages(filePath);
  });

console.log('Script is running...');