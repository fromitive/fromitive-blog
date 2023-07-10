---
title: HackerRank - Hackerland Radio Transmitters #1
description: HackerRank 문제 Hackerland Radio Transmitters 리뷰 (미해결)
date: 2023-07-10 14:45:00
comments: true
tags:
  - hackerrank
  - problem solving
  - algorithms
  - searching
---

# 문제 요약

!!! note ""
    * 문제 링크 : [Hackerland Radio Transmitters](https://www.hackerrank.com/challenges/hackerland-radio-transmitters/problem?isFullScreen=true)

아래의 그림 처럼 1차원 공간에 Hackerland City가 있는데, 도시의 시장은 라디오 송수신기를 건물에 설치하여 도시에 라디오를 배포할 예정이다.

라디오 송수신기의 허용 범위를 `k` Hackerland City에 속해있는, 각 집들의 위치정보 배열을 `x`라고 할 때 **라디오 송수신기의 최소 설치 개수**를 구하는 문제이다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city1.png){ width="600" }
  <figcaption>그림 1 - 문제 요약</figcaption>
</figure>


## 문제 분석 (미해결)

### 1. 정렬을 해야 할까?

각 도시들을 오름차순으로 정렬을 한 후 라디오를 하나씩 설치하여 비교를 해보는 것이다. 그렇다면 최소 개수가 나오지 않을까?

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city2.png){ width="600" }
  <figcaption>그림 2 - 가용 범위 비교</figcaption>
</figure>

문제는 어느 걸 선택하는게 최선인지 눈으론 알아도 컴퓨터가 알아 듣게 처리해야 한다는 것이다.

### 2. 정렬을 한 뒤 다이나믹 프로그래밍을 이용하는 것은?

다이나믹프로그래밍[^1]을 이용하여 문제를 작은 단위로 쪼개어 생각해보는 것이다 이렇게 한다면, 최소 설치 개수를 구할 수 있지 않을까? 검토해 보았다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city3.png){ width="600" }
  <figcaption>그림 3 - 가용 범위 비교</figcaption>
</figure>

[^1]: 다이나믹 프로그래밍이란 {==문제를 재귀적으로 쪼개어서 푼다==}라고 생각하면 편하다. 자세한건 [동적 계획법 - 나무위키](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95)를 참조하자

일단은 `x = [1, 2, 3, 5, 9]` `k = 1` 일 경우를 생각해 보자.

`x[0]`에 송수신기를 설치한다면 `x[0], x[1]` 까지 전파가 닿는다. 이렇게 되면, ^^**1 개 설치 후 `x = [3, 5, 9]`  `k = 1` 문제로 쪼개지는 것이다**^^.

`x[1]`에 송수신기를 설치한다면 `x[0], x[1], x[2]`까지 전파가 닿는다. 이렇게 되면, ^^**1 개 설치 후 `x = [5, 9]`  `k = 1` 문제로 쪼개지는 것이다**^^.

`x[2]`에 송수신기를 설치한다면 `x[1], x[2]` 까지 전파가 닿는다. 이렇게 되면, `x[0]` 에는 전파가 닿지 않기 때문에 ^^**문제를 쪼갤 수 없게 된다**^^.

---

따라서 x를 선택할 때 `x[1]`에 송수신기를 설치하는 것이 최대로 전파가 닿기 때문에 이를 어떻게 선택해야 할지도 고민해 봐야 한다.


## 풀이

!!! warning "미완성 문제"
    해당 문제에 대한 정답이 아닙니다. 복붙하여도 통과하지 않으니 참고 부탁드립니다.


다이나믹 프로그래밍을 이용하여 코드를 짰으나, 런타임 오류가 나타났다. 아쉽지만, 문제 풀이를 보고 공부해야겠다..

``` python title="hackerlandRadioTransmitters.py"
def hackerlandRadioTransmitters(x:List[int], k:int) -> int: 
    sorted_x = sorted(x)
    def _install_transmitter(sorted_x:List[int], k:int):
        if len(sorted_x) == 1:  # 1 일 경우 1개 반환
            return 1
        elif len(sorted_x) == 0:  # 0일 경우 0개 반환
            return 0
        else:
            max_transmited_idx = 0  # 최대로 전송할 수 있는 house의 idx가 저장된다. 
            for i in range(len(sorted_x)):
                radio_nagative_range = sorted_x[i] - k
                back_reach_availiable = True
                if i > 0: 
                    # 현재 위치를 기준으로 뒤의 house 까지 전파가 닿는지 확인한다.
                    for back_x in sorted_x[:i]: 
                        if back_x < radio_nagative_range:
                            back_reach_availiable = False
                            break
                if not back_reach_availiable:
                    break
                else:
                    max_transmited_idx = i  # 뒤까지 전파가 닿으면 해당 idx를 최대 전송할 수 있는 idx로 지정한다.
            
            radio_max_positive_range = sorted_x[max_transmited_idx] + k
            
            # idx의 크기가 sorted_x 보다 작고, idx 기준으로 오른쪽으로 전파가 최대한 닿을 수 있을때까지 idx를 더한다
            while max_transmited_idx < len(sorted_x) and radio_max_positive_range >= sorted_x[max_transmited_idx]:
                max_transmited_idx += 1
                
            return 1 + _install_transmitter(sorted_x[max_transmited_idx:], k) # 뒤에 남아있는 house를 대상으로 재 호출한다.
    return _install_transmitter(sorted_x, k)
```

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-10/city4.png){ width="600" }
  <figcaption>문제 풀기 실패!</figcaption>
</figure>