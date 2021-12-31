---
title: 'Setting up a new developer Macbook'
date: 2020-06-03
eImage: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80'
imageAlt: Laptop on a desk. Photo by Nick Morrison on Unsplash.
tags: ['guide', 'brew', 'mac', 'tools']
author: tomfa
status: publish
---

Every ~4 years, I'm getting a new Mac. It has happened a few times now, so I thought I might as well make a setup guide for next time.
Also, it's interesting to see how many (or few!) things change.

### Install brew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install formulas

```bash
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
    git   \
    diff-so-fancy   \
    yarn  \
    ffmpeg
brew install hashicorp/tap/terraform
```

#### n postsetup

You want to use n without sudo, see [n on github](https://github.com/tj/n#installation):

```bash
sudo mkdir -p /usr/local/n
sudo chown -R $(whoami) /usr/local/n
sudo mkdir -p /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
```

#### oh-my-zsh

Make zsh nicer.

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install Homebrew casks

```bash
brew install --cask \
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
    rectangle \
    sublime-text \
    ngrok
```

Log in to dropbox

#### Link settings files

_This is how I keep settings synced across machines_

```bash
cd
ln -s Dropbox/settings/.git_profile
ln -s Dropbox/settings/.bash_profile
ln -s Dropbox/settings/.gitignore_global
ln -s Dropbox/settings/.gitconfig
ln -s Dropbox/settings/.zshrc
```

_Local adaptations_

```
touch .local_profile .zshrc.local
```

#### Iterm

- Install the delicious [Dejavu Sans Mono For Powerline](https://github.com/powerline/fonts/tree/master/DejaVuSansMono)
- Add settings by going to `General -> Load preferences from a custom folder or url` and loading the iterm folder from `Dropbox/settings/iterm`

## Webstorm/Jetbrains

- Get IDE settings/plugins synced from my account

### (Subjective) preferences

- **Make Alfred search for folders and Chrome bookmarks** – Alfred -> _Settings_
- **Make Caps lock button act as CTRL instead** – Alfred-search "Keyboard" -> _Modifier Keys_
- **Swap windows within application with `cmd-ctrl-tab`** – Alfred-search "Keyboard" -> _Shortcuts_ -> _Keyboard_ -> _Move focus to next window_
- **Remove the bad shortcuts** –> Alfred-search "Keyboard" -> _Shortcuts_ -> Generally remove every you don't know or use.
- **Make Spectacle start automatically** - Alfred-search "Spectacle" -> settings and check it.
- **Hide that Dock** – Put in on the right side, autohide and make it small.
- **Set finder to always open in list view** – Open finder, click your harddisk, [click cmd-J and configure](https://apple.stackexchange.com/questions/284467/how-to-set-finder-to-always-use-list-view).


### Update 2022

- [Spectacle](https://www.spectacleapp.com/) replaced with [Rectangle](https://rectangleapp.com/), due to [no longer in active development](https://www.spectacleapp.com/)
- [Keybase](https://keybase.io/) removed. [Zoom acquired them](https://blog.zoom.us/zoom-acquires-keybase-and-announces-goal-of-developing-the-most-broadly-used-enterprise-end-to-end-encryption-offering/), and Mac Silicon [seems to be a problem](https://www.reddit.com/r/Keybase/comments/qiuxgn/apple_silicon_support/).
- Removed zsh-completions
- Added [terraform](https://www.terraform.io/downloads)
