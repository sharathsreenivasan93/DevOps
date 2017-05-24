# Milestone 2: Analysis and build failure 

## Analysis Tool:
This is an analysis tool that runs on checkbox.io's server-side code and implements the following detections.

1. Max condition: Detect the max number of conditions within an if statement in a function (greater than 8).
2. Long method: Detect any long methods (greater than 100 lines of code).
3. The Big O. Detect any method with a big O greater than 3.

Tool will fail the build if any of the above conditions is satisfied.

## Steps to run Analysis Tool:
1. Add following environment variables in your bash:
  
  ```
    export SMTPEMAIL=<Your-email-id>
    export SMTPPWD=<Your-password>
    export GITUSER=<Your-ncsu-github-email-id>
    export GITPWD=<Your-ncsu-github-password>
    export MONGOUSER=<mongo_user_name>
    export MONGOPWD=<mongo_user_password>
  ```
2. Load bashrc into new shell
  
  ```
    source ~/.bashrc
  ```
3. Clone the repository

  ```
    git clone https://github.ncsu.edu/akpatil/CSC519-Project.git
  ```
4. Edit Vagrantfile. Search and update following lines in it:
 
 ```bash
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.provider "virtualbox" do |vb|
    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize [1024]
  end
 ```
5. Start the VM machine 
 
 ```bash
  vagrant up
 ```
6. Check the path of the private key required for SSH 
 
 ```bash
  vagrant ssh-config
 ```
7. Make new directory called keys 
 
 ```bash
  mkdir keys
 ```
8. Copy the contents of private key to jenkins.key file in keys directory. 
 
 ```bash
  cat [path_to_private_key] > keys/checkboxio.key
 ```
9. Change permission to the key file. 
 
 ```bash
  chmod 700 keys/checkboxio.key
 ```
10. Run the ansible playbook for configuring server 
 
 ```bash
  ansible-playbook -i inventory dev.yml
 ```

