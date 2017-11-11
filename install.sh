#!/bin/bash

set -e

if [[ `id -u` -ne 0 ]] ; then echo "Correr con sudo" ; exit 1 ; fi

apt install -y nodejs npm

npm install -g electron
npm install

chown -R $USER /usr/local