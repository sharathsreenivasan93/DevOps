#!/bin/bash
cd Proxy/
sudo npm install
node proxy.js
sleep 5
ansible-playbook -i inventory proxyRedis.yml


