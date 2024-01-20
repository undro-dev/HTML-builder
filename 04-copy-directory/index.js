const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const walk = path.join(__dirname, 'files');
fsPromises
  .mkdir(path.join(__dirname, 'files-copy'))
  .then(function () {
    deleteCopy();
    copyDir();
    console.log('Copy complete!');
  })
  .catch(function () {
    deleteCopy();
    copyDir();
    console.log('Copy complete!');
  });

function copyDir() {
  fs.readdir(path.join(__dirname, 'files'), (err, contents) => {
    if (err) {
      console.log(err);
    } else {
      contents.forEach((content) => {
        fs.copyFile(
          path.join(walk, content),
          path.join(__dirname, 'files-copy', content),
          (err) => {
            if (err) console.log(err);
          },
        );
      });
    }
  });
}

function deleteCopy() {
  fs.readdir(path.join(__dirname, 'files-copy'), (err, contents) => {
    if (err) {
      console.log(err);
    } else {
      contents.forEach((content) => {
        fs.unlink(path.join(__dirname, 'files-copy', content), (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
}
