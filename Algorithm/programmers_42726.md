
## [42726. 가장 큰 수](https://programmers.co.kr/learn/courses/30/lessons/42746)

**Problem :**

0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

- numbers의 길이는 1 이상 100,000 이하입니다.
- numbers의 원소는 0 이상 1,000 이하입니다.
- 정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

**Source Code 1:**

```java
import java.util.*;

public class BigNum {
    public String solution(int[] numbers) {
        String answer = "";
        List<String> strings = new ArrayList<>();

        for(int num : numbers){
            strings.add(String.valueOf(num));
        }

        strings.sort(((o1,o2)->(o2 + o1).compareTo(o1 + o2)));

        for(String s:strings){
            answer += s;
        }
        // 0인경우
        return answer.charAt(0) == '0' ? "0" : answer;
    }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class BigNumTest {

    @Test
    public void case1(){

        BigNum s = new BigNum();

        int[] numbers = {6,10,2};
        String result = "6210";

        Assert.assertEquals(s.solution(numbers),result);
    }

    @Test
    public void case2(){

        BigNum s = new BigNum();

        int[] numbers = {3,30,34,5,9};
        String result = "9534330";

        Assert.assertEquals(s.solution(numbers),result);
    }

    @Test
    public void case3_0일때(){

        BigNum s = new BigNum();

        int[] numbers = {0,0,0};
        String result = "0";

        Assert.assertEquals(s.solution(numbers),result);
    }
}
```

**Experience 1:**

람다식을 이용하여 sort 하니까 답이 나와서 아자뵤했는데, 마지막 단계에서 통과하지 못하였다… 이유를 찾아보니까 0,0,0 일때의 케이스는 통과하지 못한다고 ^^;; 예외를 생각하면서 처리하는 능력이 아직은 많이 부족한 것 같다. 마지막에 0일때 0을 출력하는게 이 문제의 point가 아닐까 ㅎㅡㅎ