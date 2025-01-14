---
title: "배열 탐색 전략 - two-pointer"
description: "Two Pointer를 활용하여 정렬된 배열을 효율적으로 탐색하기"
time: 2025-01-14 17:44:00
comments: true
tags:
  - two-pointer
  - array
---

## 사용 용도

**정렬되어 있는 배열을 탐색할 때** two-pointer를 사용할 수 있습니다. two-pointer는 두 개의 pointer 변수를 활용해 조건에 맞는 배열을 탐색하는 방법입니다. two-pointer는 하나의 배열에서 특정 조건을 만족하는 값을 찾거나 두 배열을 비교할 때 주로 사용됩니다.

two-pointer는 두 개의 포인터만 활용하므로 공간 복잡도 `O(1)`을 만족합니다. 데이터가 늘어나도 연산에 필요한 공간은 고정된 값을 보장합니다. 

## 사용 전략

two-pointer는 다양하게 사용할 수 있습니다.

### 처음과 끝 비교

!!! info
    문제 링크 : [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)

**오름차순** 으로 정렬된 정수 배열 `numbers`에서 두 숫자를 뽑아 `target`을 만들 수 있을 때 `[index1, index2]`를 구하는 문제입니다.

가장 쉬운 접근 방법은 `numbers` 배열의 원소 마다 비교해가며 `target`을 찾아야 합니다.

``` python title="two-sum-brute-force.py"
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        for i in range(len(numbers)):
            for j in range(i + 1, len(numbers)):
                if numbers[i] + numbers[j] == target:
                    return [i ,j]
        return [-1, -1]
```

하지만 위의 알고리즘의 시간 복잡도는 `O(n^2)`이므로 데이터 증가 대비 성능이 기하 급수적으로 느려지게 됩니다. 답은 찾을 수는 있지만 좀 더 효율적인 알고리즘을 생각해야 합니다.

---

Two Sum 문제는 정렬과 상관 없이 **Hashing** 전략을 이용해 풀이가 가능합니다. numbers를 순차적으로 탐색해가면서 어떤 숫자가 어떤 index에 있는지 기록하여 문제를 해결합니다.

``` python title="two-sum-hashing.py"
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        indexMapper = {}
        for i in range(len(numbers)):
            if target - numbers[i] in indexMapper:
                return [indexMapper[target - numbers[i]] + 1, i + 1]
            indexMapper[numbers[i]] = i
        return [-1, -1]
```

위의 알고리즘은 시간 복잡도 `O(n)`을 만족합니다. 그러나 `indexMapper`에 index를 더한다는 점에서 공간 복잡도 `O(n)`이 들게 됩니다. 그럼 이 공간을 어떻게 효율적으로 사용할 수 있을까요? **`numbers`가 정렬되어 있다는 점**에서 저희는 **two-pointer**를 고려할 수 있습니다.

---

`numbers`의 indexs는 오름차순이므로 왼쪽에서 오른쪽 방향으로 탐색할 수록 값이 증가하게 됩니다. target을 찾을 때는 맨 첫번째 index인 `left`와 맨 끝의 포인터인 `right`를 활용하여 `target`에 가까워지는 index를 효율적으로 탐색할 수 있습니다.

``` python title="two-sum-with-two-pointer.py" hl_lines="5-12"
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left = 0
        right = len(numbers) - 1 
        while left < right:
            currentNum = numbers[left] + numbers[right]
            if currentNum == target:
                return [left + 1, right + 1]
            if currentNum < target:
                left += 1
            elif currentNum > target:
                right -= 1
        return [-1, -1]
```

`while`문 안의 조건문을 주목합니다. `left`와 `right`의 이동조건이 명확할 때 two-pointer를 올바르게 사용할 수 있습니다. 

이전의 hashing전략과 다르게 numbers안의 데이터가 늘어나도 공간을 낭비하지 않습니다. 즉 two-pointer 전략은 공간복잡도 `O(1)`을 만족하며 사용할 수 있는 전략입니다.

### 서로 다른 두 배열 비교

!!! info
    문제 링크 : [Is Subsequence](https://leetcode.com/problems/is-subsequence)

서로다른 두 배열이나 문자열을 비교할 때에 two-pointer를 활용할 수 있습니다. 전체 문자열 `t`가 주어졌을 때 `s`가 `t`의 **SubSequence**인지 확인하는 문제입니다.

SubSequence란 쉽게 설명하자면 전체 집합에서 **순서와 원소가 같은 집합**을 의미합니다. 즉 `t`가 `abcde`일 때 `bcd`는 `t`에 포함되고 순서도 같으므로 SubSequence이지만, `ebd`는 `t`에 포함되지만 **순서는 다르기 때문에** SubSequence가 아닙니다. 따라서 `t`의 기준대로 `s`가 정렬되어있는지 확인해야 하므로 two-pointer 전략을 활용할 수 있습니다.

``` python title="is-subsequence.py"
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        sPointer = 0
        tPointer = 0
        while sPointer < len(s) and tPointer < len(t):
            if s[sPointer] == t[tPointer]:
                sPointer += 1
            tPointer += 1
        return sPointer == len(s)
```

이번엔 `left`와 `right`가 아닌 서로 다른 배열을 가리키는 두 포인터를 활용하여 two-pointer 전략을 사용해봤습니다. 이처럼 two-pointer 전략은 한 배열 뿐만 아니라 서로 다른 두 배열을 비교할 때도 사용됩니다.

