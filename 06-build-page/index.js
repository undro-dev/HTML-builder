const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const components = path.join(__dirname, 'components');
const projectDist = path.join(__dirname, 'project-dist');
const { readdir } = require('fs/promises');

function toCreateFolder() {
  fsPromises
    .mkdir(path.join(__dirname, 'project-dist'))
    .then(function () {
      // console.log('Directory created successfully');
    })
    .catch(function () {
      // console.log('failed to create directory');
    });
  fsPromises
    .mkdir(path.join(__dirname, 'project-dist', 'assets'))
    .then(function () {
      // console.log('Directory created successfully');
    })
    .catch(function () {
      // console.log('failed to create directory');
    });
}
toCreateFolder();
toCreateIndex();
toAddContentInStyle();
toReadAssets();
toCreateFinishIndex();

function toCreateIndex() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    '',
    (err) => {
      if (err) throw err;
    },
  );
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err;
  });
}

function toAddContentInStyle() {
  const wayToStyles = path.join(__dirname, 'styles');
  fs.readdir(
    wayToStyles,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          if (path.extname(path.join(wayToStyles, `${file.name}`)) == '.css') {
            fs.readFile(
              path.join(wayToStyles, `${file.name}`),
              'utf-8',
              function (err, data) {
                fs.appendFile(
                  path.join(__dirname, 'project-dist', 'style.css'),
                  data,
                  (err) => {
                    if (err) console.log(err);
                  },
                );
              },
            );
          }
        });
      }
    },
  );
}

function toReadAssets() {
  fs.readdir(
    path.join(__dirname, 'assets'),
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          if (file.isDirectory()) {
            fsPromises
              .mkdir(path.join(__dirname, 'project-dist', 'assets', file.name))
              .then(function () {
                fs.readdir(
                  path.join(__dirname, 'assets', file.name),
                  {
                    withFileTypes: true,
                  },
                  (err, contents) => {
                    if (err) {
                      console.log(err);
                    } else {
                      contents.forEach((content) => {
                        if (content.isFile) {
                          fs.copyFile(
                            path.join(
                              __dirname,
                              'assets',
                              file.name,
                              content.name,
                            ),
                            path.join(
                              __dirname,
                              'project-dist',
                              'assets',
                              file.name,
                              content.name,
                            ),
                            (err) => {
                              if (err) console.log(err);
                            },
                          );
                        }
                      });
                    }
                  },
                );
              })
              .catch(function () {
                fs.readdir(
                  path.join(__dirname, 'assets', file.name),
                  {
                    withFileTypes: true,
                  },
                  (err, contents) => {
                    if (err) {
                      console.log(err);
                    } else {
                      contents.forEach((content) => {
                        if (content.isFile) {
                          fs.copyFile(
                            path.join(
                              __dirname,
                              'assets',
                              file.name,
                              content.name,
                            ),
                            path.join(
                              __dirname,
                              'project-dist',
                              'assets',
                              file.name,
                              content.name,
                            ),
                            (err) => {
                              if (err) console.log(err);
                            },
                          );
                        }
                      });
                    }
                  },
                );
              });
          }
        });
      }
    },
  );
}

async function toCreateFinishIndex() {
  try {
    const filesOfComponents = await readdir(components, {
      withFileTypes: true,
    });
    const streamTemplate = fs.createReadStream(
      path.resolve(__dirname, 'template.html'),
    );
    const output = fs.createWriteStream(path.join(projectDist, 'index.html'));
    streamTemplate.on('data', (chunk) => {
      let result = chunk.toString();
      filesOfComponents.forEach((file, index) => {
        if (file.isFile() && path.extname(file.name) == '.html') {
          const streamOfComponents = fs.createReadStream(
            path.join(components, file.name),
          );
          streamOfComponents.on('data', (chunkOfComponents) => {
            result = result
              .split(`{{${path.parse(file.name).name}}}`)
              .join(`\n${chunkOfComponents.toString()}\n`)
              .toString();
            if (index === filesOfComponents.length - 1) {
              output.write(result);
            }
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}
