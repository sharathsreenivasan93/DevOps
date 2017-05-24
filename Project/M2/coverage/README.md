# Milestone 2 : Test suites, coverage, and test results

## iTrust Build and Test coverage report:

We have extended build definitions for iTrust to include the ability to run its test suite, measure coverage, and report the results. The test report are generated in jenkins UI using the surefire plugin and for the coverage report we have used JaCoCo plugin. This tool generates the coverage report in jenkins.

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
7. Check coverage reports
  
  ```
    Access the jenkins UI in browser with 192.168.33.77:8090
    Click on the build to see surefire test reports and jacoco coverage reports.
  ```
