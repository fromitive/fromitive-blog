---
title: "HackerRank - Sparse Arrays"
description: "Hash Map의 사용 예제"
time: 2023-09-07 17:24:34
comments: true
tags:
  - arrays
  - data structure
  - hash maps
---

!!! info "문제 링크"
    [Sparse Arrays](https://www.hackerrank.com/challenges/sparse-arrays/problem)

## 📃 문제 설명

문자열을 저장하고 있는 Array 2개가 주어진다. 하나는 StringList이고, 다른 하나는 QueryList이다. {==**QueryList의 각 문자열 값이 StringList에 몇 번 나타나는지에 대해 배열로 반환**==}하는 코드를 작성하는 것이다. 

예로 들어 `StringList` 가 `['ab','ab','abc']` 이고 `QueryList`가 `['ab','abc','bc']` 있다고 하자. 그렇다면 결과는 `[2,1,0]` 이 나타나게 된다. QueryList 문자열 순서대로 'ab'는 StringList에서 2개, 'abc'는 1개 그리고, bc는 StringList에 존재하지 않는다.

## 💡 문제 해결 방법

### 단순하게 비교해보기

단순하게 result Array를 QueryList 개수대로 초기화 한 후, 각 Query 대상으로 String 값을 비교하여 해결한다..

아래의 코드 작성으로 충분히 해결 가능하다.

{==**시간 복잡도는 O(queryList*stringList) 정도로 나오므로 데이터가 많을 수록 차이가 더 심해질 것이다.**==}

``` python title="sparse-array1.py" linenums="1"
def matchingStrings(stringList, queries):
    # Write your code herem  
    result = [0] * len(queries)
    for idx, q in enumerate(queries):
        for string in stringList:
            if q == string:
                result[idx] += 1
    return result
```

### Hashmap 사용하기 

단순하게 비교하다 보면, 같은 query를 여러번 계산하는 문제가 존재하기에, 쓸데없는 계산이 나올 가능성이 있다.

이를 해결하기 위해 공통된 데이터를 똑같이 처리할 것이며 가장 적합해 보이는 자료구조는 HashMap이다

Hash Map이란, 데이터의 키를 가지고 있으면 해당 데이터에 직접 접근할 수 있는 자료구조이다. 파이썬에서는 dictionary를 이용하여 HashMap을 사용할 수 있다.

코드 예제는 아래와 같으며 특히 {==**8 번째 줄에서 중복으로 나온 쿼리 결과값을 고려하여 for문을 queryList로 생성한 결과를 반환해준다.**==}

``` python title="sparse-array1.py" linenums="1" hl_lines="8"
def matchingStrings(stringList, queries):
    # Write your code herem  
    result = {q:0 for q in queries}  # create hash map each query words
    for string in stringList:
        if string in result.keys():
            result[string] += 1
    
    return [result[q] for q in queries] 
```

