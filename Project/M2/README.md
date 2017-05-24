
##REPORT

### Steps to run iTrust

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

4. Change directory
  
  ```
    cd CSC519-Project/M2/itrust/
  ```
6. Run ansible script
  
  ```
    ansible-playbook -i inventory dev.yml
  ```
    

### Steps to run checkbox.io

1. Setup the node VM

  ```
    Use ip: 192.168.33.10
    Copy the private keys in keys/checkboxio.key
    Change access permissions for the key file
  ```
2. Add following environment variables in your bash:
  
  ```
    export SMTPEMAIL=<Your-email-id>
    export SMTPPWD=<Your-password>
    export gituser=<Your-ncsu-github-email-id>
    export gitpwd=<Your-ncsu-github-password>
    export MONGOUSER=<mongo_user_name>
    export MONGOPWD=<mongo_user_password>
  ```
3. Clone the repository

  ```
    git clone https://github.ncsu.edu/akpatil/CSC519-Project.git
  ```

4. Change directory
  
  ```
    cd CSC519-Project/M2/nodejsProject/
  ```
  
5. Run ansible script
  
  ```
    ansible-playbook -i inventory dev.yml
  ```
  

##WORK SPLIT

* Build Jobs and Jenkins setup - Aparna, Shreya
* Test suites, coverage, and test results - Aparna, Shreya
* Test case fuzzer - Keshav, Sharath
* Uselesss test detector - Keshav, Sharath
* Analysis and build failure - Aparna, Shreya

##SCREENCAST

| Branch         	| Description 	| Screencast 	|
|--------------	|----------	|----------	|
| **master** 	| Checkboxio build job, iTrust build job  	|[Build Screencast](https://www.youtube.com/watch?v=K0z6441H5fA)  	|
| **coverage**  	| Build iTrust, Run Test, Test Reports and Coverage reports  	|[Coverage Screencast](https://www.youtube.com/watch?v=WnFKas9hQ8c)    	|
| **testcases** 	| Fuzzing and useless testcase detector  	|[Testcases Screencast](https://youtu.be/7FOZTixD0pw)    	|
| **analysis**  	| Analysis on checkbox.io  	|[Analysis Screencast](https://www.youtube.com/watch?v=Do228-dgGjw)    	|

##Extra Bonus:
100 test that fail from fuzzing

![Extra Bonus](https://github.ncsu.edu/akpatil/CSC519-Project/blob/master/M2/M2_Extra_Bonus.jpeg)
