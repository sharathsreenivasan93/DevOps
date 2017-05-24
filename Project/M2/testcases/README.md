# Milestone 2 : Test case fuzzer, Uselesss test detector

## Fuzzer:

For this task we have built a fuzzer tool that automatically changes java based application and commits new random changes to source code which will trigger a build and run of the test suite. The tool is written as a bash script which run on the iTrust source code.
 
## Useless Test Detector:

Post commit hook is written to trigger a build when we commit changes to the repository.
We have built an Useless test detector in python that runs for each test suite run, keep track of the test cases that are always passed and detects useless test cases for given N number of builds.

## Steps to run the build:

1. Setup the node VM

  ```
    Use ip: 192.168.33.77
    Copy the private keys in keys/i2.key
    Change access permissions for the key file
  ```
2. Add following environment variables in your bash:
  
  ```
    export gituser=<Your-ncsu-github-email-id>
    export gitpwd=<Your-ncsu-github-password>
  ```
3. Clone the repository

  ```
    git clone https://github.ncsu.edu/akpatil/CSC519-Project.git
  ```
4. Checkout the coverage branch

  ```
    git checkout coverage
  ```

5. Change directory
  
  ```
    cd CSC519-Project/iTrust/
  ```
6. Run ansible script
  
  ```
    ansible-playbook -i inventory dev.yml
  ```
7. Modify the permissions of files 
 
  ```
    sudo chmod u+x executor.sh
    sudo chmod u+x fuzzer.sh
  ```
  
8. Add the following script in post-commit hook

  ```
    #!/bin/bash

    echo "I RAN"
    curl http://192.168.33.77:8090/job/itrust/build?token=12345
  ```
  
9. Update the permissions of post-commit hook

  ```
    sudo chmod 755 post-commit
  ```

10. Update the git global config 

  ```
    git config --global user.email "emailid"
    git config --global user.name "name"
  ```
 
11. Run the executor script for running fuzzer in node

  ```
    cd /var/lib/jenkins/workspace/itrust/
    sudo ./executor.sh
  ```
12. Check useless test reports

  ```
    python uselessDetector.py
  ```

