
## [42626. 더 맵게](https://programmers.co.kr/learn/courses/30/lessons/42626)

**Problem :**

매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

> 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

- scoville의 길이는 2 이상 1,000,000 이하입니다.
- K는 0 이상 1,000,000,000 이하입니다.
- scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
- 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

**Source Code 1:**

```java
import java.util.PriorityQueue;

public class programmers_42626 {
    public int solution(int[] scoville, int K) {
        int answer = 0;

        PriorityQueue<Integer> sc = new PriorityQueue<>(scoville.length);

        for(int aScoville:scoville){
            sc.offer(aScoville);
        }

        while(sc.peek()<=K){
            if(sc.size()==1){
                answer = -1;
                break;
            }

            int a = sc.poll();
            int b = sc.poll();

            int result = a+(b*2);
            sc.offer(result);
            answer++;

        }

        return answer;
     }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class programmers_42626Test {

    programmers_42626 s = new programmers_42626();

    @Test
    public void 입출력예(){
        int[] scoville = {1,2,3,9,10,12};
        int K = 7;
        int expected = 2;

        Assert.assertEquals(s.solution(scoville,K),expected);
    }

    @Test
    public void K가되지않을때(){
        int[] scoville = {1,2,3};
        int K = 20;
        int expected = -1;

        Assert.assertEquals(s.solution(scoville,K),expected);
    }
}
```

**Experience 1:**
`20200905` 힙은 데이터를 입력하면 자동으로 우선순위에 따라 정렬해준다. 그래서 나는 우선순위 큐를 이용해서 문제를 풀었다. 값을 `offer()`로 넣어준 후, 정렬된 데이터 값을 `poll()`할 때마다 스코빌을 계산하여 `K`보다 작으면 `offer()`해주고 `count++`를 해주면된다. 이 때 `K`보다 값이 크면 break로 나와준다.

포인트는 스코빌을 계산할 때 `K`를 넘지 않을때도 있다는 점 ! 이거때문에 계속 3개 에러나서 초콤 열받았다는 점 ^^:

우선순위 큐에 대해 잘 모르면 내가 [우선순위에 대해 정리한 글](https://tudiiii.github.io/TudyDev/data_structure/우선순위큐)을 한 번 읽어보는 것도 좋을것 같다.
