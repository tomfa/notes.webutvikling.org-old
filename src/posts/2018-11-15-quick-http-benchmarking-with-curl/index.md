---
title: "Quick http benchmarking with curl"
date: 2018-11-15
image: ./chuttersnap-gts_Eh4g1lk-unsplash.jpg
tags: ["guide", "tools", bash, performance]
author: tomfa
status: publish
---

From time to time, I'd like to see how the performance gain/loss was after a code change. Say I've updated locahost:8000/search and I'd like to do 100 http calls to localhost:8000/search?q=fish to see how it performs: 

1.  Save the file below as **benchmark.sh**

```bash
#!/bin/sh
iterations=$1
url=$2

echo "Running $iterations iterations for curl $url"
totaltime=0.0

for run in $(seq 1 $iterations)
do
 time=$(curl $url -s -o /dev/null -w "%{time\_starttransfer}\\n")
 totaltime=$(echo "$totaltime" + "$time" | bc)
done

avgtimeMs=$(echo "scale=4; 1000\*$totaltime/$iterations" | bc)

echo "Averaged $avgtimeMs ms in $iterations iterations"
```

2\. Run with the following command

```bash
sh benchmark.sh 10 http://google.com
```

3\. Output

```
Running 10 iterations for curl http://google.com
..........
Averaged 88.0227 ms in 10 iterations
```

[https://gist.github.com/tomfa/2509a9a6695462df928d7fe30c25d787](https://gist.github.com/tomfa/2509a9a6695462df928d7fe30c25d787)
