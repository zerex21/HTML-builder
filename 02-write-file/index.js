const fs = require('fs');
const readline = require('readline');
const process = require ('process');


const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});


rl.question('Enter text ... ', (answer) => {
  fs.writeFile('02-write-file/text.txt',answer,(err)=>{
    if(err) return err;
  });
 
});


rl.on('line', text=>{
  fs.appendFile('02-write-file/text.txt',text,{flags:'a'},(err)=>{
    if(err) throw err;
    if(text === 'exit'){
      console.log('Bye!');
      process.exit();
    }
    console.log(`Your typed: ${text} `);
  });

});

process.openStdin().on('keypress', function(chunk, key) {
  if(key && key.name === 'c' && key.ctrl) {
    console.log('Bye Bye!');
    process.exit();
  }
});
