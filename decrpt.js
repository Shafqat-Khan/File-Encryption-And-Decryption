const crpto = require("crypto");
const fs = require("fs");
const { buffer } = require("stream/consumers");
const prompt = require('prompt-sync')();
let key = prompt('What is the key? ');
let path = prompt('Upload the proper path of D-file ');
const algorithm = 'aes-256-ctr';
key = crpto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

// decryption function

const decrypt = (encrypted)=> {

    const iv = encrypted.slice(0,16);

    // get the rest 
    encrypted = encrypted.slice(16);

    // create dechiper 
    const decipher = crpto.createDecipheriv(algorithm,key,iv);
    
    const result = Buffer.concat([decipher.update(encrypted),decipher.final()]);

    return result;
}

fs.readFile(path,(err,file)=>{


    if (err) return console.error(err.message);

    if(file){
        const decryptFile = decrypt(file);
        console.log(decryptFile.toString());
    }
})


