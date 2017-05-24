# CSC519HW3

## CONCEPTUAL QUESTIONS

#### 1. Benefits and Issues of Using Feature Flags

  Benefits -

a) Eliminates the cost of maintaining and supporting long-lived branches

b) Helps reducing deployment risk through canary release or other incremental release strategies

Issues -

a) Makes code harder to test

b) Decreases security

c) Complexity of running multiple versions of the same thing in parallel with only one version visible to a given customer at a time

#### 2. Reasons for keeping servers in separate availability zones

a) Increase in the fault tolerance and stability

b) No replication of resources

c) If  one instance fails, you can design your application so that an instance in another Availability Zone can handle requests.

#### 3. Describe the Circuit Breaker pattern and its relation to operation toggles.

Circuit breaker is used to detect failures and encapsulates logic of preventing a failure to reoccur constantly. The basic idea is wrapping a protected function call in a circuit breaker object, which monitors for failures. Calling the circuit breaker will call the underlying block if the circuit is closed, but return an error if it's open.

Operation toggles allow teams to modify system behavior without changing code. They fall into various usage categories, and it's important to take that categorization into account when implementing and managing toggles. Most toggles are short lived. However, it is not uncommon for a machine to have a small number of long lived "Kill Switches" which allow operators of production environments to gracefully degrade non-vital system functionality when the system is enduring high load.

#### 4. What are some ways you can help speed up an application that has

a) If the traffic is at a peak on a particular evening, such as Monday in this case then one of the ways of by reducing the number of plugins and reduce the number of re directs which create additional HTTP requests.

b) If there are many real time concurrent connections then I would suggest the use of the browser cache. The browser can load the page without having to make HTTP requests to the server

c) If there is heavy upload traffic then the best way to speed it up would be by enabling compression. Compression reduces the bandwidth of your pages, thereby reducing HTTP response


## SCREENCAST

1. http://youtu.be/rTDHL86PQnI?hd=1

2. http://youtu.be/bEMdxN8PLzQ?hd=1
