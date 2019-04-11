#!/usr/bin/bash
echo "Starting Script"
echo "Changing Directories"
cd /home/cornwal2/public_html/
echo "Stopping server"
pkill -f node
echo "Starting server"
/home/cornwal2/bin/node /home/cornwal2/public_html/index.js --production
echo "Exiting"
exit
