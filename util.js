var http = require('http'); 
var iconv = require('iconv-lite');
var htmlToJson = require('html-to-json');
var querystring = require('querystring');

exports.getUTF8 = function(url_path,cb) {
  http.get(url_path , function(res) {
    var str = [];
    res.on('data', function(chunk) {
      str.push(chunk);
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
 });
};

exports.getData = function(url_path,cb) {
  http.get(url_path , function(res) {
		var str = [];
		res.on('data', function(chunk) {
		   str.push(chunk);
		   console.log('data: ' + chunk)
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
	 });

};




