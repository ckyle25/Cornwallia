#!/usr/bin/bash
echo "Starting Script"
echo "Changing Directories"
cd /home/cornwal2/public_html/
echo "Starting server"
/home/cornwal2/bin/pm2 start index.js -i 1
echo "Exiting"
exit