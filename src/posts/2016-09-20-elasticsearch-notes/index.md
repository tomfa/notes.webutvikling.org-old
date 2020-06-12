---
title: "Elasticsearch notes"
date: 2016-09-20
image: 
tags: [elasticsearch]
author: tomfa
status: draft
---

### Me gusta notes

*   Elasticsearch is pretty rad. It's built on top of Apache Lucene, and provides several neat thingies in order to give you a fast, advanced but easy-to-use, searchengine.
*   [Shards](https://www.elastic.co/guide/en/elasticsearch/reference/current/_basic_concepts.html) is a single Lucene index. Nodes are a single server. Cluster is a collection of servers.
*   It's defaults are nice. For example, **robust and fast by default**: An index in Elasticsearch is by default 5 shards + 1 set of replicas. Replicas are duplicated shards on other servers, which give you backup and some load distribution. So if you set up two nodes, you can query faster, and even if one server goes down. By default!

### Installation notes

*   It's **[installation](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)** is two lines:
    *   ```
        curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.2.1/elasticsearch-2.2.1.tar.gz
        tar -xvf elasticsearch-2.2.1.tar.gz 
        ```
        
*   And then you **run** it with one:
    *   ```
        ./elasticsearch-2.2.1/bin/elasticsearch
        ```
        
*   **Kibana** visualizes the data for you, and can be **[installed](https://www.elastic.co/downloads/kibana)** with
    *   ```
        curl -L -O https://download.elastic.co/kibana/kibana/kibana-4.4.2-darwin-x64.tar.gz
        tar -xvf kibana-4.4.2-darwin-x64.tar.gz
        ```
        
*   Then you can **[install](https://www.elastic.co/guide/en/sense/current/installing.html) Sense **in order to test querying/updating/deleting with
    *   ```
        ./bin/kibana plugin --install elastic/sense
        ```
        
*   Remember to point to your _elasticsearch.url_ to your server in **config/kibana.yml**
    *   _elasticsearch.url_: _"http://localhost:9200" _
*   And of course you need to run it
*   *   ```
        ./kibana-4.4.2-darwin-x64/bin/kibana
        ```
        

### Usage notes

*   **Uploading files** to be indexed (manually - for testing) was a tad annoying. It uses newlines as delimiter, and mixes actions and metadata with data. In order to **bulk upload two objects**, the [syntax goes like](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html):
    
    ```
    action\_and\_meta\_data\\n 
    optional\_source\\n 
    action\_and\_meta\_data\\n 
    optional\_source\\n
    ```
    
    Which honestly.. makes me scratch my head and wonder if I haven't misunderstood something. A product this neat and nice that mixes actions, metadata and data source into one big mash?
*   lol
