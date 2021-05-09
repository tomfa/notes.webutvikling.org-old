---
title: "Access Google Analytics API with OAuth token"
date: 2016-11-29
image: ./graphic-1142957_1280.jpg
tags: ["guide", API, auth, ga, google analytics, java, javascript, jwt]
author: tomfa
status: publish
---

Notes on adding a Google Service worker that enables you to query Google Analytics with an access token.

* * *

**Create service user and add key file on server side **

#### Step 1: Generate JSON key

1.  Go to https://console.developers.google.com/
2.  Create a project with your name
3.  Select Region closest to you
4.  Click create
5.  Go to the project and click Enable API
6.  Select Analytics API
7.  Click Enable
8.  Click Go to Credentials
9.  Select Analytics API, Other UI and Application data --> What Credentials do I need
10.  Type an account name. Note down the service account ID for later
11.  Role: Project viewer and Project browser
12.  A JSON will be downloaded. Keep this safe – you have the only copy, and it grants you access to your Analytics data

* * *

**Allow service user read access to your google analytics**

#### Step 2: Give permissions

Add permissions to your google analytics for that service worker. Think of as service worker as a separate account. It will need to be added in your google analytics -> Admin -> User management

* * *

**Extract access key from key file**

#### Step 3: Code to extract access key

In order to query the API, you need an access token. This token will only last half an hour, so you'll need some code that extracts the temporary access key, using the JSON-credentials you created in step 1. The code below gives you an accessToken that can be used with requests to the API.

#### Java

```java
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.services.analytics.AnalyticsScopes;

GoogleCredential credential = GoogleCredential
    .fromStream(new FileInputStream("./your-keyfile.json"))
    .createScoped(Collections.singleton(AnalyticsScopes.ANALYTICS\_READONLY));

credential.refreshToken();
System.out.println(credential.getAccessToken());
```

**Maven-repository:**

```xml
<dependency>
    <groupId>com.google.apis</groupId>
    <artifactId>google-api-services-analytics</artifactId>
    <version>v3-rev134-1.22.0</version>
</dependency>
```

* * *

**Use access key to do queries on the Google Analytics API**

#### Step 4: How to use the access key

Use the Access key to read from your Google Analytics. The API can be explored [here](https://ga-dev-tools.appspot.com/query-explorer/), and you'll see the URL you need to request (and where to put the access key). You can now go ahead and knock yourself out.
