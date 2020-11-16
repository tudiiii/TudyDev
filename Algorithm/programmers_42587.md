
## [42587. 프린터](https://programmers.co.kr/learn/courses/30/lessons/42587)

**Problem :**

일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.

예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

- 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
- 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
- location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

**Source Code 1:**

```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class Programmers_42587 {
    public int solution(int[] priorities, int location) {

        int answer = 1;
        int length = priorities.length;

        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>(Comparator.reverseOrder());
        for (int priority : priorities) {
            priorityQueue.offer(priority);
        }

        while(!priorityQueue.isEmpty()){
            for(int i=0;i<length;i++){
                if (priorities[i] == priorityQueue.peek()) {
                    if (location == i) {
                        return answer;
                    }
                    answer++;
                    priorityQueue.poll();
                }
            }
        }
        return answer;
    }
}

```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class Programmers_42587Test {

    Programmers_42587 s = new Programmers_42587();

    @Test
    public void test(){
        Assert.assertEquals(s.solution(new int[]{2, 1, 3, 2},2),1);
    }
}
```

**Experience 1:**
`20201115` 더맵게 문제랑 비슷한 문제 유형이다. 우선수위큐를 이용해서 문제를 풀었다. `PriorityQueue`에 값어 출력 순서를 정한 후, prioritest 배열과 비교해가면서 값을 찾아 내면 된다.