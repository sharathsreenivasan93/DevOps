var AWS = require('aws-sdk');
var fs = require('fs');

var aws_access_key = process.env.AWS_ACCESS_KEY
var aws_secret_key = process.env.AWS_SECRET_KEY

AWS.config.region = 'us-west-2';
AWS.config.update({accessKeyId: aws_access_key, secretAccessKey: aws_secret_key});

var ec2 = new AWS.EC2();
var inst_num;
var inst_list = [];

var params = {
  ImageId: 'ami-a58d0dc5', 
  InstanceType: 't2.micro',
  KeyName: "csc519_project",
  MinCount: 1,
  MaxCount: 1,
  SecurityGroups: ["launch-wizard-1"]
};


str = "[nodes]\n";
fs.appendFile("./jenkins_setup/inventory", str, function(error) {
if (error) {
            //console.log("Could not write to inventory file");
  } else {
         //console.log("Successfully written to inventory file");
          }
})

    
    
ec2.runInstances(params, function(err, data) {
if (err) { console.log("Error in creating instance", err); return; }
  console.log("\n\n----------------Creating instance for Jenkins server-----------------")
  var instanceId = data.Instances[0].InstanceId;
  getInstanceData(instanceId)

});


function getInstanceData(instanceID) {
    var interval = setInterval(function() {
      ec2.describeInstances({InstanceIds:[instanceID]}, function(err, data) {
        if(err) {
          console.log("ERROR - " + err);
        }
        else {
            if(data.Reservations && data.Reservations[0].Instances) {
              if(data.Reservations[0].Instances.length > 0) {
                var instance = data.Reservations[0].Instances[0];
                console.log("Successfully Created an AWS EC2 Instance");
                console.log("IP address of AWS instance is ", instance.PublicIpAddress);
                str = instance.PublicIpAddress + " ansible_ssh_user=ubuntu ansible_ssh_private_key_file=./keys/csc519_project.pem\n";
                fs.appendFile("./jenkins_setup/inventory", str, function(error) {
                  if (error) {
                      console.log("Could not write to inventory file");
                  } else {
                      console.log("Successfully written to inventory file");
                  }
                })               
              };

                clearInterval(interval);
                
              }
            }
        })
    }, 20000);
  }
