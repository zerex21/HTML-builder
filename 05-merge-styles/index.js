const fs = require('fs');

fs.writeFile('05-merge-styles/project-dist/bundle.css','',(err)=>{
    if(err) throw err
})


fs.readdir('05-merge-styles/styles', {withFileTypes: true}, function (err, items) {
items.forEach(item => {
    const extend =`${item.name.split('.').pop()}`
    if(extend === 'css'){
     fs.readFile(`05-merge-styles/styles/${item.name}`, 'utf-8',(err,data)=>{
        if(err) throw err;
        fs.appendFile(`05-merge-styles/project-dist/bundle.css`,data ,{flags:'a'},  err => {
            if (err) throw err
          })
     })
    }
});
})


