exports.apiInfo = function(callback) {

	var http = require('http');

	var str = '';

	http.get("http://validate.jsontest.com/?json=%7B%22key%22:%22value%22%7D", function(response){
		response.on('data', function(data){
			str += data;
		});

		response.on('end', function(){
		callback(JSON.parse(str));
		});

		response.on('error', function(){
		console.log(error);
		callback(error);
	})
	
	})
	.end();
}





