---
title: "Finding postgres logs"
date: 2019-08-24
image: 
tags: []
author: tomfa
status: draft
---

Run select setting from pg\_setting; Specifically, select setting from pg\_settings where name ='log\_directory'; https://dba.stackexchange.com/questions/1350/how-do-i-find-postgresqls-data-directory
