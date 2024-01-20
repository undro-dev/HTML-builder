const fs = require('fs');
const path = require('path');
const walk = path.join(__dirname, 'secret-folder');
fs.readdir(
  walk,
  {
    withFileTypes: true,
  },
  (err, files) => {
    console.log('\nCurrent directory files:');
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(path.join(walk, `${file.name}`), function (err, stats) {
            const size = stats['size'];
            console.log(
              path.basename(
                path.join(walk, `${file.name}`),
                path.extname(path.join(walk, `${file.name}`)),
              ) +
                ' - ' +
                `${path.extname(path.join(walk, `${file.name}`)).slice(1)}` +
                ' - ' +
                `${size}` +
                ' bytes',
            );
          });
        } else if (file.isDirectory) {
          fs.readdir(
            path.join(walk, `${file.name}`),
            {
              withFileTypes: true,
            },
            (err, files) => {
              if (err) console.log(err);
              else {
                const nameFile = file.name;
                files.forEach((file) => {
                  if (file.isFile()) {
                    fs.stat(
                      path.join(walk, nameFile, `${file.name}`),
                      function (err, stats) {
                        const size = stats['size'];
                        console.log(
                          path.basename(
                            path.join(walk, `${file.name}`),
                            path.extname(path.join(walk, `${file.name}`)),
                          ) +
                            ' - ' +
                            `${path
                              .extname(path.join(walk, `${file.name}`))
                              .slice(1)}` +
                            ' - ' +
                            `${size}` +
                            ' bytes',
                        );
                      },
                    );
                  }
                });
              }
            },
          );
        }
      });
    }
  },
);
