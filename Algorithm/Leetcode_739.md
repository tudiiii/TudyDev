## [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

**Problem :**

Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].

**Source Code 1:**

```java
import java.util.Stack;
    /*
    Runtime: 13 ms
    Memory Usage: 47.6 MB
     */
    public int[] dailyTemperatures3(int[] T) {
        Stack<Integer> stack = new Stack<>();
        int[] answer = new int[T.length];
        for(int i = 0; i < T.length; i++) {
            while(!stack.isEmpty() && T[i] > T[stack.peek()]) {
                int idx = stack.pop();
                answer[idx] = i - idx;
            }
            stack.push(i);
        }
        return answer;
    }
```

**Source Code 2:**

```java
import java.util.HashMap;
import java.util.Map;

/*
    Runtime: 1081 ms
    Memory Usage: 47.6 MB
     */
    public int[] dailyTemperatures2(int[] T) {
        int[] answer = new int[T.length];

        int count = 0;
        for(int i=0;i<T.length;i++){
            for(int j=1;j<T.length;j++){
                count ++;
                if(T[i]<T[j]){
                    answer[i] = count;
                    break;
                }
            }
            count = 0;
        }
        return answer;
    }
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class Leetcode_739Test {

    Leetcode_739 s = new Leetcode_739();

    @Test
    public void test(){
        Assert.assertEquals(s.dailyTemperatures(new int[]{73, 74, 75, 71, 69, 72, 76, 73}), new int[]{1, 1, 4, 2, 1, 1, 0, 0});
    }

}
```
**Experience 1:**

프로그래머스 주식가격문제랑 비슷한 문제이다. 그 문제도 시간이 오래걸렸던걸로 기억나는데 그 문제와 같이 전부다 비교하는 형식의 이중포문을 사용하면 엄청난 런타임이 나온다.

처음 온도를 시작으로 스택에 인덱스 0값을 저장하고, 다음 인덱스로 가면서 처음 온도보다 더 작은 온도가 있으면 스택에 저장되어있는 인덱스값(기준)과 기존 온도보다 작은값의 인덱스를 빼준다. 위와 같은 방법을 반복하면 원하는 answer값이 나온다.