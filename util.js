const https = require('https'); 
var iconv = require('iconv-lite');
var htmlToJson = require('html-to-json');
var querystring = require('querystring');

exports.getUTF8 = function(url_path,cb) {

	https.get(url_path, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);
		var str = [];
		res.on('data', (d) => {
			process.stdout.write(d);
			str.push(d);
		});
		res.on('end', function() {
			var total = 0;
			for(var i=0;i<str.length;i++) {
			  total+=str[i].length;
			}
			var content = Buffer.concat(str,total);
			var utf8st=iconv.decode(content,'win874');
			cb(utf8st); //utf8st
		 }); 

	}).on('error', (e) => {
			console.error(e);
	});

};

exports.getData = function(url_path,cb) {

	 https.get(url_path, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);
		var str = [];
		res.on('data', (d) => {
			process.stdout.write(d);
			str.push(d);
			console.log('data: ' + d)
		});
		res.on('end', function() {
			var total = 0;
			for(var i=0;i<str.length;i++) {
			  total+=str[i].length;
			}
			var content = Buffer.concat(str,total);
			output=content;
			console.log('end: '+content);  
			  //response.send(JSON.stringify(content));
			cb(content);
		 }); 

	}).on('error', (e) => {
			console.error(e);
	});

};




