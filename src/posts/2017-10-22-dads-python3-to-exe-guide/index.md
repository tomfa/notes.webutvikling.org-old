---
title: "Dads python3-to-exe guide"
date: 2017-10-22
image: ./old_man.jpeg
tags: [exe, python]
author: tomfa
status: publish
---

Dad is a good guy. But he ain't like

> virtualenv -p $(pyenv which python3) .venv, then pip install -r requirements.txt? NP, SON!

He's more like

> When I double click the python file, cmd flashes and I bluescreen.

So he needs an exe file. Here's a general snippet for converting python3 to exe

```
virtualenv -p $(pyenv which python3) .venv
pip install [cx\_Freeze](http://cx-freeze.readthedocs.io/en/latest/index.html)
```

Then, the two files in [this gist](https://gist.github.com/tomfa/9677ff180bbfc02a47b164cd70e4fb59), and run (from the same directory):

```
python setup.py build
```

Voila! Your executables should be in the **./build** folder _Ouch: The executables can only be run on the same OS as they're built :( Ouch2: It's not 1 executable. It's more like 1000 files + 1 executables that all should be run together. _
