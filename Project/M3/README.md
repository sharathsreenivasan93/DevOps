# CSC519-Project

## Project Team:
| Name         	| Unity Id 	|
|--------------	|----------	|
| Aparna Patil 	| akpatil  	|
| Keshav Parthasarathy 	| kpartha2  	|
| Sharath Sreenivasan 	| ssreeni  	|
| Shreya Pagedar 	| svpageda  	|

## Milestone 3: Deployment 

For running this milestone, clone this repository and checkout M3 branch.

    git clone https://github.ncsu.edu/akpatil/CSC519-Project.git
    git checkout M3
    
Our production infrastructure and deployment pipeline has following different components:

### Components for Checkboxio application

* **Creation of AWS instances:** 

The first step is to create all the AWS instances required to deploy our entire application. 
We are creating three AWS instances which will be acting as our:

1) Production Server
2) Canary Server
3) Proxy-redis server
4) Jenkins Server

To create these instances first ensure to export the AWS access and secret keys as AWS_ACCESS_KEY and AWS_SECRET_KEY environment variables. 
Also, ensure to create a EC2 key-pair with name "csc519_project" in AWS. 

To create the instances run the script aws.sh as follows:

    ./aws.sh

This script will create the instances and create the necessary inventory files.

Also, run the ansible playbook the install jenkins on AWS instance and create jobs for production and canary releases.

    cd /CSC519-Project/Deployment/nodejsProject/Deploy/jenkins_setup
    anisble-playbook -i inventory deploy_jenkins.yaml

* **Deployment:** 

Clone the production checkbox.io repository locally

    git clone https://github.com/AppyDev/production.git

Set the remote

    git remote add production http://github.com/AppyDev/production.git
    
Make some changes to the production and push the changes as follows:

    git push production master
    
Git push will trigger a build which will deploy the checkbox.io application to production server. We have written a web-hook to integrate with jenkins and it triggers jenkins build.  


 ## Screencast for checkbox.io Deployment: https://youtu.be/hMKrixMEtXg
* **Infrastructure Upgrade** 

**1) Load balancer:** 
  
To configure the proxy-redis server, go to folder Proxy. 
Run the playbook proxyRedis.yml to install and configure proxy server and global redis server as follows.
  
    ansible-playbook -i inventory proxyRedis.yml -vvvv 
  
This will configure and start the proxy and redis server on this instance. 
  
Now, if you go to <public IP of Proxy server>:8090 the traffic will be redirected to available servers of production and canary.

 ## Screencast for Proxy: https://youtu.be/VytYB9Hp8PI

**2) Redis feature flagserver:** 
  
Create a redis feature flagserver that can be used to turn off features on checkbox.io. The redis properties server should be mirrored locally to each instance.
 
We have created a checkboxio feature to create a study which can be toggled by setting a key "createStudy" and deleting it. 
This feature allows users to create a study when the feature flag "createStudy" is set to "Yes".
 
For this the global redis server has been mirrored to the redis property servers of each AWS instances.
 
To test this, go to global redis server and set the key "createStudy" to "Yes" as follows:

```
  redis-cli
  set createStudy Yes

```
 
After this go to checkboxio application and try to create the study. A study will be created succesfully because the feature was turned on. 
 
Now, go to global redis server and del the "createStudy" key as follows:
 
 ```
  redis-cli
  del createStudy

```
 
Now, again go to checkboxio application and try to create a study. Now you won't be able to create a study and an error message will be displayed that createStudy feature is unavailable.

 ## Screencast for Featureflag server: https://youtu.be/u2ZXXzi0jHs
  
* **Canary Release**

We have implemented canary release, the load balancer routes 20% of the traffic to the newly staged canary server and 80% of the traffic to the stable production server. The canary server is polled for errors at an interval of 5 secs, an alert is set when an error occurs and the traffic will be routed to only available stable servers.

Check the out.log in servers to see how requests are getting delegated.

To check alert, stop the canary instance from AWS and check all the application routes should be delegated to the stable production servers.

 ## Screencast for Canary Release: https://youtu.be/U_fEsGcWj9Q

### Components for iTrust application

  **1) Deployment of iTrust:**
  
 An ansible playbook that initially provisions 2 EC2 instances - One for jenkins, and one as a production environment.
 The playbook copies the prerequisistes for iTrust to run on both these instances.
 
 Upon pushing any update, a webhook triggers a build on the jenkins server. This, upon a successful build of iTrust, will launch a playbook called iTrust.yml on the EC2 jenkins instance itself. The sole purpose of this playbook is ensure the prerequites are present on the production environment as well as moving the WAR file that has been generated by the build into the right location in the production environment
 
 In order to bring the production environment online, the playbook also performs the starting of Tomcat and MySQL.
 The production environment is now ready.
 
 ## ScreenCast for iTrust Deployment :  https://youtu.be/d3IlRjLy6IE
 
  **2) Rolling Update**. Implement a rolling update deployment strategy for iTrust, where 5 instances of iTrust have been deployed, and each instance of iTrust must be reployed while 4 instances remain operational.
  
  Rolling update works in a very similar way. It deploys 6 instances instead of 2 on the Amazon EC2.


## ScreenCast for iTrust Rolling Update: https://youtu.be/PYAoAHTlVEE
