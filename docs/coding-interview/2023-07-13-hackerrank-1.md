---
title: "HackerRank - 2D Array - DS"
description: HackerRank 문제 2D Array - DS 리뷰
date: 2023-07-13 14:15:00
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
---

# 개요

!!! note ""
    * 문제 링크 : [2D Array - DS](https://www.hackerrank.com/challenges/2d-array/problem?isFullScreen=true)

더이상 자료구조를 자세히 모르는 상태에서 문제를 푸는 것은 뚫린 독에 물붓기이라고 생각해서 자료구조 문제를 풀어보았다.

자료구조를 모르면 자료를 검색하거나, 정렬하거나, 데이터가 어떠한 형태로 구성되는지도 모르기 때문에 최적화 한 방법대로 풀지 못하기 때문이다.

## 문제 요약

`6*6 2차원 배열`이 주어지면 아래의 그림과 같이 ^^maximum hourglass sum^^ 값을 구하는 것이다.

hourglass란, 3*3 2차원 배열이 주어졌을때 아래와 같은 패턴의 모양이라고 보면 된다.
``` title="hourglass pattern"
a b c
  d  
e f g
```

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-13/2d-array1.png){ width="600" }
  <figcaption>그림 1 - 문제 요약</figcaption>
</figure>

**문제의 입력값**은 다음 범위 로 주어진다
각 접근할 수 있는 index를 `i` `j`라고 할 때

* 0 <= `i, j` < 5
* -9 <= `arr[i][j]` <= 9


## 문제 분석

### top, middle, bottom 으로 생각하기
{==hourglass를 나누어서 생각하자==} 여기선, 제일 윗 부분을 `top`, 중간을 `middle`, 아랫 부분을 `bottom`으로 생각한다.

### top과 bottom은 같은 패턴으로 움직인다.
`top`과 `bottom`은 3개씩 똑같이 움직인다. 다만, 차이점은 top 1이 첫 번째 row라고 하면 bottom은 3번째 row라는 것이다. 즉 row의 길이가 2차이가 나서, {==for문을 만들 때, len(arr) - 2까지 계산==}한다.

### middle 패턴 분석
`top`의 첫 번째 index 기준으로 `middle`값은 첫 번째 index의 대각 방향이다 즉, `i,j` 값이 top의 처음이라면 middle index는 `i+1, j+1`이다.

정리하자면 아래와 그림과 같이 top, middle 그리고 bottom이 움직이는 것을 정의했다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-13/2d-array2.png){ width="600" }
  <figcaption>그림 2 - glasshour의 이동 방식</figcaption>
</figure>



## 문제 풀이

문제풀이는 아래의 코드에 따라 작성하면 되며 top 과 bottom은 같이 계산하고, middle만 따로 계산하는 것을 볼 수 있다.

최대값을 초기화 할 때, [문제의 입력값](/fromitive-blog/coding-interview/2023-07-13-hackerrank-1/#_2)에서 알 수 있듯이 array하나의 값은 -9가 최소이므로 -9 * 7 = -63이다.
``` python title="hourglasssum.py" linenums="1"
def hourglassSum(arr):
    maximum = -63

    for i in range(len(arr) - 2):
        for j in range(len(arr[i]) -2):
            top = sum(arr[i][j:j+3])
            middle = arr[i+1][j+1]
            bottom = sum(arr[i+2][j:j+3])
            maximum = max(maximum,top+middle+bottom)

    return maximum
```

알고리즘의 시간 복잡도는 arr의 길이에 따른 2중 반복문에 가장 큰 영향을 받으므로 `O(len(arr)^2)` 라고 생각한다.