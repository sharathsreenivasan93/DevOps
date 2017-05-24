var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'us-east-1';

AWS.config.update({

   accessKeyId: process.env.AccessKey,
   secretAccessKey: process.env.SecretKey

});

var ec2 = new AWS.EC2();

var params = {
  ImageId: 'ami-8e5fd299',
  InstanceType: 't1.micro',
  MinCount: 1, MaxCount: 1,
};

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  var instanceName = 'ssreeni-AWS-instance';
  console.log("Created instance", instanceId);
         
  // Add tags to the instance
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: instanceName}
  ]}; 

  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });

  params = {
    InstanceIds: [ instanceId ] 
  };
    
});