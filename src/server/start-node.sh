#!/usr/bin/bash
echo "Starting Script"
echo "Changing Directories"
cd /home/cornwal2/public_html/
echo "Starting server"
npm run pm2start
echo "Exiting"
exit