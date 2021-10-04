const ipfsClient = require('ipfs-http-client');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs'); 


const ipfs = new ipfsClient({ host: 'localhost',port: '5001', protocol: 'http'});
const app = express();
app.use(express.static(__dirname + '/views'));

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.get('/',(req,res) => {
	res.render('home');
});

app.post('/upload',(req,res) => {
	//const file = req.files.file;
	const fileName = req.body.fileName;
	const fileHash = "H1sldlask345mfndklaskk";
	
	// file.mv(filePath, async(err) => {
	// 	if (err){
	// 		console.log('Error: failed to download file');
	// 		return res.status(500).send(err);
		
	// 	}
		
	// 	const fileHash = await addFile(fileName, filePath);
	// 	fs.unlink(filePath, (err) => {
	// 		if (err) console.log(err);
	// 	});
		
		res.render('upload',{ fileName, fileHash });
	// });
});

const addFile = async(fileName,filePath) => {
	console.log(fileName);
	console.log(filePath);
	const file = fs.readFileSync(filePath);
	console.log(file);
	const fileAdded = await ipfs.add({path: fileName, content: file});
	console.log(fileAdded);
	const fileHash = fileAdded[0].hash;
	
	return fileHash;
	}
	
	
app.listen(4000, () => {
	console.log('Server is listening on port 4000');
});

 