---
title: "좋은 네이밍이란 무엇인가?"
description: "이름에 최대한 많은 정보를 주자"
time: 2024-01-01 20:19:27
tags:
  - software-engineering
---

<figure markdown>
![Image title](/fromitive-blog/assets/2024-01-02/title.png){ width="500"}
<figcaption>책 표지</figcaption>
</figure>

!!! abstract "요약"
    * 기능에 맞춰 추상적이고 무의미한 단어가 아닌 구체적인 단어를 선별하자
        - getPages : downloadPages // 인터넷에서 페이지를 가져오는 경우
    
    * 반복문에선 변수명과 관련된 인덱스를 사용하면 혼란스럽지 않다
        - clubs   : club_idx
        - members : member_idx
        - users   : user_idx
    
    * 부가 정보를 이름에 추가하자
        - clientRequest : untrustRequest // 보안 조치가 필요할 경우
    
    * 미학
        - 비언어적인 요소를 이용하여 코드를 읽기 쉽게 만드는 것도 중요하다
        - [플러그인](#_8)을 적용하여 코드를 가독성 좋게 정렬하자

## 책 추천

새해 첫 책으로 지하철에서 읽은 책은 [읽기 좋은 코드가 좋은 코드다](https://www.yes24.com/Product/Goods/6692314)이다.

읽으면서 아이디어를 쌓을 수 있어 좋았고, 가독성 있는 코드와 그렇지 않는 코드를 비교하면서 설명하게되어 설득력 있었고 잘 읽혔다.

책의 분량도 짧아서 가지고 다니기도 편하고 소소하게 읽기에 좋은 책이었다.

### 좋은 네이밍

코드에는 처음 접하는 프로그래머가 알기 쉽게 하나의 함수 및 변수 명을 만들어도 많은 정보가 들어갈 수 있게 해야 가독성 있는 코드를 짤 수 있다. 즉, **이름에 정보를 담아내야 한다.** 

### 무의미한 단어 피하기

우리는 코드를 짤 때 값을 가져온다라는 의미의 `get`을 사용하곤 한다. 의미 자체는 가져온다라는 뜻만 있고 아무런 정보가 없는데, 이러한 네이밍이 나쁘다는 의미가 아니라, **함수를 구현(implement)해야 하는 상황에서는 최대한 구체적인 의미를 작성하자.**

예로 들어서 `getPages(url)`라는 네이밍을 지어놓고 구현하는 내용에 **인터넷에서 가져오는 자료라면 get 보다는 Featch, Download Page와 같이 상세내용을 담는 이름이 적절하다고 한다.**

```c title="구현에 관한 단어를 사용하자"
getPages(url) --> downloadPages(url) or fetchPages(url)
```

다른 예로는 `BinaryTree`를 구현한 내용에 size() 함수를 제공한다고 하자. 이는 무슨 의미인가? 트리의 size(크기)는 높이가 될 수도 있고 node의 갯수가 될 수도 있고, 메모리 사용량 등 자원에 관련된 내용일 수 도 있다.

```c title="추상적인 단어가 아닌 구체화된 단어를 사용하자"
BinaryTree의 메소드
size() ->  height()       // 트리의 높이
       ->  numNodes()     // 노드의 개수
       ->  memoryBytes()  // 사용하는 자원의 양
```
결론적으로 함수가 구현 되는 경우, 구현되는 내용과 맞게 함수의 이름도 구체화 하는 것이 좋은 코드라고 설명한다.

### 반복문에서는 변수명과 관련된 인덱스 사용

아래처럼 반복문이 중첩될 경우 코드의 가독성이 떨어지고, 코드를 작성하는 사람도 실수할 수 있는 코드를 작성하기가 쉽다.

```cpp title="해석하기 어려운 반복문"
for(int i = 0 ; i < clubs.size(); i++)
    for(int j = 0; j < clubs[i].members.size(); j++)
        for(int k = 0; k < users.size(); k++)
            if(clubs[i].members[k] == users[j])
                cout << "user [" << j << "] is in club " << i << "]" << endl;
```

눈치챘는가? `members[]`와 `users[]`가 서로 다른 인덱스를 사용하고 있다.

이처럼 반복문 대상과 관련이 없는 인덱스를 사용할 경우 읽기도 어렵고 버그가 생기기 쉬운 코드를 작성할 수 있다.

따라서, **반복문 변수명과 관련이 있도록 club_i, member_i, user_i 같은 변수명을 사용한다면** 비록 3중일지라도, 쉽게 버그를 찾을 수 있다. 

```cpp title="해석하기 어려운 반복문" hl_lines="4"
for(int club_i = 0 ; club_i < clubs.size(); club_i++)
    for(int member_i = 0; member_i < clubs[club_i].members.size(); member_i++)
        for(int user_i = 0; user_i < users.size(); user_i++)
            if(clubs[club_i].members[user_i] == users[member_i]) // 인덱스 잘못 사용!
                cout << "user [" << member_i << "] is in club " << club_i << "]" << endl;
```

### 부가 정보를 이름에 추가하기

필자가 읽은 내용 중에서 제일 인상 깊었던 구절이다. 바로 보안과 관련되어 있는데, 웹 프로그램을 할 때, 클라이언트의 요청 값은 정상적인 요청인지 구분할 수 없다.

개발을 하다보면 이와 같은 사실을 간과할 수 있고, 만일 웹 취약점이 발생하였을 때, 어떤 파일을 봐야 하는지 두 번 검토해야하는 상황이 벌어질 수도 있다.

아래와 예는 기사를 클라이언트로 부터 게시하는 요청이며, 해당 입력 값은 외부에서 들어온 값이기 때문에 신뢰할 수 없다.

또한, `request` **매개 변수에는 신뢰할 수 없다는 추가 정보가 없기 때문에** 보안조치를 하지 않는 위험이 존재하게 된다.

``` java title="ArticleController.java" hl_lines="3"
@PostMapping
// request 값은 불특정 다수인 클라이언트에서 받은 자료이지만, 개발자에게 어떠한 경고도 없다.
public ResponseEntity<Article> createArticle(@RequestBody CraeteArticleDTO request) {
    Article savedArticle = articleService.save(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
}
```

따라서, 다른 협업하는 동료들이 이 사실을 인지시켜주기 위해 접두어를 붙여주면 아래와 같이 보안조치가 필요한 내용을 작성할 수 있다.

``` java title="ArticleController.java" hl_lines="3"
@PostMapping
// TODO: request에 대한 보안조치 필요!!
public ResponseEntity<Article> createArticle(@RequestBody CraeteArticleDTO untrustRequest) {
    // 신뢰하지 않은 데이터가 그대로 저장되고 있음
    Article savedArticle = articleService.save(untrustRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
}
```

### 경계값에 관한 규칙

경계값을 나타내기 위해 매개변수를 작성할 때는 경계값이 포함되거나, 그렇지 않거나를 알리기 위해 네이밍을 붙이면 좀 더 이해하기 쉬운 코드가 된다. 

예로 들어, slice() 함수가 있다고한다.

만약 경계를 포함하도록 구현한다고 하면 slice(first = ..., last = ...)와 같이 `first`, `last`를 작성해주는 것이 좋고

마지막 경계가 포함되지 않도록 작성한다면 slice(begin = ..., end = ...)와 같이 `begin`, `end` 로 구분해주는 것이 좋다고 한다.

### 미학

똑같은 내용의 코드더라도, 마지막 디테일은 `미학`이라고 한다. 일관성 있는 레이아웃을 사용하고, 아래와 같이 줄 길이를 맞추기 위해 `TcpConnectionSimulator` 위치가 들쑥 날쑥이면 사람이 보기에 이해하기 어렵다.

```java title="미학적인 코드(Before).java"
public class PerformanceTester{
    public static final TcpConnectionsSimulator wifi = new TcpConnectionSimulator(
      500, // Kbps
      80, // millisecs
      200, // 흔들림
      1); // 패킷 손실

    public static final TcpConnectionsSimulator t3_fiber = 
        new TcpConnectionSimulator(
          45000, // Kbps
          10, // millisecs
          0, // 흔들림
          0); // 패킷 손실
}
```

코드 컨밴션을 준수한다고 좀 더 가독성있는 코드를 만들어 낼 수 있는게 아니다.

**내용이 같더라도, 사람이 이해하기 쉽도록 정리해야 읽기 좋은 코드임을 알게 되었다.**

아래는 가독성을 높이기 위해 주석의 들여쓰기 위치와 일관성 있게 개행을 처리한 결과이다.

```java title="미학적인 코드(After).java"
public class PerformanceTester{
    public static final TcpConnectionsSimulator wifi =
        new TcpConnectionSimulator(
            500,   // Kbps
            80 ,   // millisecs
            200,   // 흔들림
            1  );  // 패킷 손실

    public static final TcpConnectionsSimulator t3_fiber = 
        new TcpConnectionSimulator(
            45000,   // Kbps
            10   ,   // millisecs
            0    ,   // 흔들림
            0    );  // 패킷 손실
}
```

코드가 좀 더 보기 편해졌다. 그러나 주석이 반복되어 있고 줄 수가 길어 읽기가 아직도 불편해 보인다. 이를 좀 더 개선해보자.

아래의 코드는 각 파라미터에 대한 설명을 맨 위에 주석으로 통일 시키고, 코드의 라인을 좀 더 줄여 가독성을 챙겼다.

```java title="미학적인 코드(After)2.java"
public class PerformanceTester{
    // TcpConnectionSimulator     (처리량, 지연속도, 흔들림, 패킷_손실)
    //                            [Kbps], [ms],   [ms], [percent]

    public static final TcpConnectionsSimulator wifi = 
        new TcpConnectionSimulator(500, 80 , 200 ,1  );

    public static final TcpConnectionsSimulator t3_fiber = 
        new TcpConnectionSimulator(45000,  10   , 0    , 0    );
}
```

IDE에서 지원하는 formatter를 적용 하다보면 일부러 나뉜 공백들이 formatter에 의해 변경될 수도 있겠다.

space align 같은 경우 많은 IDE에서 플러그인 형태로 제공한다.

``` title="align 플러그인"
IntelliJ IDE   : https://plugins.jetbrains.com/plugin/13903-smart-align
VSCode         : https://marketplace.visualstudio.com/items?itemName=matthewthorning.align-vertically
```

### 결론

[읽기 좋은 코드가 좋은 코드다](https://www.yes24.com/Product/Goods/6692314)는 블로그에서 소개한 내용 이외에 더욱 다양한 읽기 좋은 코드를 작성하기 위한 아이디어가 많이 있다.

필자가 생각하는 읽기 좋은 코드의 기준은 읽을 때 뇌를 많이 사용하지 않도록 작성하는 것이라고 생각한다.

소스 코드는 길며 익숙하지 않다면 코드의 의도를 파악하기 힘들다.

또한 코드 내에 부가 정보를 제공해주지 않는다면 1줄이라도 더욱 읽기가 힘들어진다.

이 책에서는 동료들과 협업할 때 혹은, 다른 사람이 내 코드를 좀 더 이해하기 편하게 하는 다양한 방법들을 읽기 쉽게 제공해 주어서 좋았다. 생각날 때마다 읽기 좋은 책이다.