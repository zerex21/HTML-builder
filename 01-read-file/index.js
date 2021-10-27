const fs = require('fs');
/* const path = require('path'); */


/* const filePath = path.join(__dirname ,'text.txt');

fs.readFile(filePath,'utf-8',(err, content)=>{
  if(err){
    throw err;
  }
  console.log(content);
});
 */

let stream = new fs.ReadStream('01-read-file/text.txt','utf-8');

stream.on('data', (chunk)=>{
  console.log(chunk);
});

