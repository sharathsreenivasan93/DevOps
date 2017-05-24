sudo rm Deploy/production/inventory
cd Production/
sudo npm install
node production.js
sleep 5
cd ../Deploy/production
sudo git add inventory
sudo git add roles/redis_slave/vars/proxy.yml
sudo git commit -m "Test"
sudo git push production master
echo "Done!!!"