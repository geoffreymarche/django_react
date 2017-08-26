#!/bin/bash

echo "py lib install"
pip install -r requirements.txt
echo "npm lib install"
npm install
echo "webpacket compilation"
./node_modules/.bin/webpack --config webpack.config.js
echo "/!\ the installation is over /!\"
