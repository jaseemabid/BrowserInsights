#!/bin/bash

while inotifywait -e modify css/style.less; do
        echo
		lessc -x css/style.less css/style.css
        echo +++ Last run: `date`  +++
done
