---
title: 'Django autocomplete in (virtualenv) shell'
date: 2015-01-10
image: ./joan-you-KFuX5rmAWZ4-unsplash.jpg
tags: ['guide', autocomplete, bash, django, python, shell]
author: tomfa
status: publish
---

1. Create a file .pythonrc in `~/.pythonrc`

```python
# enable syntax completion
try:
    import readline
except ImportError:
    print("Module readline not available.")
else:
    import rlcompleter
    readline.parse_and_bind("tab: complete")
```

2. Export it by adding this export to your profile file (if you use zsh, append to ~/.zprofile instead)

```bash
echo "export PYTHONSTARTUP=~/.pythonrc" >> ~/.bash_profile
```

Tada! After having reopened your terminal window, you should now get
autocomplete when opennig up `python`

### Virtualenv

Want it in virutalenv? Append it to your activate file instead of your profile

```bash
echo "export PYTHONSTARTUP=$HOME/.pythonrc" >> ./env/bin/activate
```

---

Relevance of the image? "Way out" is a suggestion at a terminal! 😉
