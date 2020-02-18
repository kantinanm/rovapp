var express = require('express');
var bodyParser = require('body-parser');
var htmlToJson = require('html-to-json');
var http = require('http'); 
var util = require('./util');
var app = express();
var path = require('path');
//var public = path.join(__dirname, 'public');
const https = require('https');

app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

// viewed at http://localhost:8080
app.get('/scan', function(req, res) {
    res.sendFile('public/scan.html', { root: __dirname });
});

app.get('/', function(req, res) {
    res.sendFile('public/page.html', { root: __dirname });
});

app.get('/pull', function(req, res) {
	
	var url_path = 'https://esport.nu.ac.th/home/participant'+req.params.token;
    console.log('url: '+url_path);
	util.getData(url_path,function(result) {
	
	 console.log('callback: '+result); 
	 res.setHeader('Content-Type', 'application/json');
	 res.send(result);
	});

});

app.get('/participant/action/:token', function(req, res) {
	
	 console.log("req "+req.params.token);
	 //"token":"E4fVzlMSsrsB0QdA8JH0xQo0dxEiIq1g99thq9rV","action":"join"
	 var url_path = 'https://esport.nu.ac.th/participant/action/'+req.params.token;
	 console.log('url: '+url_path);
	 util.getData(url_path,function(result) {
	 
	  console.log('callback: '+result); 
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	 });
	  
});

app.get('/reader/:token', function (req, response) {

  //req.params.token
    var url_path = 'https://esport.nu.ac.th/participant/'+req.params.token;
    console.log('url: '+url_path);
	util.getData(url_path,function(result) {
	
	 console.log('callback: '+result); 
		response.setHeader('Content-Type', 'application/json');
		response.send(result);
	});
	
});

app.get('/test', function (req, res) {
	 //res.send('GET request to the homepage')
	    var url_path = 'https://esport.nu.ac.th/home/participant';
		
		util.getUTF8(url_path,function(utf8) {
		htmlToJson.parse(utf8, {
				 'tr': ['tr', function($tr) {
					 //console.log($tr.children(3).nodeName);
					 //var regex = /(\d{6})/; //$tr.children("td").slice(0).html().match(regex)
					 console.log($tr.children("td").slice(0).html());
					 //var regex = "\r\n";
					 // tx=$tr.children("td").slice(0).html();
					 //console.log(tx.replace(/\n|\r/g, ""));
					
					
				     //console.log($tr.children("td").last().text());

				  var tmp = {'count':$tr.children().length,'text':$tr.text()};
					

				  for(var i=0;i<$tr.children().length;i++) {
					//tmp['td'+i] = $tr.children(i).text();
					tmp['td'+i] = $tr.children("td").slice(i).html();
				   }
					return tmp;
				 }] 
				 }, function(err, result) {

					var participle_list =[];
					//res.json(r);

					

					 for(var i=0;i<result.tr.length;i++) {
						//console.log(result.tr[i]);
						
                         var tmp = {
                            'participle_id' :result.tr[i].td0,
                            'fullname':result.tr[i].td1,
							'email':result.tr[i].td2,
							'gerena_id':result.tr[i].td3,
							'membertype':result.tr[i].td4
                          }
                         participle_list.push(tmp);
                          

					 }

					 console.log(participle_list);
					 res.json(participle_list)
				});
		  });

   //console.log(url_path);
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
	
	
});