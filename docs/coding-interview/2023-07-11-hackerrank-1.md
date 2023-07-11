---
title: "HackerRank - Hackerland Radio Transmitters #2"
description: HackerRank 문제 Hackerland Radio Transmitters 리뷰 (해결)
date: 2023-07-11 15:37:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
  - searching
---

# 개요

!!! note ""
    * 문제 링크 : [Hackerland Radio Transmitters](https://www.hackerrank.com/challenges/hackerland-radio-transmitters/problem?isFullScreen=true)

!!! info ""
    * 이전 게시물 : [HackerRank - Hackerland Radio Transmitters #1](/fromitive-blog/coding-interview/2023-07-10-hackerrank-1)


어제 풀다 시간이 없어서 못풀었던 문제이고, 결국엔 [Discussions](https://www.hackerrank.com/challenges/hackerland-radio-transmitters/forum)으로 문제에 대한 힌트를 얻을 수 있었다.[^1]

[^1]: 말이 힌트지, 정답을 봤다. 

## 문제 요약

아래의 그림 처럼 1차원 공간에 Hackerland City가 있는데, 도시의 시장은 라디오 송수신기를 건물에 설치하여 도시에 라디오를 배포할 예정이다.

라디오 송수신기의 허용 범위를 `k` Hackerland City에 속해있는, 각 집들의 위치정보 배열을 `x`라고 할 때 **라디오 송수신기의 최소 설치 개수**를 구하는 문제이다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city1.png){ width="600" }
  <figcaption>그림 1 - 문제 요약</figcaption>
</figure>


## 문제 분석

### 1. 정렬을 하자

검색 계열의 문제는 검색을 최적화 하기 위해 정렬이 필수인 것 같다. 정렬하지 않으면 하나를 비교할 때마다 모든 경우의 수를 계산해야 할 것이고, 시간 복잡도가 올라갈 거라 생각한다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city2.png){ width="600" }
  <figcaption>그림 2 - 가용 범위 비교</figcaption>
</figure>


### 2. 오른쪽으로 닿으면, 상대방 입장에서 왼쪽으로 전파가 닿는다.  

Discussions을 보고 깨달은 건, {==오른쪽에 위치한 건물에 전파가 닿으면 그 건물도 마찬가지로 왼쪽으로 전파를 쏜 건물에 닿는다==}는 것이다.

최대로 전파를 발생시킬 수 있도록 설치되어야 할 건물을 탐색 할 때에는 ^^기준 건물^^ 에서 {==오른쪽으로 탐색해가며 전파가 건물에 닿는지 확인하면==},

동시에 그 건물은 왼쪽에도 전파를 뿌릴 수 있기 때문에 전파를 뿌릴 수 있는 최대 지점이 된다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-11/city1.png){ width="600" }
  <figcaption>그림 3 - 가용 범위 비교</figcaption>
</figure>


### 3. 오른쪽으로 최대로 전파가 닿는지점을 찾고 나서는?

`최대로 전파가 닿는 지점`을 찾고나서 기준을 `최대로 전파가 닿는 지점`으로 설정하고 또 다시 최대로 닿을 수 있는 지점을 `오른쪽`으로 탐색한다.

최대로 닿을 수 없으면, 해당 지점을 다음 기준으로 삼는다. `다음 기준`은 {==오른쪽에 있는 결과를 신경쓰지 않아도 된다==}. 어차피 오른쪽은 최선의 결과이기 때문이다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-11/city2.png){ width="600" }
  <figcaption>그림 4 - 다음 기준 설정</figcaption>
</figure>


## 풀이

해당 문제는 아래와 같이 작성하면 풀리게 된다.

``` python title="hackerlandRadioTransmitters.py"
def hackerlandRadioTransmitters(x:List[int], k:int) -> int: 
    sorted_x = sorted(x)  # 1. 우선 List를 정렬해준다 시간 복잡도 O(nlogn)
    i = 0  # 첫번째 기준의 idx를 초기화 해준다.
    installed = 0  # 설치 개수를 초기화 한다.
    while(i < len(sorted_x)):
        j = i + 1  # 첫번째 탐색 idx를 초기화 해준다.
        reach = sorted_x[i] + k  # 현재 기준의 거리를 계산한다.

        # 1. [첫 번째 loop] 오른쪽으로 닿을 수 있는 최대 거리를 구한다.
        while(j < len(sorted_x) and sorted_x[j] <= reach):
            j += 1
                
        i = j - 1  #. 최대로 닿을 수 있는 idx를 기준 idx로 설정한다.
        reach = sorted_x[i] + k  #. 해당 idx 기준으로 거리를 재계산 한다.
        
        # 2. [두 번째 loop] 최대 거리로 닿을 수 있는 기준에서 또 다시 오른쪽으로 최대 거리를 구한다.
        while(j < len(sorted_x) and sorted_x[j] <= reach):
            j += 1
            
        i = j  # 3. 닿을 수 없는 지점을 다음 기준 idx로 설정한다.
        installed += 1  # 설치 개수를 1개 올려준다.
    return installed         
```