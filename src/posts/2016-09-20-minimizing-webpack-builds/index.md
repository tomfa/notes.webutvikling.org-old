---
title: "Minimizing Webpack builds"
date: 2016-09-20
image: 
tags: [react, webpack]
author: tomfa
status: draft
---

I'm making a webapp, using react and webpack, and the output bundle is a staggering **6 MB. **I have no idea how I managed to do that, but I know it's not OK. So let's fix it

#### Optimize webpack settings

The first two changes come from [moduscreate.com](http://moduscreate.com/optimizing-react-es6-webpack-production-build/): **Set NODE\_ENV to "production"  **(webpack.config)****

```
// webpack.prod.config.js
var webpack = require('webpack');

...
plugins: \[
  new webpack.DefinePlugin({
    'process.env': {
      'NODE\_ENV': JSON.stringify('production')
    }
  })
\]
```

**Set devtool value to cheap-module-source-map (webpack.config)**

```
// webpack.prod.config.js
var webpack = require('webpack');

...
devtool: cheap-module-source-map,

```

#### Remove heavy libraries

OK, so this is the obvious solution that you don't want to hear: Remove heavy libraries. Removing the use of react-notification-system and its redux-addon react-notification-system-redux saved me **1.46 MB.** This turned out to be due to the import of **lodash**._Note: What you have installed in node\_modules does not matter. Only what you import into your JS files_. That's just one example. For you to get an overview of what happens with your bundle, run webpack with

```
webpack --profile --json > stats.json
```

Then upload the generated **stats.json** file to [http://webpack.github.io/analyse/](http://webpack.github.io/analyse/)

1.  **lodash - 1.37 MB** lodash shouldn't take up this much space. Why it did, I don't know.
2.  **babel-polyfill - 0.74 MB**
3.  **moment - 1.29 MB**
