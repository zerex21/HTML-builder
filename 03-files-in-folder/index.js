const fs = require('fs');


fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, function (err, items) {
    if (err) throw err;
    items.forEach(item => {
        if (item.isDirectory()) {
            fs.readdir(`03-files-in-folder/secret-folder/${item.name}`, {withFileTypes: true}, (err, files) => {
                if (err) throw err
                files.forEach(items => {
                    fs.stat(`03-files-in-folder/secret-folder/${item.name}/${items.name}`, (err, file) => {
                        if (err) throw err
                        console.log(`${items.name} - ${items.name.split('.').pop()} - ${(file.size)/1000}kb`)
                    });
                })
            })
        }
        if (item.isFile()) {
            fs.stat(`03-files-in-folder/secret-folder/${item.name}`, (err, file) => {
                if (err) throw err
                console.log(`${item.name} - ${item.name.split('.').pop()} - ${(file.size)/1000}kb`)
            });
        }
    });
});