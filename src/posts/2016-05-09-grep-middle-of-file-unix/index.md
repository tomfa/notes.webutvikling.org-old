---
title: "grep middle of file (unix)"
date: 2016-05-09
image: 
tags: [bash, grep]
author: tomfa
status: publish
---

How to grep tails and head

*   **head -1000 file.txt: **gives first lines 1-1000 lines
*   **tail -1000 file.txt: **gives the last 1000 lines
*   **tail +1000 file.txt: **gives all lines from 1001 -> last line
*   **head -2000 file.txt | tail -1000: **gives lines 1001-2000
*   **tail +1000 file.txt | head -1000: **gives lines 1001-2000
