const fs = require('fs');
const fsPromises = fs.promises;

/* fsPromises.readdir('03-files-in-folder',{withFileTypes: true}) */
let count = 0;

fs.readdir('03-files-in-folder', {withFileTypes: true},function(err, items) {
    /* console.log(items); */
    for (var i=0; i<items.length; i++) {
        if(!items[i].isFile() ){
            items[i].readdir('03-files-in-folder', {withFileTypes: true},function(err, elemnts) { 
console.log(elements)
            })
     
        }
       
    }
     console.log(count);
});