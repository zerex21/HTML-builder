const fs = require('fs');

let sourceDir = '04-copy-directory/files';
let destDir = '04-copy-directory/files-copy';
const path = require('path');



let copyDir = function (src, dest) {

  fs.stat(src, function (err) {
    if (err) throw err;

    fs.mkdir(dest, {
      recursive: true
    }, err => {
      if (err) throw err
    })

    fs.readdir(dest, (err, files) => {
      if (err) throw err;

      for (const file of files) {

        fs.unlink(path.join(dest, file), err => {
          if (err) throw err;
        });
      }
    });
    
    fs.readdir(src, (err, files) => {
      if (err) throw err;
      files.forEach(item => {

        fs.copyFile(`04-copy-directory/files/${item}`, `04-copy-directory/files-copy/${item}`, err => {
          if (err) throw err
        })
      })
    })
  });
};

copyDir (sourceDir, destDir);