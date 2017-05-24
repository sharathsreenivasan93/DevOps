# CSC519-Project: Special milestone 

## Ultra monkey with Slackbot


The Ultra Monkey is the implementation of the Special Milestone

It's primary purpose is to provide highly available and load balanced network services. Since the production environments are currently hosted on AWS Cloud Services, ensuring High Availability is critical. High availability refers to a characteristic of a system hwich aims to ensure an agreed upon level of operaitonal performance in terms of uptime.

Reliance on High Availability has become manifold in recent times. To ensure High availability, the following tasks are performed
 1. Eliminate Single point in failure - This is achieved by providing Mulitple Production Environments, across which service requests are distributed.

 2. Detection of Failure - We ensure failures are detected by checking for heartbeat messages (through a ping script) from each of the servers

 3. Failure is fixed - Upon detecting a failure, the Ultra Monkey instantly provides the user with an option to spin up a new AWS instance, and deploy to this new production environment.


## Load Balancing.

A load balancer is used to distribute network or application traffic across a number of servers. It is a critical factor in the product's ability to scale.

The Monkey monitors the redis proxy server to analyse the distribution of service requests acrross the production envvironments. The failure of an instance could result in a load increase on the remaining produciton environments. The monkey calculates the percentage of requests being directed to each server over a number of total requests to determine the load on each server.If the observed load exceeds a predetermined threshold, the monkey takes matters into its own hands, and automatically provisions a new production enviroment, deploying Checkbox.io onto it.


## Architecture of Ultra Monkey 

![alt tag](https://github.ncsu.edu/akpatil/CSC519-Project/blob/M4/Ultrabot%20Arch.png)

## Steps for running Ultra Monkey

1. Setup jenkins server
   
       cd Deploy
       npm install
       node jenkins.js
       cd jenkins_setup/
       ansible-playboook -i inventory deploy_jenkins.yaml
   Create global credentials on jenkins to add ssh key for login into AWS machines. Copy the id and paste it into the xml files in jonConfig folder.
       
       ansible-playbook -i inventory create_jobs.yaml
 2. Setup proxy server

        bash setupProxy.sh
 3. Run bot and load balancer
 Login to proxy aws instance.
 
        cd tool/
    Add bot key to the environment variable.

        node bot.js
 4. Go the slack channel https://csc519-project.slack.com/messages/C537LEVBL/
 
        @monkeybusiness Spin
 This command will create a new AWS instance and deploy the latest version of checkbox.io in it. And the load balancer will continue to delegate the requests to all the available stable production servers. If load increases above the set threshold on any of the servers then new instance will automatically spinned up. In case of any error on the available server, notification will be sent to the slack channel.
               
# SCREENCAST

https://youtu.be/gQisWiWzXyk
