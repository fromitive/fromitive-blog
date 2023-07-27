---
title: "HackerRank - Components in a graph"
description: HackerRank Components in a graph 문제 리뷰
date: 2023-07-27 21:09:45
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
  - Graph
  - DFS
---

# 개요

!!! note
    * 문제 링크 - [Components in a graph](https://www.hackerrank.com/challenges/components-in-graph/problem?isFullScreen=true) 

!!! abstract "요약"
    1. Graph 안에 이어진 Edge의 최대 값 최소 값을 구하는 문제
    2. undirected Graph를 구현하는 방법에는 adjacent list가 있다.
    3. DFS를 재귀함수를 사용하지 않고 구현하는 법은 stack과, visit list를 생각하자

## 문제 요약

문제는 Graph를 활용하여 문제를 해결해야 한다.  각 Node의 연결 정보를 주어지면, 이어진 Edge의 최대 및 최소 갯수를 구해야 한다. 

## Graph 개요

Graph 는 비선형 자료구조이며, 순차적이지 않으며 자료끼리의 불규칙한 관계를 표현하는게 특징이다.

Graph는 Node와 Edge로 구성이 되는데, Node 혹은 Vertex는 각각의 **꼭지점 정보**를 가리키며 각 Node를 **이은 선들**을 Edge라고 한다.

문제에 나와있는 Graph 종류는 undirected Graph 이며, {==Node의 연결방향이 없는게 특징이다==} 예로 들어, **Node1이 Node2와 연결되어 있다면, Node2도 Node1과 연결되어있다는 것을 표현**해야 한다.

<figure markdown>
![Image title](/fromitive-blog/assets/2023-07-27/graph1.png){ width="600"}
<figcaption>그림 1 - undirected Graph</figcaption>
</figure>

## Graph 구현

그래프를 구현해야 할 때 고려해야 할 사항은 2가지를 생각해볼 수 있다.

```
🕸️ Graph를 구현할 때 고려해야 할 사항
1. Node의 자료와, 연결을 어떻게 표현할 것인지.

2. 연결 된 Node를 어떻게 탐색할 것인지
```

### 노드 연결 방법 (Add Edge)

노드의 연결을 표현하는 방법은 대표적으로 2가지가 있다.

<figure markdown>
![Image title](/fromitive-blog/assets/2023-07-27/graph2.png){ width="600"}
<figcaption>그림 2 - Graph의 연결 표현 방법</figcaption>
</figure>

```
🖼️ Graph의 연결 표현 방법


1. adjacency list로 표현하는 방법

2. adjacency Matrix로 표현 하는 방법
```

`adjacency list`는 Graph를 표현할 때 list를 활용하여 표현하는 방법으로 `Node의 값을 key`로, `연결 정보를 List로` 저장하는 방법이다.

`adjacency matrix`는 `2차원 배열`을 생성하여, `데이터에 접근할 때 필요한 index로 Node`의 값을 표현하고, `행렬의 값을 연결 정보`를 표현할 때 사용한다. 예로 들어서 1이면 연결, 0이면 연결이 되어 있지 않음으로 말이다.  

따라서 그래프를 초기화 하고 데이터를 삽입 할 때 각각의 방법을 적용하여 구현한 결과는 아래와 같다. Node 번호는 문제의 조건과 동일하게 1부터 시작하도록 구현하였다.

각 Node의 {==연결 방향이 없으므로==} `Node1`과 `Node2`를 연결할 때 한쪽 Node만 저장하지 않고, 두 Node 전부 연결 정보를 추가하였다.

``` python title="graph.py" linenums="1" hl_lines="4"
from typing import List
class Graph:
  def __init__(self,numberofNode):
      self.graph = { i:[] for i in range(1, numberofNode + 1)}
      self.numberofNode = numberofNode

  def add_edge(self,edge_info:List[int]) -> None: # edge_info 가 [Node1 Node2]로 되어있다고 가정
      Node1, Node2 = edge_info
      # Node 연결 방법 - adjacency list
      self.graph[Node1].append(Node2)  
      self.graph[Node2].append(Node1)
```

``` python title="graph-matrix.py" linenums="1" hl_lines="4"
from typing import List
class Graph:
  def __init__(self,numberofNode):
      self.graph = [[ 0 for index in range(numberofNode + 1 )] for index in range(numberofNode + 1)]
      self.numberofNode = numberofNode

  def add_edge(self,edge_info:List[int]) -> None: # edge_info 가 [Node1 Node2]로 되어있다고 가정
      Node1, Node2 = edge_info
      
      # Node 연결 방법 - adjacency matrix
      self.graph[Node1][Node2] = 1 
      self.graph[Node2][Node1] = 1 
```

### 연결되어있는 Node 탐색 방법

Node 탐색방법에는 BFS, DFS가 있지만 BFS는 아직 안다루고 DFS 먼저 다룰 예정이다.

DFS는 연결된 연결된 Node의 연결된 Node의 연결된 Node의 ... 이런식으로 깊이를 우선적으로 고려하여 탐색한다.

BFS는 짧게 설명하자면 하나의 Node에서 연결된 Node 정보들 전부를 우선적으로 탐색하는 것이라고 생각하면 된다.

<figure markdown>
![Image title](/fromitive-blog/assets/2023-07-27/graph3.png){ width="600"}
<figcaption>그림 3 - DFS 탐색 방법</figcaption>
</figure>

---

Graph를 탐색할때는 `비선형구조`이기 때문에 탐색하려는 시작 Node를 우선적으로 설정해줘야 한다.

그리고 탐색 시 연결된 Node가 이미 탐색한 Node인지 아닌지 확인하기 위해 추가 정보도 필요하다.

이 추가 정보를 저장하기 위한 List형 자료형을 `visit_list` 라고 표현하자.

`visit_list`의 크기는 Node의 자료 크기 길이 즉, Node가 1번부터 10번까지 있으면, {==visit_list는 11(0 제외)이고 값이 전부 false인 Array이다[^1]==}.
[^1]: 왜 11로 설정했냐면, index 0 이라는 공간을 내어주는 대신 {==0을 계산하지 않고 코드의 가독성을 챙기기 위해서이다 Node 1을 index - 1 로 사용하다보면 코드를 이해하기 불편해 지기 때문에==} 

아래의 그림과 같이 탐색할 1번 Node를 선택하였다면, `visit_list[1]`에 `True`값으로 변경하고, 아직 방문하지 않은 Node가 있을경우 순차적으로 그 Node를 방문하면 된다.

방문하는 방식은 크게 2가지가 있으며 첫번 째 방법인 **재귀함수를 이용한 방법** 먼저 살펴보자.

#### DFS(Depth-First-Search) 방법 1 : visit list와 재귀함수 이용

재귀함수란, 함수의 정의에 해당 함수를 호출하는 방식으로 이루어진 함수이다. 

DFS과정은 Node를 재귀적으로 탐색하는 걸 구현하는데 특화되어 있어서, 코드가 간결해진다. 

아래는 재귀함수를 이용한 DFS 구현 예제이다.

``` python title="graph_dfs.py" linenums="1"
class Graph:
    # (중략)
    
    # get connected node from adjacency list
    def get_connected_node(self,start):
        return self.graph[start]

    # get connected adjacency matrix node
    def get_connected_node(self,start):
        return [ idx for idx,connected in enumerate(self.graph[start]) if connected == 1 ]

    def search_using_DFS(self,start):
        def _internal_DFS(start):
            # check startNode not visit
            if not visit_list[start]:
                print(start)
                visit_list[start] = True  # visit
                for node in self.get_connected_node(start):
                    if not visit_list[node]:
                        _internal_DFS(node)  # search connected Node
        visit_list = [ False for i in range(self.numberofNode + 1)]
        _internal_DFS(start)      
```

#### DFS(Depth-First-Search) 방법 2 : visit list와 stack 이용

재귀수를 이용한 탐색 방법은 최대 재귀함수 호출 개수가 제한되어 있으면, 중간에 오류가 난다. 

이번에는 이를 해결하기위해 stack과 visit list를 이용한 방법을 소개한다.

방문해야 할 Node를 stack에 저장한다.

stack을 다 비울때까지 방문을 진행하며, 이미 방문한 Node를 visit list로 관리한다.

``` python title="graph_dfs_using_stack.py" linenums="1"
class Graph:
    # (중략)
    
    def search_using_DFS2(self,start):
        stack = []
        visit_list = [ False for i in range(self.numberofNode + 1)]

        stack.append(start)
        while stack:
            node = stack.pop()
            if not visit_list[node]:
                print(node)
                visit_list[node] = True
                stack.extend(self.get_connected_node(node))  # add to visit list
```

## 문제 분석

Edge의 최대 최소를 구하기 위해서, DFS를 한개의 Node만 하는게 아니라, 저장하고 있는 Node를 전부 탐색해야 원하는 결과가 나올 것으로 예상된다. 

## 문제 구현

``` python title="componentsInGraph.py" linenums="1" hl_lines="3 11 12"
def componentsInGraph(gb):
    # build graph
    graph = { i:[] for i in range(1,len(gb) *2 + 1)} # set 1 to 2N graph
    # add edge
    for n,v in gb:
        graph[n].append(v)
        graph[v].append(n)
        
    # dfs search
    cluster_count_list = []
    visited = [False] * ((len(gb) * 2) + 1)# set visited list
    for start_point in graph:
        if not visited[start_point]:
            cluster_count_list.append(0)
            stack = [start_point]
            while stack:
                node = stack.pop()
                if not visited[node]:
                    visited[node] = True
                    cluster_count_list[-1] += 1
                    for vertex in graph[node]:
                        if not visited[vertex]:
                            stack.append(vertex)
        if cluster_count_list[-1] == 1:
            cluster_count_list.pop()
    return [min(cluster_count_list),max(cluster_count_list)]

```

`3줄과 11줄`에서 ^^문제의 조건에 따라^^ 최대 Node 데이터의 범위대로 공간을 할당하고,

`12줄`에서 graph 내에 있는 Node들의 Edge를 전부 탐색하여 최대 최소를 구하기 위해 cluster_count_list 자료형에 연결된 Edge개수를 저장하고 있다.

