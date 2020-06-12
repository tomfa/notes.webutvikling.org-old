---
title: "Center content in HTML mails for OWA"
date: 2015-08-26
image: 
tags: [email, litmus, outlook, putsmail]
author: tomfa
status: publish
---

_Edit: Stop what your doing. It's hurting, I know. Go read [The Easy Way of Sending Newsletter Emails](http://notes.webutvikling.org/the-easy-way-of-sending-newsletter-emails/)._ **Outlook Web App is horrible.** [https://litmus.com/community/discussions/1354-email-content-and-table-centering](https://litmus.com/community/discussions/1354-email-content-and-table-centering) Lead me to write

```
<html>
 <body>
 <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">
<!-- This is your container, you can shrink this if you want, but it's not recommended to go over 600px. 600px is generally the standard width for desktop/web. -->
<table width="600" border="0" cellpadding="0" cellspacing="0">
 <tr><td style="text-align: left">
 blargh blargh
 blargh blargh
<!-- Add your layout tables here. Make sure they all have the attribute align="center" -->
</td></tr></table>
</td></tr></table>
 </body>
```

Which worked when testing mail-send using [https://putsmail.com](https://putsmail.com)
