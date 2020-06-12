---
title: "Django + Heroku bootstrap"
date: 2015-10-05
image: 
tags: [django, heroku, how-to, script]
author: tomfa
status: publish
---

It has happened on more than one occasion that I want a new Django project, with Grunt, jQuery, Bootstrap, Font-Awesome etc, deployed on Heroku. So I decided to write down the steps, and made a bash script to automate it all for me. **Edit:** See [http://tomfa.github.io/herango-bash/](http://tomfa.github.io/herango-bash/) instead. I made a repo for this. Can be seen ta [https://gist.github.com/tomfa/860130912711b9852ae5](https://gist.github.com/tomfa/860130912711b9852ae5). At the location is a bash script that creates a simple django project and publishes it on heroku. **Requirements:**

*   Have got an [Heroku Account](https://wwwheroku.com/)
*   Have got [brew installed](http://brew.sh/)
*   Have got [Git set up with keys](https://help.github.com/articles/generating-ssh-keys/)

If anything else is missing, the script should complain.
