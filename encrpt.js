const crpto = require("crypto");
const fs = require("fs");
const prompt = require('prompt-sync')();
let path = prompt('Please give path of file with filename ');
let key ='Mylove'
const algorithm = 'aes-256-ctr';
key = crpto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);


// Encrypt 

const encrypt = (buffer)=>{
    // create an initalization vector
    const iv = crpto.randomBytes(16);
    // craete chiper using the algorithm 

    const chiper = crpto.createDecipheriv(algorithm,key,iv);
    // encrypted buffer 

    const result = Buffer.concat([iv, chiper.update(buffer),chiper.final()]);

    return result;

}


fs.readFile(path,(err,file)=>{

    if(err) 
    return console.error(err.message);

    console.log(`Current File Data: ${file}`);

    const encryptfile = encrypt(file);

    fs.writeFile("./cipherfile.txt",encryptfile,(err,file)=>{
        if(err)        return console.error(err.message);
        if(file){

            console.log("File Encrypted Sucessfully 100%");
        }
    })
})


