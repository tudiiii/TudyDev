
## [00002. strange_counter](https://www.hackerrank.com/challenges/strange-code/problem)

**Problem :**

Bob has a strange counter. At the first second, it displays the number 3. Each second, the number displayed by the counter decrements by 1 until it reaches 1.

The counter counts down in cycles. In next second, the timer resets to `2 x the initial number for the prior cycle` and continues counting down. The diagram below shows the counter values for each time  in the first three cycles:

> time 1 value 3, time 2 value 2, time 3 value 1

> time 4 value 6, time 5 value 5, time 6 value 4, time 7 value 3, time 8 value 2, time 9 value 1 ...

Find and print the value displayed by the counter at time .

Function Description

Complete the strangeCounter function in the editor below. It should return the integer value displayed by the counter at time .

strangeCounter has the following parameter(s):

제한 사항 - 링크 참고

> INPUT 4 OUTPUT 6

**Source Code 1:**

```java
public class StrangeCounter {
    static long strangeCounter(long t) {

        long time = 3;
        long num = 6;

        // value가 1이 될 때 포함되는 사이클 주기 구하기 ( 만약 time이 15일 때, 그 사이클의 value가 1인 time은 21 )
        while(t>time){ // time 3 -> 9 -> 21 -> 45
            time += num;
            num *= 2;
        }

        // value가 1인 값을 구한 후 t+1만큼빼면 t의 value 값을 구 할 수 있음
        // 21 - 15 + 1 = 7
        return time-t+1;
    }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class StrangeCounterTest {

    StrangeCounter s  = new StrangeCounter();

    @Test
    public void test(){
        Assert.assertEquals(s.strangeCounter(4),6);
        Assert.assertEquals(s.strangeCounter(22),24);
        Assert.assertEquals(s.strangeCounter(10),12);
    }

}
```

**Experience 1:**

`20200914` HashMap을 이용해 key,value값을 넣어주고 key값이 t일 때의 value값을 리턴해주면 된다고 생각했는데 해커랭크 홈페이지 테스트 케이스에 `time limit excceed` 에러가 발생했다. 

`20200915` strange counter에 반복에 중점을 두고 코딩을 했다. value값이 1이 될 때의 time값을 구하고 t값을 빼주고 1을 더해주면 원하는 값이 찾아진다. 더 쉽게 예를 들어서 설명하자면 아래를 참고하자!

이상한 카운터의 각 사이클의 수는 3 -> 6 -> 12 로 6의 배수대로 증가를 한다. 첫 번째 사이클은 time이 1 ~ 3일 때 value는 1 ~ 3, 두 번째 사이클은 time이 4 ~ 9일 때 value 1 ~ 6, 세 번째 사이클은 time이 10 ~ 21일 때 value는 1 ~ 12이다. 이 사이클에서 규칙을 찾으면 문제를 쉽게 풀 수 있다.

위에서 말한 것처럼 time이 3, 9, 21일때 value가 1이 되고 time이 작아질 수록 value가 커지는 걸 생각해서 코드를 짜면 된다.

만약 t가 15면 세 번째 사이클에 포함된다는 것을 찾고 value값이 1인 time 21에서 t값을 빼고 +1을 해주면 찾는 값이 나온다.