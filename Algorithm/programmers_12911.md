
## [12911. 다음 큰 숫자](https://programmers.co.kr/learn/courses/30/lessons/12911)

**Problem :**

자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.

조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.

자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.

제한 사항

- n은 1,000,000 이하의 자연수 입니다.

**Source Code 1:**

```java
public class programmers_12911 {
    public int solution(int n) {
        int answer = iCount(n);

        int count = 1;
        while(true){
            if(answer==iCount(n+count)){
                return n+count;
            }
            count++;
        }
    }

    public int iCount(int number){

        String binaryString = Integer.toBinaryString(number);

        int count = 0;
        int i = 0;

        while(i<binaryString.length()) {
            if('1' == binaryString.charAt(i)) {
                count++;
            }
            i++;
        }

        return count;
    }
}

```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class programmers_12911Test {
    programmers_12911 s = new programmers_12911();

    @Test
    public void test(){
        Assert.assertEquals(s.solution(78),83);
        Assert.assertEquals(s.solution(15),23);
    }

}
```

**Experience 1:**

`Integer.toBinaryString` 메서드를 이용해서 이진수로 변화하여 문제를 풀었다.