#!/bin/bash
# pm2 start /claystack/claystack-pm2.config.js --only "test"
# /bin/bash
/usr/sbin/crond -f -l 8
