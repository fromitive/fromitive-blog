---
title: "commit convention"
description: "Git으로 협업 하거나 코드 품질을 유지하기 위한 우리들의 룰"
time: 2023-10-16 15:22:35
comments: true
tags:
  - git
  - soft-skill
---

## 🤝 커밋 컨벤션 이란?

Git과 같은 소스코드 형상관리 툴로 여러 사람이 협업하는 환경에서, {==**코드의 수정이 어떻게 이루어 졌는지 기계와 사람이 쉽게 파악하기 위해 정한 규칙**==}[^1]으로 이라고 생각하면 됩니다.

[^1]: https://www.conventionalcommits.org/ko/v1.0.0/

## 🤔 커밋 컨밴션을 사용해야 하는 이유

`commit history`를 보고서 해당 코드가 어떻게 발전해왔는지 쉽게 확인할 수 있습니다.

commit message가 관리가 되지 않으면 프로젝트가 어떤 방향으로 가고 있는지 확인하기 쉽지 않습니다. 
<figure markdown>
![Image title](/fromitive-blog/assets/2023-10-16/wrong-commit.png){ width="1000"}
<figcaption>그림 1 - 관리가 되지 않은 commit history</figcaption>
</figure>


## 🧱 커밋 컨밴션의 구조

커밋 컨밴션의 구조는 아래와 같이 나타날 수 있습니다.

```
<Type>[scope(optional)]: <Subject>

[Body(Optional)]

[Footer(Optional)]
```


### Type

`Type`은 아래와 같은 것이 나올 수 있습니다. {==**이 부분은 명확하게 정해저 있는 것이 아니어서, 협업하는 공간마다 다를 수 있습니다.**==} 아래의 `Type`은 Angular 프로젝트의 commit convention[^2] 문서를 참고하였습니다.

[^2]: https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit

| 종류     | 설명                                                                 |
| -------- | -------------------------------------------------------------------- |
| fix      | 버그 수정이 있을 경우                                                |
| feat     | 새로운 기능 추가                                                     |
| build    | 빌드 환경이 변경 될 때                                               |
| ci       | CI 설정이 변경될 때                                                  |
| docs     | 소스코드가 아닌 문서가 수정될 때                                     |
| style    | 코드의 기능의 변화는 없고, 코드를 깔끔하게 작성하기 위해 수정한 경우 |
| refactor | 코드의 기능과 버그 수정과는 관련 없이 리팩토링의 작업                |
| test     | 테스트 코드나 테스트 케이스를 추가하는 경우                          |

### Subject

Type에 대한 설명이 나타납니다. 지켜야 할 규칙은 아래와 같습니다.

```
1. 명령어조로 작성할 것 - change(O) changed(X) changes(X), 한국어 - 코드 수정, 코드 추가 등등
2. 첫 글자를 대문자로 작성하지 말 것
3. 마지막에 점(.)으로 끝나지 않을 것
```

### Scope

변경되는 범위를 나타냅니다. 변경 된 부분이 여러개일 경우, 범위를 명확하게 표기하기 위해 사용됩니다.

### Body

Subject로만 설명할 수 없을 경우, 상세하게 설명할 때 사용됩니다. 

### Footer

프로그램에 이슈가 발생하여 revert를 할 경우나, 심각한 버그가 있을 경우 Github의 ISSUE 부분이나, revert할 해시값을 넣기 위해 사용합니다. 아래와 같은 예제가 나올 수 있습니다.

```
Closes #234, #245, #992
Closes #123
Reverts 676104e, a215868
```

## 🧩 사용 예제

이 파일을 업로드 하기 위한 commit을 작성하는 예제를 쓰면 아래와 같습니다.

```
docs(cs): 2023-10-16-softskill 문서 추가

commit convention에 대해 작성

```

문서에 대한 내용이므로 `type`을 `docs`로 작성하였습니다. 블로그 내 `cs`와 관련된 내용이라 `scope`를 cs로 넣었습니다.

`body`에 작성한 내용에 대해 요약하였습니다.

`footer`에는 별도의 요청사항이나, 코맨트가 없기 때문에 작성하지 않았습니다.

## 🏁 결론

커밋 컨밴션은 필수가 아니지만, 협업을 할 때, 자신의 코드를 다른 사람들에게 설명해 줄 때, 코드를 깔끔하게 유지하고 싶을 때 필요하기에 적용하기를 권장합니다.

{==**잘 정리된 글은 기억을 더 쉽고 오랫동안 할 수 있게**==} 도와준다고 생각합니다.


## 📚 참고 자료

conventional commits - [https://www.conventionalcommits.org/ko/v1.0.0/](https://www.conventionalcommits.org/ko/v1.0.0/)

Angular commit convention - [https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

Vue js commit convention - [https://github.com/vuejs/core/blob/main/.github/commit-convention.md](https://github.com/vuejs/core/blob/main/.github/commit-convention.md)
