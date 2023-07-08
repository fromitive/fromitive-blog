---
title: HackerRank - Number Line Jumps
description: HackerRank 문제 Number Line Jumps 리뷰
date: 2023-07-08 18:10:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
---

# 문제 요약

* 문제 링크 : [Number Line Jumps](https://www.hackerrank.com/challenges/kangaroo/problem)

캥거루 2마리가 한 방향으로 시간이 지날 때마다 일정한 거리로 점프를 하게 되는데 이때, 두 캥거루가 같은 시간 대에 같은 위치에 존재할 수 있는지 확인하는 코드를 작성하는 문제이다.

아래와 같이 캥거루 2마리가 있으며 뒤에 있는 캥거루, 앞에 있는 캥거루의 위치를 각각 `x1, x2`라 하고, 각 캥거루가 한 번에 뛸 수 있는 거리를 `v1, v2` 라고 하자.
<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/kang1.png){ width="600" }
  <figcaption>그림 1 - 캥거루</figcaption>
</figure>

두 캥거루가 N번 뛸 때 서로 만난다면 `YES` 라고 출력결과가 나와야 하며, 그렇지 않을 경우 `NO`라고 나타나야 한다.

문제의 조건은 다음과 같다

* 0 <= x1 < x2 <= 10000
* 1 <= v1 <= 10000
* 1 <= v2  <= 10000

## 문제 분석

### 1. v1이 v2 보다 크지 않을 경우 영원히 만나지 않는다.

{==뒤에 있는 x1 캥거루의 한번에 뛸 수 있는 거리 v1이 v2보다 작을 경우==} x1 캥거루와 x2 캥거루의 격차가 더욱 벌어지므로 우선적으로 v1 <= v2[^1] 일 경우 `NO`를 출력한다.
[^1]: 문제의 조건에서 x1 캥거루의 위치가 x2 캥거루 보다 항상 뒤에 위치해 있기 때문에 v1 = v2일 경우에도 만나지 않는다.

### 2. 두 캥거루의 위치를 ^^step에 따른^^ 좌표로 표현한다. 

두 캥거루의 위치를 step에 따른 좌표로 나타내어 **만날 경우**와 **만나지 않을 경우** 는 아래와 같이 표현할 수 있으며, {==step은 연속적이지 않기 때문에==}, 이 점을 고려하여 문제를 풀어야 한다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/kang2.png){ width="600" }
  <figcaption>그림 2 - 캥거루의 위치를 좌표로 표현</figcaption>
</figure>

## 풀이

[위의 같이 표현한 좌표](/fromitive-blog/coding-interview/2023-07-08-hackerrank-1/#2-step)의 방정식을 세우게 되면 되면 {==v1 > v2==} 일 때, 서로 만나는 지점을 아래의 그림처럼 표현할 수 있고 이를 코드로 옮기면 된다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/kang3.png){ width="600" }
  <figcaption>그림 3 - 두 캥거루가 만나게 되는 시점</figcaption>
</figure>

여기서 `Step`은 연속적인 수가 아니고 {==1, 2, 3, 4, 와 같이 양수==} 이므로 `(x2 - x1) % (v1 - v2) == 0` 일 때 두 캥거루가 서로 만나게 된다[^2].

이를 코드로 옮기면 다음과 같이 나타나게 된다.

``` python title='kangaroo.py' linenums="1"
#!/bin/python3

def kangaroo(x1:int, v1:int, x2:int, v2:int) -> str:
    if v1 <= v2:
        return "NO"
    
    if (x2 - x1) % (v1 - v2) == 0:
        return "YES"
    else:
        return "NO"

```

[^2]: 0으로 나누어 떨어지게 되면, 정수 값이 나오기 때문이다. 