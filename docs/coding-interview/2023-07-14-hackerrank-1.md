---
title: "HackerRank - Single Linked List Series"
description: HackerRank Single Linked List 문제 모음 리뷰
date: 2023-07-14 12:20:00
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
  - Linked Lists
---

# 개요

!!! note "Sigle Linked List 문제 모음"
    * 1. 데이터를 뒤에 추가하는 방법 - [Print the Elements of a Linked List](https://www.hackerrank.com/challenges/print-the-elements-of-a-linked-list/problem?isFullScreen=true)
    * 2. 데이터를 앞에 추가하는 방법 - [Insert a node at the head of a linked list](https://www.hackerrank.com/challenges/insert-a-node-at-the-head-of-a-linked-list/problem?isFullScreen=true)
    * 3. 데이터를 특정 index에 추가하는 방법 - [Insert a node at a specific position in a linked list](https://www.hackerrank.com/challenges/insert-a-node-at-a-specific-position-in-a-linked-list/problem?isFullScreen=true)

sigle linked list 문제들을 풀면서 sigle linked list에 익숙해지도록 연습하였다.


## single linked list 개요

single linked list는 선형 구조[^1]로 되어 있으며, Node[^2] 라는 데이터의 모음으로 이루어져 있다.

single linked list는 Node가 {== 저장 할 데이터와 다음 데이터를 가리키는 pointer==}로 구성되어 있다.

`linked` 라는 용어가 사용하는데 이는 node끼리 `연결` 되어 있다고 생각하면 된다.

`single` 이라는 용어는 node를 검색할 때 `단방향`으로 연결되어 있다고 보면 된다 한쪽 방향으로만 검색할 수 있으며, 뒤로는 돌아갈 수 없다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-14/sllist1.png){ width="600" }
  <figcaption>그림 1 - single linked list</figcaption>
</figure>

[^1]: 방향이 일직선으로 검색 가능한 자료구조라고 보면 된다. 방향이 정해져 있어 상대적으로 탐색 하기 편하다.
[^2]: 각 실제 데이터라고 생각하면 된다. 예로 들어 list 변수에 = [1,2,3,4] 라고 있으면 1,2,3,4 각각을 node라고 보면 된다. 

## single linked list 구현

각 문제에서는 파이썬으로 single linked list가 이미 `SinglelyLinkedList`로 구현되어 있고, node도 마찬가지로 `SinglyLinkedListNode`로 구현되어 있다.

문제를 디버깅하기 위해 이를 개인 환경에서 똑같이 구현해보자.

### 요구사항

위의 3문제는 `SinglelyLinkedList`와 `SinglyLinkedListNode`를 아래의 요구사항대로 구현하면 충분히 디버깅이 가능하다.

``` title="요구사항"
1. SinglelyLinkedList는 single linked list 전체를 저장하는 class이다.
2. SinglelyLinkedList의 맴버는 첫 SinglyLinkedListNode의 포인터 값을 저장하는 head로 구성된다.
3. SinglelyLinkedList의 메소드는 insert_node로 SinglyLinkedListNode를 뒤쪽 방향으로 연결해주는 메소드이다.
4. SinglyLinkedListNode의 맴버는 data와 next로 구성되어 있고, next는 SinglyLinkedListNode 종류의 값을 저장한다.
```

### 코드 작성

코드는 아래와 같이 작성하였다. {==main에서는 위의 문제와 같이 받을 정수의 개수를 입력받은 후 순차적으로 정수를 입력하면, 데이터가 순차적으로 뒤로 추가가 된다==}.

``` python title="single_linked_list1.py" linenums="1"

class SinglelyLinkedListNode():
    def __init__(self,data):
        self.data = data
        self.next = None


class SinglelyLinkedList():
    def __init__(self):
        self.head = None
        
    def insert_node(self, llist_item: int):
        new_node = SinglelyLinkedListNode(llist_item)
        if self.head is None:
            self.head = new_node
        else:
            temp_pointer = self.head  # temp_pointer를 이욯하여 Linked_List 꼬리를 순차적으로 찾는다.
            while temp_pointer.next:
                temp_pointer = temp_pointer.next
                
            temp_pointer.next = new_node
            
            
if __name__ == '__main__':
    llist_count = int(input())

    llist = SinglelyLinkedList()

    for _ in range(llist_count):
        llist_item = int(input())
        llist.insert_node(llist_item)
        
```

요구사항 

- [X] SinglelyLinkedList는 single linked list 전체를 저장하는 class이다.
- [X] SinglelyLinkedList의 맴버는 첫 SinglyLinkedListNode의 포인터 값을 저장하는 head로 구성된다.
- [X] SinglelyLinkedList의 메소드는 insert_node로 SinglyLinkedListNode를 뒤쪽 방향으로 연결해주는 메소드이다.
- [X] SinglyLinkedListNode의 맴버는 data와 next로 구성되어 있고, next는 SinglyLinkedListNode 종류의 값을 저장한다.

이렇게 작성하면서 아래의 요구사항 전부를 만족하도록 구현하였다.




<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-13/2d-array2.png){ width="600" }
  <figcaption>그림 2 - glasshour의 이동 방식</figcaption>
</figure>

## 문제 풀이
### 1. 데이터를 뒤에 추가하는 방법
single linked list를 출력하는 코드이다.

이미 위에서 insert_node를 구현하였다면 마찬가지로 head부터 데이터가 있는지 확인하고, 데이터가 있으면 출력한 뒤, Node의 Next로 다음 데이터를 확인할 때까지 출력하면 된다.

``` python title="printLinkedList.py" linenums="1"
def printLinkedList(head):
    while head:
        print(head.data)
        head = head.next
```

### 2. 데이터를 앞에 추가하는 방법

위의 [요구사항](/fromitive-blog/coding-interview/2023-07-14-hackerrank-1/#_3)대로 구현한게 데이터를 뒤쪽으로 추가했다면, 이번엔 새로운 데이터를 앞에 추가하는 법을 물어보는 문제이다.

자료구조를 생각할 때 아래의 그림처럼 {==그림을 그려 순차적으로 어떻게 접근해야 하는지 시각화한다면==}, 바로 코드를 구현하는 것 보다 좀 더 편하다고 생각한다.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-14/sllist2.png){ width="600" }
  <figcaption>그림 2 - 데이터를 앞에 추가하는 방법</figcaption>
</figure>

`head`값을 새로운 Node로 변경하면 데이터를 앞으로 추가할 수 있다. 코드는 아래와 같다.

``` python title="insertNodeAtHead.py" linenums="1" hl_lines="19"
def insertNodeAtHead(llist, data):
    new_node = SinglyLinkedListNode(data)
    if llist is None:
        llist = new_node
    else:
        new_node.next = llist
        llist = new_node
    return llist

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    llist_count = int(input())

    llist = SinglyLinkedList()

    for _ in range(llist_count):
        llist_item = int(input())
        llist_head = insertNodeAtHead(llist.head, llist_item)
        llist.head = llist_head
    
    print_singly_linked_list(llist.head, '\n', fptr)
    fptr.write('\n')
    
    fptr.close()
```

문제 전체 풀이를 가져왔는데, `19줄`을 보면 llist.head를 넘기면서 시작하기에 llist를 head라고 생각하고 문제를 풀면 된다.

### 3. 데이터를 특정 index에 추가하는 방법

이제 문제다운 문제가 나온다, 특정 index에 새로운 node를 추가하는 방법으로. index는 0부터 시작한다고 한다.

아래의 그림처럼 index 3에 데이터를 넣는다고 하는 경우를 생각한 다음 문제를 풀어보자.

<figure markdown>
  ![Image title](/fromitive-blog/assets/2023-07-14/sllist3.png){ width="600" }
  <figcaption>그림 3 - 데이터를 특정 index에 추가하는 방법</figcaption>
</figure>

`그림 3`의 2번 step을 보면, {==2번 index의 next를 바로 새로운 Node에 덮어씌우지 않고, 새로운 Node가 2번 index의 next를 저장한 후 작업하는 점==}을 주목하자.

코드는 아래와 같다.

``` python title="isertNodeAtPosition.py" linenums="1"
def insertNodeAtPosition(llist, data, position):
    new_node = SinglyLinkedListNode(data)
    idx = 0
    temp_node = llist

    # target index까지가 아닌 before index까지 이동
    while temp_node and idx < position - 1:
        temp_node = temp_node.next
        idx += 1

    new_node.next = temp_node.next
    temp_node.next = new_node
    
    return llist
```

