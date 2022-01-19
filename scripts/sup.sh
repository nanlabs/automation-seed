#!/bin/bash

# make sure you downloaded cm and you give it exec access
# it can be installed from here https://aerokube.com/cm/latest/
# chmod +x cm

# init selenoid
./cm selenoid start --vnc

# init selenoid ui
./cm selenoid-ui start