# CSC519HW1

###SHARATH SREENIVASAN. STUDENT ID - 200109355

##REQUIREMENTS

1. npm, node should be installed in host machine
2. User should have an account in DigitalOcean and Amazon AWS
3. User should also have SSH Key for DigitalOcean
4. User should have the AWS Access Key and AWS Secret Key

##STEPS

1. Clone the repository
2. Install the dependencies - npm install
3. Provision a droplet on DigitalOcean - node digitalOceanProvision.js
4. Provision an AWS EC2 instance - node awsProvision.js

##CONCEPTS

1.

Idempotency means that the result of a successful performed request is independent of the number of times it is executed.
Examples of idempotent -

- GET and PUT methods are said to be idempotent

Examples of non idempotent -

- POST and PATCH are not idempotent.

2.

Issues related to management of your inventory

- Dynamic configuration properties can be difficult to manage and debug.
- There is a trade-off between releasing the configuration change quickly and a complete product.
- Handling of private data is difficult due to security issues.
- Managing and isolating access to certain servers can be difficult due to security threats.

3.

PUSH MODEL

It's a central management model in which a configuration server pushes changes out to the assets

Advantages

- Errors are synchronous
- It is simple
- Better at ensuring assets stay in sync with the configuration

Disadvantages

- Lack of scalability
- Lack of Full Automation

PULL MODEL

It's a distributed management model where each asset manages itself.

Advantages

- Full automation capabilities
- Each asset can register by itself
- Increased scalabilites

Disadvantages

- Needless complexity

4.

Consequences of not having proper Configuration Management

- Losing productivity when a component is replaced with a flawed new component and it takes time to revert to a working state.
- Redoing implementation because you implemented to meet the requirements that had changed and was not communicated to all parties.
- Figuring out which system components to change when the requirements change.

##SCREENCAST

Link for screencast - https://youtu.be/Iralgx8AR68
