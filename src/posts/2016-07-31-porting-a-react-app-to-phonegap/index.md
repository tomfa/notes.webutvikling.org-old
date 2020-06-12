---
title: "Porting a React app to Phonegap"
date: 2016-07-31
image: ./react-app.jpg
tags: [cordova, es6, mobile app, phonegap, react]
author: tomfa
status: publish
---

If you already have a React web app, and consider porting it to a proper phone app, you should consider using [React Native](https://facebook.github.io/react-native/). However, you could also use PhoneGap/Cordova, which is done in a heartbeat:

How?
----

1.  The initial steps of setting up [Phonegap](http://phonegap.com/getstarted/)
2.  Open PhoneGap and create an app.
3.  Open **www/index.html **in the generated app, and insert
    
    ```
    <script type="text/javascript" src="js/bundle.js"></script>
    ```
    
    **before** the import of js/index.js
4.  You also need to allow the use of **eval**, by making sure the line regarding Content-Security-Policy looks something like this:
    
    ```
    <meta http-equiv="Content-Security-Policy" content="default-src \* 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src \*" />
    ```
    
5.  **Copy** your webpacked **bundle.js** file from your original react app to **js/bundle.js in** ****the generated PhoneGap app****
6.  In **js/bundle.js,** wrap the whole content inside a function that you can later call.
    
    ```
    var runOriginalApp() {
        <YOUR-ORIGINAL-BUNDLE-JS-CONTENT>
    }
    ```
    
7.  In **js/index.js, **call this function inside **onDeviceReady:**
    
    ```
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        runOriginalApp();
    },
    
    ```
    
8.  If you're doing api calls as well, ensure you are allowed to contact your api with a line such as this in **config.xml:**
    
    ```
    <allow-intent href="\*://\*api.your-domain.com/\*"/>
    ```
    
    and for that you might need to install the whitelist plugin
    
    ```
    cd ./your-phonegap-folder
    cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git
    ```
    
9.  At last, make sure any API-calls **inside your original code** goes to that domain name, using the full urls, i.e. _http://api.domain.com (_**not** //api.domain.com or /api/posts)
10.  Compile it to an .apk by installing phonegap with npm and running compile:
    
    ```
    npm install phonegap -g 
    phonegap cordova build android
    phonegap cordova build ios
    ```
    

Voila! It's now stored as an apk in:

*   **platforms/android/build/outputs**
*   **platforms/ios/build/**

* * *

*   [Phonegap > Get started](http://phonegap.com/getstarted/)
