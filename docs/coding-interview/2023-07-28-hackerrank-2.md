---
title: "HackerRank - Dyanamic Array"
description: "Dynamic Array 문제 분석"
time: 2023-07-28 21:52:50
tags:
  - hackerrank
  - problem solving
  - data structures
  - Array
---

!!! info "문제 링크"
    - [Dynamic Array](https://www.hackerrank.com/challenges/dynamic-array/problem)

## 🔍 문제 분석

**각 idx에 []를 저장하고 있는 2차원 배열** `arr`를 주어지면 **2개의 type을 가진 `Query`**를 처리한 후 **type 2의 결과**를 순차적으로 출력해야 하는 문제이다.

`Query` 는 2가지 `type`이 존재하고, `lastAnswer`는 `0`으로 초기화 한다.

!!! note "Query의 type"
    `type 1` - 1 x y : arr의 idx는 `(x XOR lastAnswer) % arr의 길이`, `arr[idx]` 에 `y`를 저장
    
    `type 2` - 2 x y : arr의 idx는 `(x XOR lastAnswer) % arr의 길이`, `arr[idx][y % arr의 길이]`안에 있는 값을 `lastAnswer`에 저장

### `%` 연산자의 의미

`idx`의 값은 arr 길이를 **모듈러(%) 연산을 하기 때문에** {==arr의 길이를 넘어선 idx를 가질 수 없다==}.

### `XOR` 연산자의 의미

XOR연산은 두 피연산자의 bit가 다를 경우 1, 같을 경우 0으로 계산하는 연산이다.

이것이 무슨 의미로 연산을 하는진 모르겠으나, XOR 연산 결과는 arr 길이를 넘어설 경우에도, {==최종 `idx`값은 `arr의 길이`보다 작은 건 사실이다.==}

## 💡 문제 풀이

문제의 내용을 있는 그대로 적용하여 풀어보자. 문제를 이해하는데, 시간이 오래 걸렸던 문제이다.

``` python title="dynamicArray" linenums="1"
ef dynamicArray(n, queries):
    answer = [] # stored answer of type 2 query resuit
    arr = [[] for i in range(n)]  # store len(n) array inited by [] 
    last_answer = 0  # init lastanswer
    
    # query execute
    for query in queries:
        query_type, x, y = query
        if query_type == 1:
            idx = (x ^ last_answer) % n
            arr[idx].append(y)
            print('idx ', idx, 'arr[{}]= {}'.format(idx, arr[idx]))
        else:
            idx = (x ^ last_answer) % n
            last_answer = arr[idx][y % len(arr[idx])]
            print('last_answer = {}'.format(last_answer))
            answer.append(last_answer)
    return answer
```
