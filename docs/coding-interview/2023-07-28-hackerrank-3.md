---
title: "HackerRank - Delete a Node"
description: "Delete a Node 문제 리뷰"
time: 2023-07-28 22:20:36
comments: true
tags:
  - hackerrank
  - problem solving
  - data structures
  - Linked List
---

!!! info "문제 링크"
    - [Delete a Node](https://www.hackerrank.com/challenges/delete-a-node-from-a-linked-list/problem)

## 🔍 문제 분석

`Linked List`의 Head 포인터와 삭제 할 index 번호[^1]를 주어지면, 해당 Node를 삭제하는 메소드를 구현하는 문제이다.
[^1]: index 번호는 0부터 시작한다.

### 🗑️ Linked List의 Node를 삭제하는 방법

Linked List의 Node를 제거하는 방법은 삭제할 Node의 연결을 끊어 버리는 것이다. 

즉, {==삭제할 Node를 가리키는 앞 Node==}와 {==삭제할 Node가 가리키는 Node==}를 아래의 그림처럼 연결하여 삭제한다.

<figure markdown>
![Image title](/fromitive-blog/assets/2023-07-28/2023-07-28-link1.png){ width="600"}
<figcaption>그림 1 - Node 삭제 방법</figcaption>
</figure>


### 🤔 특수한 경우는 없을까?

위의 방법대로 전부 삭제할 수 있으면 좋겠지만, 딱 하나 특수한 경우가 있다. 바로 {==idx 가 0일때==} 위의 방법대로 해결되지 않는다.

즉, {==**idx 가 0일때는 head를 head가 가리키는 다음 Node로 덮어쓰기**==}만 해주면 된다.

## 💡 문제 풀이
``` python title="deleteNode.py" linenums="1" hl_lines="8 9 10"
def deleteNode(llist, position):
    before_pointer = llist
    idx = 0
    
    if idx == position:
        llist = llist.next
    else:
        while idx != position - 1:
            before_pointer = before_pointer.next
            idx += 1
        # delete node
        pointer = before_pointer.next
        pointer_next = pointer.next
        before_pointer.next = pointer_next

    return llist
```

위의 하이라이트 된 코드를 주목하면, 제거 할 Node에서 idx를 멈추는게 아닌, {==**이전 Node정보가 제거할 Node에 없기 때문에**==} 제거할 Node 전 Node까지 idx를 이동하는 것을 주목하자.
