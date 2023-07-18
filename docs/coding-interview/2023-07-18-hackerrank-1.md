---
title: "HackerRank - Queue using Two Stacks"
description: HackerRank Queue using Two Stacks 문제 리뷰
date: 2023-07-18 11:50:00
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
  - Queue
---

# 개요

!!! note
    * 문제 링크 - [Queue using Two Stacks](https://www.hackerrank.com/challenges/queue-using-two-stacks/problem?isFullScreen=true) 


`Queue(큐)`는 먼저 들어온 데이터가 먼저 처리되는 `First-In-First-Out - FIFO` 특징을 가지고 있는 자료구조 이다.

아래와 같이 은행 창구, 맛집 손님, 티케팅 대기 등 수많은 대기열 시스템에서 많이 활용된다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue1.jpg ){ width="600" }
  <figcaption>그림 1 - 큐의 예제(대기열) [출처 - unsplash]</figcaption>
</figure>


## 문제 개요

아래의 연산을 지원하는 컴퓨터가 있다고 한다. 각 번호는 연산 번호인데, 번호마다 다음과 같은 동작을 수행한다.

``` title="연산자 종류"
type 1 - 큐에 데이터를 저장한다.
type 2 - 큐에 앞부분에 있는 데이터를 추출한다.
type 3 - 큐의 앞부분에 있는 데이터를 출력한다.
```

문제의 입력 값은 아래와 같이 연산자와 피연산자가 세팅되면(단, `type 1` 만 피연산자가 있음) 결과에 따라 출력이 되어야 한다.

> `입력 값` = ['1 42', '2', '1 14', '3', '1 28', '3', '1 60', '1 78', '2', '2']

> `결과 값` = [14, 14]

`Queue`를 직접 구현하면 문제는 간단하나, 두 개의 `Stack`을 활용하여 `Queue`를 구현해야 하는 문제이다. 

어떻게 접근해야 할까? 

## 문제 분석

### type 1(Enqueue)와 type 2(Dequeue)

`type 1` 연산은 `Queue`에 데이터를 저장하는(Enqueue)를 모습을 구현해야 한다. Enqueue는 아래의 그림과 같다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue2.png){ width="600" }
  <figcaption>그림 2 - Enqueue 설명</figcaption>
</figure>


`type 2` 연산은 `Queue`에 데이터를 꺼내는(Dequeue)를 모습을 구현해야 한다. Dequeue는 아래의 그림과 같다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue3.png){ width="600" }
  <figcaption>그림 3 - Enqueue 설명</figcaption>
</figure>

### Stack의 성질 분석

`Stack은` ^^제일 먼저 들어간 데이터가 나중에 나오는^^ 특징이 있다. 두 개의 `Stack`이 있으면, {==`첫 번째 Stack`에 저장된 데이터를 `두 번째 Stack`에 부어버리면==}, 자연스럽게 `첫 번째 Stack`에 최초로 쌓인 데이터가 `두 번째 Stack`에 아래와 같이 제일 위에 존재하게 된다. 

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue4.png){ width="600" }
  <figcaption>그림 4 - 두 개의 Stack</figcaption>
</figure>

또한, `두 번째 Stack`의 있는 데이터를 pop 하거나 출력하게 되면, 아래와 같이 먼저 들어간 데이터가 먼저 처리되는 결과가 나오게 된다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue5.png){ width="600" }
  <figcaption>그림 5 - 두 번째 Stack Pop</figcaption>
</figure>

단, {==부어버리는 행동은==} `두 번째 Stack`에 데이터가 비어있을 경우에만 허용되어야 하며, Stack이 비어있지 않으면 {==먼저 들어온 데이터가 가장 먼저 처리되지 않는다는 점을 기억해야 한다.==}

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-18/queue6.png){ width="600" }
  <figcaption>그림 6 - 두번째 Stack이 비어있지 않을 경우</figcaption>
</figure>

## 코드 구현

위의 아이디어를 조합하여 코드를 작성하면, 아래와 같은 코드가 나오며 이로서 {==두 개의 Stack을 활용하여 Queue==}를 구현하였다.

`8 줄`과 `13 줄`에서 `두 번째 Stack`이 비어있는지 확인하는 것에 주목하자.

``` python title="queueUsingTwoStacks.py" linenums="1" hl_lines="8 13"
    stack_insert = []  # 첫 번째 stack
    stack_delete = []  # 두 번째 stack
    for operation in operations:
        if operation[0] == '1':  # Enqueue element x into the end of queue
            operand = operation.split(' ')[1]
            stack_insert.append(operand)
        elif operation[0] == '2':  # Dequeue element at the front of the queue
            if len(stack_delete) == 0:  # 두 번째 Stack이 비어있을 경우에만 데이터를 붓는다.
                while len(stack_insert) > 0:
                    stack_delete.append(stack_insert.pop())
            stack_delete.pop()
        elif operation[0] == '3': # print the element at the front of the queue
            if len(stack_delete) == 0:  # 두 번째 Stack이 비어있을 경우에만 데이터를 붓는다.
                while len(stack_insert) > 0:
                    stack_delete.append(stack_insert.pop())
            print(stack_delete[-1])
```