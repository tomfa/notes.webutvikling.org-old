---
title: "Build screen bootup"
date: 2016-09-14
image: ./buildscreen.png
tags: [bash, build screen, jenkins, reload page, xdotool]
author: tomfa
status: publish
---

I have a "stupid computer" whos job is only to show a build screen. Its a debian, and I'd like for it to automatically reload the build page every 5 minutes, as well as enter the build screen in case of a reboot. Here's one way to do it.

1.  **Install prerequisites**

```
apt-get install xdotool
apt-get install iceweasel
```

**2\. Add the following to a startupscript (e.g. ~/startup.sh)**

```
#!/bin/sh

# open build screen url in firefox
iceweasel http://url.to.build.screen.com

# Allow 15 seconds to load
sleep 15;

# Clicks Enter to log in (autofill)
xdotool key KP\_Enter

# Click F11 to maximize screen
xdotool key F11

# Loop reload every 5 minutes
while true; sleep 300; xdotool key ctrl+r; done
```

**3A) Add file to startup by appending**

```
sudo cp startup.sh /etc/init.d/startup.sh
chmod 755 /etc/init.d/startup.sh
sudo update-rc.d startup.sh defaults
```

**3B) (if you have an LXDE environment)**

```
echo "@./startup.sh" >>~/.config/lxsession/LXDE-myuser
```
