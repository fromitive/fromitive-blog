---
title: HackerRank - Big Sorting
description: HackerRank 문제 Big Sorting 리뷰
date: 2023-07-09 18:33:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
  - sorting
---

# 문제 요약

!!! note ""
    * 문제 링크 : [Big Sorting](https://www.hackerrank.com/challenges/big-sorting)

문자열 정수 (예: '1','124' ...)로 이루어진 배열이 주어지면 해당 문자열 정수를 `오름차순`으로 정렬하는 알고리즘을 작성해야 한다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-09/bigsort1.png){ width="600" }
  <figcaption>그림 1 - 문제 요약</figcaption>
</figure>


## 문제 분석

### 1. 단순하게 int로 변환하는 것은 한계가 있다.

문제의 의도는 문자열을 정수형으로 변환하여 비교하지 못 할때 어떻게 비교할 것인가를 질문하고 있는 것으로 보인다.

문자열을 정수로 변경하여 비교 할 경우, 정수의 표현 제한인 21억 즉, {==10자리 밖에 비교할 수 없다.==}

입력값이 11 자리 수 이상으로 넘어갔을 때 어떻게 숫자를 비교할 지 고민 할 수 밖에 없다.

### 2. 문자열의 길이를 비교하고, 그 다음 문자열 자체를 비교하는 것이다.

어차피 {==숫자의 크기가 아니라 길이==}가 긴 것만 비교하면 어느정도 정렬 할 수 있어 보인다. 10자리 수와 9자리 수 는 적어도 10배 이상 차이가 나니까 말이다. 

만약, {==숫자의 길이가 같을 경우==}에는 어떻게 비교 해야 할까? 이는, {==문자 자체를 비교==}하면 해결 된다.

이 문제를 풀었을 때, ^^**문자의 길이가 같을 경우 문자를 그냥 비교 문에 넣었을 때 제대로 동작할까?**^^ 라는 의문을 가졌었다.

대부분의 프로그래밍 언어는 문자의 길이가 같을 때 비교하게 되면 [어느정도 정렬을 하는 것 같다](https://www.hackerrank.com/challenges/big-sorting/forum).

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-09/bigsort1.png){ width="600" }
  <figcaption>그림 2 - 숫자 비교</figcaption>
</figure>


## 풀이

문제 풀이는 너무 간단하다. 이렇게 허무하게 풀릴 줄 몰랐다. 문제를 풀고, 답을 참조했는데. 아래와 같이 작성하면 처음엔 길이를 비교하고 다음엔, 문자열 자체를 비교한다고 한다.

``` python title='bigsort1.py' linenums="1"
#!/bin/python3

def bigSorting(unsorted:List[str]):
    return unsorted.sort(key=lambda x : (len(x),x)) # 처음엔 길이를 비교하고, 두번 째로는 문자열 자체를 비교

```

다음은, 답을 보기 전에 생각한 알고리즘 이다.

비교를 할 때, 문자열의 길이가 같으면 `for`문을 돌려 {==제일 앞 숫자부터 정수형 자료형으로 바꾸어 비교==}하는 것이다.

제공하는 key 함수를 어떻게 사용할 줄 몰라서 검색해 보니, 

파이썬에서 기본적으로 제공하는 `functools.cmp_to_key` 함수를 이용해, 오른쪽 값이 크면 `-1` 왼쪽 값이 크면 `1`을 반환하여 비교하도록 하는 예제가 있어 그것을 응용하였다.

``` python title='bigsort2.py' linenums="1"
#!/bin/python3

def bigSorting(unsorted:List[str]):
    def compare(pair1:str,pair2:str):  # 문자열 정수를 비교하는 키 함수
        pair1_len = len(pair1)
        pair2_len = len(pair2)


        if pair1_len < pair2_len:  # 길이 비교
            return -1 # right return
        elif pair1_len == pair2_len:  # 길이가 같을 경우
            for p1, p2 in zip(pair1, pair2):  # 제일 앞 숫자부터 비교한다.
                if int(p1) < int(p2):
                    return -1
                elif int(p1) > int(p2):
                    return 1
        return 1 # left return
    compare_key = cmp_to_key(compare)
    unsorted.sort(key=compare_key)
    
    return unsorted
    
```

`bigsort1.py` 처럼 간단하게 풀리는 것이였다니, 잃은 것보다 얻는게 더 많았던 문제였던 것 같다.


