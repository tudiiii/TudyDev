
## [42840. 모의고사](https://programmers.co.kr/learn/courses/30/lessons/42840)

**Problem :**

수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한 사항

- 시험은 최대 10,000 문제로 구성되어있습니다.
- 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

**Example 1:**

```
Input: [1,2,3,4,5]
Output: [1]
```

**Example 2:**

```
Input: [1,3,2,4,2]
Output: [1,2,3]
```

**Source Code 1:**

```java
/* 모의고사

테스트 1 〉	통과 (0.07ms, 53.1MB)
테스트 2 〉	통과 (0.06ms, 51.9MB)
테스트 3 〉	통과 (0.05ms, 52MB)
테스트 4 〉	통과 (0.05ms, 52.4MB)
테스트 5 〉	통과 (0.06ms, 53MB)
테스트 6 〉	통과 (0.07ms, 52.4MB)
테스트 7 〉	통과 (0.43ms, 52.9MB)
테스트 8 〉	통과 (0.25ms, 52.3MB)
테스트 9 〉	통과 (0.98ms, 53.4MB)
테스트 10 〉통과 (0.47ms, 52.4MB)
테스트 11 〉통과 (0.95ms, 53.1MB)
테스트 12 〉통과 (0.90ms, 53.5MB)
테스트 13 〉통과 (0.11ms, 53.9MB)
테스트 14 〉통과 (1.07ms, 53.6MB)
 */

import java.util.ArrayList;
import java.util.List;

public class programmers_42840 {
    public int[] solution(int[] answers) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {2, 1, 2, 3, 2, 4, 2, 5};
        int[] c =  {3, 3, 1, 1, 2, 2, 4, 4, 5, 5};

        int[] score = {0,0,0};

        for(int i=0; i<answers.length; i++) {
            if(answers[i] == a[i%a.length]) {score[0]++;}
            if(answers[i] == b[i%b.length]) {score[1]++;}
            if(answers[i] == c[i%c.length]) {score[2]++;}
        }

        int maxScore = Math.max(score[0],Math.max(score[1],score[2]));

        List<Integer> list = new ArrayList<>();
        if(maxScore==score[0]) {list.add(1);}
        if(maxScore==score[1]) {list.add(2);}
        if(maxScore==score[2]) {list.add(3);}

        int[] answer = new int[list.size()];

        for(int i=0;i<answer.length;i++){
            answer[i] = list.get(i);
        }
        return answer;
    }
}

```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class programmers_42840Test {

    programmers_42840 s = new programmers_42840();

    @Test
    public void test(){
        Assert.assertEquals(s.solution(new int[]{1,3,2,4,2}), new int[]{1,2,3});
        Assert.assertEquals(s.solution(new int[]{1,2,3,4,5}), new int[]{1});
    }

}
```

**Experience 1:**

약간 노가다(?)느낌이 나는 문제랄까?

이 문제의 포인트는 `Math.max()` 메소드로 문제를 가장 많이 맞춘 수포자를 찾고, `ArrayList`로 수포자의 순서를 오름차순으로 정렬하는 것이라고 생각한다.