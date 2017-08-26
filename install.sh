#!/bin/bash
echo "###"
echo "### PY LIB INSTALL ###"
echo "###"
pip install -r requirements.txt
echo "###"
echo "### NPM LIBS INSTALL ###"
echo "###"
npm install
echo "###"
echo "### WEBPACK SCRIPTS COMPILATION"
echo "###"
./node_modules/.bin/webpack --config webpack.config.js
echo "/!\"
echo "THE INSTALLATION IS OVER"
echo "/!\"
echo "### to start your application :"
echo "### ./manage.py runserver"
echo "### OR"
echo "### ./manage.py runserver my-app-ip:my-app-port"
