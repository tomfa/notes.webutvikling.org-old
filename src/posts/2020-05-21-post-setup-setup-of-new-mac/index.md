---
title: "Post-setup setup of new Mac"
date: 2020-06-03
eImage: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"
imageAlt: Laptop on a desk. Photo by Nick Morrison on Unsplash.
tags: ["brew"]
author: tomfa
status: publish
---

Every ~4 years, I'm getting a new Mac. It has happened a few times now, so I thought I might as well make a setup guide for next time.
Also, it's interesting to see how many (or few!) things change.


### Install brew
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install formulas
```
brew tap heroku/brew
brew install  \
    heroku \
    node  \
    n  \
    pyenv  \
    redis  \
    postgresql  \
    z   \
    zsh   \
    oh-my-zsh 
    zsh-completions   \
    git   \
    diff-so-fancy   \
    yarn  \

```

#### n postsetup
You want to use n without sudo, see [n on github](https://github.com/tj/n):

```sh
sudo mkdir -p /usr/local/n
sudo chown -R $(whoami) /usr/local/n
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
```

#### oh-my-zsh
Make zsh nicer.

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install Homebrew casks
```sh
brew cask install \
    dropbox  \
    iterm2  \
    google-chrome  \
    firefox  \
    keybase  \
    1password  \
    slack  \
    webstorm  \
    pycharm  \
    visual-studio-code  \
    spotify  \
    alfred  \
    figma  \
    postman  \
    spectacle \
    sublime-text \
    ngrok
```

#### Link settings files

```
cd
ln -s Dropbox/settings/.git\_profile
ln -s Dropbox/settings/.bash\_profile
ln -s Dropbox/settings/.gitignore\_global
ln -s Dropbox/settings/.gitconfig
ln -s Dropbox/settings/.zshrc
```

```
touch .local_profile .zshrc.local
```

#### Iterm

*   Install the delicious [Dejavu Sans Mono For Powerline](https://github.com/powerline/fonts/tree/master/DejaVuSansMono)
*   Add settings by going to `General -> Load preferences from a custom folder or url` and loading the iterm folder from `Dropbox/settings/iterm`

## Webstorm/Jetbrains

*   Get IDE settings/plugins synced from my account


### (Subjective) preferences

- **Make Alfred search for folders and Chrome bookmarks** – Alfred -> *Settings* 
- **Make Caps lock button act as CTRL instead** – "Keyboard" -> *Modifier Keys*
- **Swap windows within application with `cmd-ctrl-tab`** –  "Keyboard" -> *Shortcuts* -> *Keyboard* -> *Move focus to next window* (You might as well remove the other stupid shortcuts once you're here)
- **Remove the bad shortcuts** –> "Keyboard" -> *Shortcuts* -> Generally remove what you don't know and use.
- **Make Spectacle start automatically** - "Spectacle" -> settings and check it.
- **Hide that Dock** – Put in on the right side, autohide and make it small.
- 
