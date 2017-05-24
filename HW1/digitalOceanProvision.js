var needle = require("needle");
var os   = require("os");

var config = {};
config.token = process.env.DOToken;

var headers =
{
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + config.token
};


var client =
{
        createDroplet: function (dropletName, region, imageName, onResponse)
        {
                var data =
                {
                        "name": dropletName,
                        "region":region,
                        "size":"512mb",
                        "image":imageName,
                        // Id to ssh_key already associated with account.
                        //"ssh_keys":[5949695],
                        "ssh_keys":null,
                        "backups":false,
                        "ipv6":false,
                        "user_data":null,
                        "private_networking":null
                };

                console.log("Attempting to create: "+ JSON.stringify(data) );

                needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
        }
};

var name = "ssreeni"+os.hostname();
var region = "nyc1"; // Fill one in from #1
var image = "ubuntu-14-04-x64"; // Fill one in from #2
client.createDroplet(name, region, image, function(err, resp, body)
{
        console.log(body);
        // StatusCode 202 - Means server accepted request.
        if(!err && resp.statusCode == 202)
        {
                console.log( JSON.stringify( body, null, 3 ) );
        }
 })