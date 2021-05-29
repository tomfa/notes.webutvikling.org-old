---
title: 'Center content in HTML mails for OWA'
date: 2015-08-26
image: ./onlineprinters-oIpJ8koLx_s-unsplash.jpg
tags: [guide, email, litmus, outlook, putsmail]
author: tomfa
status: publish
---

_Edit: Stop what your doing. It's hurting, I know. Go read [The Easy Way of Sending Newsletter Emails](http://notes.webutvikling.org/the-easy-way-of-sending-newsletter-emails/)._

**Outlook Web App is horrible.**

[https://litmus.com/community/discussions/1354-email-content-and-table-centering](https://litmus.com/community/discussions/1354-email-content-and-table-centering) Lead me to write

```html
<html>
  <body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table width="600" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td style="text-align: left">ADD ALL YOUR STUFF HERE</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

Which worked when testing mail-send using [https://putsmail.com](https://putsmail.com)
