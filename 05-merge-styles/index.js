const path = require('path');
const fs = require('fs');
const styleDir = path.join(__dirname, 'styles');
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), ' ', (err) => {
  if (err) throw err;
});

fs.readdir(
  styleDir,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (path.extname(path.join(styleDir, `${file.name}`)) == '.css') {
          fs.readFile(
            path.join(styleDir, `${file.name}`),
            'utf-8',
            function (err, data) {
              fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
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
