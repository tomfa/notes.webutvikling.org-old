---
title: 'Sending and receiving JSON over Bluetooth'
date: 2015-05-10
image: ./harrison-broadbent-__LXdDYiL-w-unsplash.jpg
tags: ['guide', bluetooth, iot, javascript, json]
author: tomfa
status: publish
---

I'm new to the whole Bluetooth communication game, but in my case I've run into having to communicate using 8-bit usigned integer arrays (I've used Cordova libraries to communicate with Arduino chips).

In order to do this I've had to convert from and to JSON structures on the Cordova side. I've done this with the two methods [here](https://gist.github.com/tomfa/706d10fed78c497731ac 'Github Gist: Javascript-intarray'). On the Arduino side i use [bblanchon's ArduinoJson](https://github.com/bblanchon/ArduinoJson)

_Edit: In the end, I ended up the JSON-communication. Now I communicate with simple 8-bit integers instead. It's arguably simpler._
