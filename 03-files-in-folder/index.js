const fs = require('fs');


fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, function (err, items) {
    if (err) throw err;
    items.forEach(item => {
        if (item.isFile()) {
            fs.stat(`03-files-in-folder/secret-folder/${item.name}`, (err, file) => {
                if (err) throw err
                console.log(`${item.name} - ${item.name.split('.').pop()} - ${(file.size)/1000}kb`)
            });
        }
    });
});