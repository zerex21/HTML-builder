const fs = require('fs');
const path = require('path');

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













/*Htmlbundle*/
 
  
    fs.copyFile(`06-build-page/template.html`, `06-build-page/project-dist/index.html`, err => {
      if (err) throw err
    })
    
    const templateHtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8')
    const indexHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))
    
    templateHtml.on('data', async (chunk) => {
      async function build() {
        let htmlFile = chunk.toString();
        const reg = chunk.match(/{{([a-zA-Z]*)}}/gi);
        for (let e of reg) {
          const tagName = e.replace(/\W/g, '');
          const compHtml = await fs.promises.readFile(path.join(__dirname, 'components', `${tagName}.html`), 'utf-8')
          htmlFile = htmlFile.replace(e, compHtml)
        }
        return htmlFile;
      }
      const htmlResult = await build()
      indexHtml.write(htmlResult)
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
  });
});


