---
title: "HackerRank - Left Rotation"
description: "Left Rotation 리뷰 - 배열을 순환하는 방법"
time: 2023-07-28 21:34:56
tags:
  - hackerrank
  - problem solving
  - data structures
  - Array
---

!!! info "문제 링크"
    - [Left Rotaion](https://www.hackerrank.com/challenges/array-left-rotation/problem)

## 🔍 문제 분석

길이가 n인 배열을 왼쪽으로 d번 순환한 결과물을 반환하는 문제이다.

### 🔃 왼쪽으로 순환 하는 방법

예를 한번 들어보자. 배열 `arr`이 `[1, 2, 3, 4, 5]`로 주어지고, `4번` 왼쪽으로 순환하면 아래와 같은 과정을 거친다.

!!! note "arr 배열 4번 순환
    1번 - [2, 3, 4, 5, 1]
    2번 - [3, 4, 5, 1, 2]
    3번 - [4, 5, 1, 2, 3]
    4번 - [5, 1, 2, 3, 4]

즉 정답은 `[5, 1, 2, 3, 4]`이다. 그러나, {==**이렇게 순자척으로 전부 구해야 할까**?==}

4번 순환하는 것은 즉, `arr[4:] + arr[:4]`와 동일한 것을 확인할 수 있다.

굳이 순환을 순서대로 하지 않고 배열의 일정 부분을 잘라서 다르게 붙이면 같은 결과가 나온다.

``` python title="leftRotate.py" linenums="1" hl_lines="5"
Python 3.11.4 (tags/v3.11.4:d2340ef, Jun  7 2023, 05:45:37) [MSC v.1934 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> arr = [1,2,3,4,5]
>>> arr[4:] + arr[:4]
[5, 1, 2, 3, 4]
```

### ⭕ 순환하는 것은 다시 원래상태로 돌아갈 수도 있는 것이다.

순환하는 것은 곧 원래의 배열 상태로 돌아가는 것이다. 위의 예제에서 `arr`을 5번 왼쪽으로 순환시키면 `arr`가 그대로 나타나는 것을 확인할 수 있다.

즉, {==5번 순환은 0번 순환과 동일==}하고 6, 7, 8, 9 도 각각 1, 2, 3, 4번 회전한 것과 동일하다.

배열의 길이보다 더 큰 회전수가 나오면 아래와 같이 {==**모듈러 연산을 하여** 연산의 중복을 방지==}하자.

``` python title="leftRotate2.py" linenums="1"
d = d % len(arr)  # d번 순환을 배열의 길이로 mod 연산 진행
arr[d:] + arr[: d]  # 왼쪽으로 순환
```

## 💡 문제 풀이

위의 내용을 종합하여 문제를 풀게되면 아래와 같은 해결방안이 나타나게 된다. 

**문제를 먼저 이해하고** 계산을 최소화 하는 방법을 늘 고민해보자.

``` python title="rotateLeft.py" linenums="1"
def rotateLeft(d, arr):
    rotate_num = d % len(arr)
    return arr[rotate_num:] + arr[:rotate_num]
```
