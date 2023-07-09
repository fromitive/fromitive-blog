---
title: HackerRank - Super Reduced String
description: HackerRank 문제 Super Reduced String 리뷰
date: 2023-07-08 20:47:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
---

# 문제 요약

* 문제 링크 : [Super Reduced String](https://www.hackerrank.com/challenges/reduced-string/problem)

문자열 `s` 를 주어지면 인접한 한 쌍의 문자가 같으면 해당 문자를 지우는 방식으로 최종적으로 남겨진 문자를 출력하거나 비어 있을 경우 `Empty String`을 출력하는 문제이다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/reduce-string1.png){ width="600" }
  <figcaption>그림 1 - 문제 요약</figcaption>
</figure>


## 문제 분석

### 1. 문자의 짝을 찾고 제거 할 때 생각

문자열의 처음 지점부터 다시 시작하는게 편하다. 왜냐하면 위의 그림의 우측의 경우의 수 처럼 한 번 `for` 문을 동작한다면 'aa' 가 남겨저 있을 경우 재 검사하기가 쉽지 않기 때문이다.[^1]

따라서 아래와 같이 문자를 검사할 때, 한번 훑어 보고 조건에 만족하면 해당 문자를 지우고, 다시 검사하도록 하자.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/reduce-string2.png){ width="600" }
  <figcaption>그림 2 - 글자의 검색 방식</figcaption>
</figure>

[^1]: 이 경우를 고려하지 않고 문자를 가리키는 포인터를 이용하여 문제를 해결하려고 했어서, 계속 실패가 떴었다. 

### 2. 문자를 제거하는 방법

문자를 제거하는 방법은 다양하게 생각할 수 있다. 첫 번째로 {==list로 만든 뒤 pop 명령어를 이용하여 제거하거나==}, {==연속하는 문자열의 위치를 확인하고 해당 문자열을 제거==} 하거나 선택을 해야 한다.

다만, 첫 번째 방법으로 하게 될 경우 **리스트로 변환하고 다시 문자열로 변환하기 때문에** 두 번째 방법을 이용하도록 하자.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-08/reduce-string3.png){ width="600" }
  <figcaption>그림 3 - 문자열 제거 방식</figcaption>
</figure>

## 풀이

[분석 1](/fromitive-blog/coding-interview/2023-07-08-hackerrank-2/#1)과 [분석 2](/fromitive-blog/coding-interview/2023-07-08-hackerrank-2/#2)를 조합하면 아래와 같은 코드가 완성된다. 문자를 가리키는 `i` 변수는 더이상 짝이 없을 경우 반복문을 빠저 나가는 형태로 구성되어 있다.

``` python title='reduced-string.py' linenums="1"
#!/bin/python3

def superReducedString(s:str) -> str:
    i = 0 
    while i < len(s) - 1:
        if s[i] == s[i + 1]:  # 인접한 두 문자가 같을 경우
            s = s[:i] + s[i + 2:]  # 인접한 두 문자를 제외한 나머지 문자를 다시 결합한다.
            i = 0  # 재 검사 하기
        else:
            i += 1
 
    if s == "":
        return "Empty String"
    else:
        return s

```
