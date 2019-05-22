#!/bin/sh

set -e

yarn install --no-optional
yarn run prod

printf 'DONE'
