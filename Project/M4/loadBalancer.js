var redis = require('redis');
const execFile = require('child_process').execFile;
var fs      = require('fs')
var express = require('express')
var app = express();
var port = 3002;
var http = require('http');
var httpProxy = require('http-proxy');
var Slack = require('node-slackr');
var slack = new Slack('https://hooks.slack.com/services/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'); //For direct message
var alert = false;
var threshold = 75;
var apiReqIp = '';

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {});


// Refresh the redis queues
client.del('totalRequestCount');
client.del('instanceList');

// Total request count
client.set('totalRequestCount', 0);

//PROXY SERVER
var proxyServer = httpProxy.createProxyServer({});
var proxy = http.createServer(function(req, res) {
	var reqUrl = req.url;
	if(reqUrl.indexOf('.html') > 1 || reqUrl == '/'){

		client.LLEN('instanceList', function(err, length) {
	        if (length > 0){
				var randomIndex = Math.floor(Math.random() * length);
				client.lindex('instanceList', randomIndex, function(err, value){
					var ip = value;
					apiReqIp = value;
					client.get(ip, function(req, res){
						client.get('totalRequestCount', function(error, totalCount){
							var avgLoad = (parseInt(res)/parseInt(totalCount))*100;
							console.log("Avg load on ip ",ip," is ",avgLoad, " res: ",res, " total: ", totalCount)," %";
							if(avgLoad >= threshold){
								var msg = "Load on server "+ip+" is "+avgLoad+"% which is above threshold.\nPlease spin a new server.\nSpinning new production server.....";
								console.log(msg);
								slack.notify(msg);
								//slack.notify('Spinning new production server.....');
								const deploySh = execFile('sh', ['spin.sh'], (error, stdout, stderr) => {
							        if (error) {
							          throw error;
							        }

							        var lines = stdout.toString().split("\n");
							        var finaloutput = "";

							        for (i = 1; i<5; i++)
							        {
							            finaloutput = finaloutput + lines[i] + "\n"
							        }

							        slack.notify(finaloutput);
							        client.rpoplpush('instanceList', 'instanceList', function(request, reply){
										currentServer = reply;
										client.set(currentServer, 0);
									});
									client.set('totalRequestCount',0);
							    });
								
								//slack.notify('<@monkeybusiness> Spin');
							}
						});						
					});			

					proxyServer.web(req, res, { target: "http://"+ ip + ":" + port });					
					console.log("The request ",req.method, req.url," got delegated to ip "+ ip + ":" + port);
					console.log("--------------------------------------------------------------")
					
					client.get('totalRequestCount', function(error, value){
						var count = parseInt(value)+1;
						//console.log('Total count: ',value, count);
						client.set('totalRequestCount', count);
						client.get(ip, function(err, val){
							var reqCount = parseInt(val)+1;
							client.set(ip, reqCount);
							//console.log('Total count: ',val, avg);
						}); 
					});
				});        
	        }        
		});
	}else{
		proxyServer.web(req, res, { target: "http://"+ apiReqIp + ":" + port });		
		console.log("The request ",req.method, req.url," got delegated to ip "+ apiReqIp + ":" + port);
		console.log("--------------------------------------------------------------")
	}  
}); 

var checkStatus = setInterval(function(){
	client.LLEN('instanceList', function(err, length) {
		console.log('length: ',length);
		if (length > 0){
			client.rpoplpush('instanceList', 'instanceList', function(request, reply){
				currentServer = reply;
				client.get(currentServer, function(err, val){
					var count = parseInt(val);
					if(count > 0){
						console.log("Checking status of ip: ", currentServer);
						try{
							var checkreq = http.get('http://'+currentServer, function (res) {
							 	console.log("working fine.");
							}).on('error',function(){
							});
							checkreq.setTimeout(1500, function(err){
								console.log("*********Error occured. Raising Alert*********");
								alert = true;
								client.lrem('instanceList',0,currentServer);
								var msg = "Error occured on sever "+currentServer+"\n Server is shutting down.";
								slack.notify(msg);								
							});
						}catch(e){
						}
					}
				});
			});
		}
	});
},5000);

console.log("Proxy server listening on port 8090")
proxy.listen(8090);