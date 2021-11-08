const fs = require('fs');

fs.mkdir('06-build-page/project-dist', {
  recursive: true
}, (err) => {
  if (err) throw err
})



fs.writeFile('06-build-page/project-dist/index.html', '', (err) => {
  if (err) throw err
})


fs.writeFile('06-build-page/project-dist/style.css', '', (err) => {
  if (err) throw err
})


fs.mkdir('06-build-page/project-dist/assets', {
  recursive: true
}, (err) => {
  if (err) throw err
})




/*StylesCopyRealised*/

fs.readdir('06-build-page/styles', {
  withFileTypes: true
}, function (err, items) {
  items.forEach(item => {
    const extend = `${item.name.split('.').pop()}`
    if (extend === 'css') {
      fs.readFile(`06-build-page/styles/${item.name}`, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(`06-build-page/project-dist/style.css`, data, {
          flags: 'a'
        }, err => {
          if (err) throw err
        })
      })
    }
  });
})
fs.readdir(`06-build-page/components`, {
  withFileTypes: true
}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.name === 'articles.html') {
      fs.readFile(`06-build-page/components/${file.name}`, 'utf-8', (err, data) => {
        if (err) throw err;

      })

    }
  });
})













/*Html*/
 
/* fs.access(`06-build-page/project-dist/index.html`,err=>{
  if(err)throw err; */
  
    fs.copyFile(`06-build-page/template.html`, `06-build-page/project-dist/index.html`, err => {
      if (err) throw err
    })
    
  
/* }) */


fs.readFile(`06-build-page/project-dist/index.html`, 'utf-8', (err, readFile) => {
  if (err) throw err;




  /*   let replace = (result) => {
 
  }
   */
 /*  let replaceHtml = (item, text, teg) => {
    if (item.name === text) {
      fs.readFile(`06-build-page/components/${item.name}`, 'utf-8', (err, data) => {
        if (err) throw err;
        result = readFile.replace(`{{${teg}}}`, data)
        fs.writeFile('06-build-page/project-dist/index.html', result, 'utf8', function (err) {
          if (err) throw err;
        });
      })

    }
  } */
  let result='';
  if (readFile.indexOf('header')) {
    fs.readdir(`06-build-page/components`, {
      withFileTypes: true
    }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {

        if (file.name === 'header.html') {
          fs.readFile(`06-build-page/components/${file.name}`, 'utf-8', (err, data) => {
            if (err) throw err;
             result = readFile.replace(`{{header}}`, data)
             fs.writeFile('06-build-page/project-dist/index.html', result, 'utf8', function (err) {
              if (err) throw err;
            });
          })
    
        }
      });
    })
 
  }

 
  if (readFile.indexOf('articles')) {
    fs.readdir(`06-build-page/components`, {
      withFileTypes: true
    }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {

        if (file.name === 'articles.html') {
          fs.readFile(`06-build-page/components/${file.name}`, 'utf-8', (err, data) => {
            if (err) throw err;
            let result2 = readFile.replace(`{{articles}}`, data)
            fs.writeFile('06-build-page/project-dist/index.html', result2, 'utf8', function (err) {
              if (err) throw err;
            });
          })
        }
      });
    })
  }

  if (readFile.indexOf('footer')) {
    fs.readdir(`06-build-page/components`, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(file => {

        if (file.name === 'footer.html') {
          fs.readFile(`06-build-page/components/${file.name}`, 'utf-8', (err, data) => {
            if (err) throw err;
            let  result3 = readFile.replace(`{{footer}}`, data)
            fs.writeFile('06-build-page/project-dist/index.html', result3, 'utf8', function (err) {
              if (err) throw err;
            });
          })
        }
      });
    })
  } 
})


/*FolderCopyProccess*/

fs.readdir('06-build-page/assets', {
  withFileTypes: true
}, function (err, items) {
  if (err) throw err;
  items.forEach(item => {

    if (item.isDirectory()) {

      fs.mkdir(`06-build-page/project-dist/assets/${item.name}`, {
        recursive: true
      }, (err) => {
        if (err) throw err
      })

      fs.readdir(`06-build-page/assets/${item.name}`, {
        withFileTypes: true
      }, (err, files) => {
        if (err) throw err
        files.forEach(items => {

          fs.writeFile(`06-build-page/project-dist/assets/${item.name}/${items.name}`, '', (err) => {
            if (err) throw err
          })

          fs.copyFile(`06-build-page/assets/${item.name}/${items.name}`, `06-build-page/project-dist/assets/${item.name}/${items.name}`, err => {
            if (err) throw err
          })
        })
      })
    }
    /*   if (item.isFile()) {
          fs.stat(`03-files-in-folder/secret-folder/${item.name}`, (err, file) => {
              if (err) throw err
              console.log(`${item.name} - ${item.name.split('.').pop()} - ${(file.size)/1000}kb`)
          });
      } */
  });
});