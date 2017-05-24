var redis = require('redis')
var fs      = require('fs')
var express = require('express')
var app = express();
var port = 3002;
var http = require('http');
var httpProxy = require('http-proxy');
var prodIp = fs.readFileSync('prodIp.txt', 'utf-8');
var canaryIp = fs.readFileSync('canaryIp.txt', 'utf-8');

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
client.del('recentList');
client.del('instanceList');
client.lpush('instanceList', prodIp);
client.lpush('instanceList', canaryIp);

//PROXY SERVER

var proxy = httpProxy.createProxyServer({});
var proxyserver = http.createServer(function(req, res) {
  client.rpoplpush('instanceList', 'instanceList', function(request, reply){
    currentServer = reply;
  proxy.web(req, res, { target: "http://"+currentServer + ":" + port });
  console.log("--------------------------------------------------------------")
  console.log(req.method , req.url)
  console.log("The request got delegated to ip "+ currentServer + ":" + port);
});    
});


console.log("Proxy server listening on port 8090")
proxyserver.listen(8090);
