---
title: "Django autocomplete in (virtualenv) shell"
date: 2015-01-10
image: 
tags: [autocomplete, bash, django, python, shell]
author: tomfa
status: publish
---

1.  Create a file .pythonrc in `~/.pythonrc`
    1.  ```
        # enable syntax completion
        try:
            import readline
        except ImportError:
            print("Module readline not available.")
        else:
            import rlcompleter
            readline.parse_and_bind("tab: complete") 
        ```
        
2.  Export it by adding this export to your profile file (if you use zsh, append to ~/.zprofile instead)
    1.  ```
        echo "export PYTHONSTARTUP=~/.pythonrc" >> ~/.bash\_profile
        ```
        

### Virtualenv

Want it in virutalenv? Append it to your activate file instead of your profile

```
echo "export PYTHONSTARTUP=$HOME/.pythonrc" >> ./env/bin/activate
```
