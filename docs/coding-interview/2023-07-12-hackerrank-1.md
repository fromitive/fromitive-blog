---
title: "HackerRank - Minimum Absolute Difference in an Array"
description: HackerRank 문제 Minimum Absolute Difference in an Array 리뷰
date: 2023-07-12 14:27:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
  - greedy
---

# 개요

!!! note ""
    * 문제 링크 : [Minimum Absolute Difference in an Array](https://www.hackerrank.com/challenges/minimum-absolute-difference-in-an-array/problem?h_r=profile)

문제풀이는 뻘짓 포함해서 25분 걸린 것 같다. 아직 문제가 익숙하지 않아서 그런가보다. 여러 문제를 접하고 기록하다 보면 금방 실력이 늘지 않을까?

## 문제 요약

정수 배열이 주어지면 {==두 개의 정수를 선택하여 최소 절대 빼기 값==}를 구하는 문제이다.

최소 절대값 빼기 값에 `빼기`, `절대값`, `최소`가 들어 있는데 예로 들어서 2 , -2를 구하면 절대값 빼기는 | 2 - -2 | 또는 | -2 - 2 | 로 4이다[^1].


[^1]: `| 식 또는 정수 |`는 절대 값을 뜻하며 크기만을 비교하기 위해 사용된다 따라서 결과값은 0 또는 양의 정수가 나온다, 예로 들어 ` |-2| = 2, |2| = 2` 이다. 


## 문제 분석

### 나누어 생각해보기

배열 `arr = [ -2 2 4] `를 생각해보자. 조합할 수 있는 쌍은 `(-2,2), (2,4), (-2,-4)`이다. 이 중 최소 절대 빼기 값은 `|-2 - 2| = 4, |2 - 4| = 2, |-2 - -4| = 6` 으로 `|2 - 4| = 2` 이다.

### 모든 조합을 구하여 계산하기에는 연산을 많이 한다.

문제는 정렬되지 않은 정수 배열을 받기 때문에, 모든 숫자를 비교하는 작업은 `O(len(arr)! = len(arr) * len(arr - 1).... * 1)` 연산이 들어간다. 따라서 모든 조합을 구하고 최소값을 구하는건 속도가 느리다. 

### 모든 경우의 수를 안구해도 최소값을 구할 수 있으면?

절대값 빼기가 최소일 경우를 생각해보자. 예로 들어 `arr = [3, -7, 0]` 배열이 주어지고 이를 정렬하면 `arr = [0, 3, -7]` 이다.

이렇게 하게 되면 적어도 `(0,-7)` 조합은 최소값에서 제외이다. 둘 사이에 정수 값 3이 있기 때문이다.

{==인접한 두 정수의 차이를 계산==}하는게 ^^**현재 최소는 아니더라도**^^ 컴퓨터가 {==모든 경우의 수를 구하지 않고 최소값을 구할 수 있는 힌트==}가 된다. 

따라서 최소값을 구하기 위해선 {==인접한 두 배열 요소를 계산하여 다음 인접한 배열요소와 비교하여 누가 더 작은지 비교하면 된다==}


## 문제 풀이

문제풀이는 아래의 코드에 따라 작성하면 되며, 정렬을 한 후 순차적으로 계산 하여 누가 작은지 계속 비교한다.

``` python title="minimumAbsoluteDifference.py" linenums="1"
def minimumAbsoluteDifference(arr):
    arr.sort()  # 배열을 정렬한다.
    min_num = abs(arr[0] - arr[1])
    for idx in range(1,len(arr)):
        min_num = min(abs(arr[idx - 1] - arr[idx]), min_num)  # 인접한 두 수의 절대 빼기 값을 구하여 최소값과 비교한다. 
    
    return min_num  # 구한 최소값을 반환(return)한다.
        
```

이 알고리즘의 **시간 복잡도**는 sort의 성능에 달려 있으므로 O(len(arr)* loglen(arr))라고 생각한다.
