
## [68967. 다음 큰 숫자](https://programmers.co.kr/learn/courses/30/lessons/12911)

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
/* 다음 큰 숫자
정확성
테스트 1 〉	통과 (0.04ms, 52.6MB)
테스트 2 〉	통과 (0.04ms, 52MB)
테스트 3 〉	통과 (0.04ms, 52.5MB)
테스트 4 〉	통과 (0.03ms, 53.8MB)
테스트 5 〉	통과 (0.04ms, 51.6MB)
테스트 6 〉	통과 (0.04ms, 52.5MB)
테스트 7 〉	통과 (0.06ms, 52.5MB)
테스트 8 〉	통과 (0.04ms, 52.7MB)
테스트 9 〉	통과 (0.05ms, 52.1MB)
테스트 10 〉	통과 (0.05ms, 52.8MB)
테스트 11 〉	통과 (0.04ms, 53.1MB)
테스트 12 〉	통과 (0.03ms, 52.7MB)
테스트 13 〉	통과 (0.04ms, 52.6MB)
테스트 14 〉	통과 (0.04ms, 52.4MB)

효율성
테스트 1 〉	통과 (0.05ms, 52MB)
테스트 2 〉	통과 (0.04ms, 52MB)
테스트 3 〉	통과 (0.06ms, 52.3MB)
테스트 4 〉	통과 (0.03ms, 52MB)
테스트 5 〉	통과 (0.04ms, 52MB)
테스트 6 〉	통과 (0.04ms, 51.5MB)
 */

public class programmers_68967 {
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

public class programmers_68967Test {
    programmers_68967 s = new programmers_68967();

    @Test
    public void test(){
        Assert.assertEquals(s.solution(78),83);
        Assert.assertEquals(s.solution(15),23);
    }

}
```

**Experience 1:**

`Integer.toBinaryString` 메서드를 이용해서 이진수로 변화하여 문제를 풀었다.