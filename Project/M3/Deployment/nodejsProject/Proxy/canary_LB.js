var redis = require('redis')
var fs      = require('fs')
var express = require('express')
var request = require('request');
var app = express();
var port = 3002;
var http = require('http');
var httpProxy = require('http-proxy');
var prodIp = fs.readFileSync('prodIp.txt', 'utf-8');
var canaryIp = fs.readFileSync('canaryIp.txt', 'utf-8');
var alert = false;

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
client.del('recentList');
client.del('instanceList');
client.lpush('instanceList', prodIp);
client.lpush('instanceList', canaryIp);

//PROXY SERVER

var proxy = httpProxy.createProxyServer({});
var proxyserver = http.createServer(function(req, res) {
	if(!alert){
		if(Math.random()*100 < 80){
			proxy.web(req, res, { target: "http://"+prodIp + ":" + port });
			console.log("--------------------------------------------------------------")
			console.log("The request got delegated to ip "+ prodIp + ":" + port);
		}else{
			proxy.web(req, res, { target: "http://"+canaryIp + ":" + port });
			console.log("--------------------------------------------------------------")
			console.log("The request got delegated to ip "+ canaryIp + ":" + port);
		}
	}else{
		proxy.web(req, res, { target: "http://"+prodIp + ":" + port });
		console.log("--------------------------------------------------------------")
		console.log("The request got delegated to ip "+ prodIp + ":" + port);
	}
	
});


var checkStatus = setInterval(function(){
	console.log("Checking canary server status...");
	try{
		http.get('http://'+canaryIp, function (res) {
			//Working fine
		}).on('error', function(e) {
		    console.log("*********Error occured. Raising Alert*********");
			alert = true;
			clearInterval(checkStatus);
		});
	}catch(e){
		console.log("*********Error occured. Raising Alert*********");
		alert = true;
	}
	
},5000);

console.log("Proxy server listening on port 8090")
proxyserver.listen(8090);
