---
title: "HackerRank - Maximum Element"
description: HackerRank Maximum Element 문제 리뷰
date: 2023-07-17 17:10:00
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
  - Stack
---

# 개요

!!! note
    * 문제 링크 - [Maximum Element](https://www.hackerrank.com/challenges/maximum-element/problem?isFullScreen=true) 

Stack 자료형을 얼마나 활용할 수 있는지에 대한 문제이다.

Stack 자료형은 LIFO(Last-in-First-Out) 자료구조로서 대표적으로 함수의 서브루틴을 구현하는데 사용한다. 

예로 들어, {==일을 하다가 갑자기 중요한 메일이 오면 그 작업을 우선적으로 할 때, 기존의 일의 내용을 저장하는 방식==}이다.

이번 문제는 Stack에 값을 넣고 순간마다 Stack에 들어있는 최대 값을 추출하는 문제이며, 배울 점이 많았다. 


<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-17/stack1.jpg ){ width="600" }
  <figcaption>그림 1 - 스택의 예제(쌓여있는 일, 공부)</figcaption>
</figure>

## 문제 개요

아래의 연산을 지원하는 컴퓨터가 있다고 한다. 각 번호는 연산 번호인데, 번호마다 다음과 같은 동작을 수행한다.

``` title="연산자 종류"
type 1 - 스택에 뒤에 따라오는 정수를 저장한다.
type 2 - 스택의 가장 윗부분을 pop 한다
type 3 - 현재 stack의 최대 값을 가져온다.
```

연산 리스트를 아래와 같이 주어졌을 때, print 할 stack의 최대 값 리스트를 반환하는 코드를 작성해야 한다.


> `입력 값` = ['1 39', '2', '1 25', '3', '1 19', '1 96', '3']

> 문제 = getMax(`입력 값`)을 만들어 `결과 값` 출력

> `결과 값` = [25, 96]


## 문제 분석

### 연산자 구현

#### type 1 과 type 2를 구현

`type 1`연산자는 뒤에 피연산자가 나오고, 연산자 피연산자 구분을 ' '(공백)으로 해준다.

따라서 `type 1` 연산의 피연산자를 추출하는 방법은 아래와 같다.

```python title="type 1의 피연산자 추출"
operand = int(operation.split(" ")[1])
```

`type 1`은 꺼낸 피연산자를 stack의 제일 위에 저장(push)해야 한다.

`type 2`연산자는 제일 마지막에 넣은 데이터를 꺼내는(pop)것을 구현해야 한다.

`type 1`과 `type 2`는 어떻게 구현해야 할까?

---

파이썬에선 push를 `.append()`메소드로, pop은 `.pop()`메소드로 구현할 수 있다.

아래는 push, pop을 수행하기 위해 append() 와 pop을 사용하는 모습이다.

``` title="push, pop 구현"
>>> stack = []
# 1,2,3,4를 순서대로 push
>>> stack.append(1)
>>> stack.append(2)
>>> stack.append(3)
>>> stack.append(4)

# pop을 할 때, 제일 마지막에 저장한 데이터 '4'가 나오는 것을 확인
>>> stack.pop()
4
>>> stack.pop()
3
>>> stack.pop()
2
>>> stack.pop()
1
```

push와 pop이 실제 python과 동작하는 부분에서 차이가 좀 있다. 데이터를 앞에서 집어넣지 않고, 꺼낼때도 뒤에서 꺼낸다. 

처음엔 익숙하지 않았는데, 제일 마지막 index를 stack의 가장 윗부분(top)이라고 생각하면 편하다.

따라서 stack의 가장 윗부분을 조회하려면 아래와 같이 코드를 작성한다.

```python title="stack의 윗부분 출력"
print(stack[-1])
```

#### type 3 구현

문제는 `type 3`이다. stack의 최대 값은 단순히 아래와 같이 연산자를 호출할 때마다 `max()`함수를 이용하면 편리하다.

```python title="type3 구현"
operator == '3':
    answer.append(max(stack))  # max 함수로 매 stack의 최대 값 저장하기
```

## 코드 작성 (실패)
이제 모든 재료가 준비되었으니 아래와 같이 구현하였다.

!!! warning "주의사항"
    해당 코드는 문제의 대한 정답이 아니니 참고 부탁드립니다. 🙏

```python title="first-try.py" linenums="1"
def getMax(operations):
    stack = []
    answer = []
    for operator in operations:
        if operator[0] == '1':  # push element
            operand = int(operator.split(' ')[1])
            stack.append(operand)
        elif operator[0] == '2':  # delete the element at the top of the stack
            stack.pop()
        elif operator[0] == '3':  # print maximum element
            answer.append(max(stack))
        else:  # never reached if type num less then 4 
            return []
    return answer

```
결과는 `시간초과`가 나타났다. 왜일까?

### 원인 분석

`first-try.py` 코드를 보았을때, 시간 복잡도는 `O(len(operations)*len(stack))`이다 max 함수가 stack안에 있는 모든 데이터를 검사하기 때문이다.

따라서 max 부분을 최소화 하기 위한 방법이 필요하다.

## 문제 분석 2

max 검색을 최소화 할 수 있을까? 결국엔 [Discussions](https://www.hackerrank.com/challenges/maximum-element/forum)를 보았는데, 데이터를 넣을 때마다, {==최대 값을 추적하는 stack을 별도로 만든다==}

### 최대 값을 추적하는 Stack 구현

최대 값이 달라지는 상황이 언제고, 변함이 없는 상황은 언제일까?, 별도의 stack을 둔다는 걸 미처 생각하지 못해서 공부가 되었다. 

### 최대 값이 달라지는 상황

`최대 값 stack`을 별도로 만들고 `type 1` 연산자가 올 때마다, `최대 값 stack`의 가장 top 부분의 결과와 비교하는 것이다. 

`최대 값 stack` 보다 크면 새로운 최대 값을 push 한다.

`type 2` 연산자가 올 경우, `최대 값 stack`과 stack의 top이 동일하면, 제거한다.

`type 3` 연산자가 올 경우, `최대 값 stack`의 top을 저장하면 된다. 

`최대 값 stack`안에 저장되어 있는 나머지 값은 신경써야 할까? 답은 신경 안써도 된다. 왜냐하면 `type 3`연산자가 나왔을 때 stack의 최대 값은 `최대 값 stack`의 top이기 때문이다.

## 코드 작성 2

위의 요구사항을 반영하여 작성한 코드는 아래와 같다. 최대 값을 operation 할 때마다 비교하기 때문에 O(len(operations))로 줄어들었다.

``` python title="second-try.py"
def getMax(operations):
    stack = []
    max_stack = []
    answer = []
    for operator in operations:
        if operator[0] == '1':  # push element
            operand = int(operator.split(' ')[1])
            if len(max_stack) == 0: # 최초로 stack에 값을 넣을 때
                max_stack.append(operand)
            elif max_stack[-1] <= operand: # 중복으로 최대 값이 들어갈 경우를 고려하여 <=를 넣었다.
                max_stack.append(operand)
            stack.append(operand)
        elif operator[0] == '2':  # delete the element at the top of the stack
            if max_stack[-1] == stack[-1]:
                max_stack.pop()
            stack.pop()
        elif operator[0] == '3':  # print maximum element
            answer.append(max_stack[-1])
        else:  # never reached if type num less then 4 
            return []
    return answer
```
