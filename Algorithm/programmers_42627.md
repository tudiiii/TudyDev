
## [42627. 디스크 컨트롤러](https://programmers.co.kr/learn/courses/30/lessons/42627)

**Problem :**

문제 설명
하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.

예를들어

- 0ms 시점에 3ms가 소요되는 A작업 요청
- 1ms 시점에 9ms가 소요되는 B작업 요청
- 2ms 시점에 6ms가 소요되는 C작업 요청

와 같은 요청이 들어왔습니다. **그림은 위 링크를 참고하세요!!**

- A: 3ms 시점에 작업 완료 (요청에서 종료까지 : 3ms)
- B: 1ms부터 대기하다가, 3ms 시점에 작업을 시작해서 12ms 시점에 작업 완료(요청에서 종료까지 : 11ms)
- C: 2ms부터 대기하다가, 12ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 16ms)
이 때 각 작업의 요청부터 종료까지 걸린 시간의 평균은 10ms(= (3 + 11 + 16) / 3)가 됩니다.

하지만 A → C → B 순서대로 처리하면

- A: 3ms 시점에 작업 완료(요청에서 종료까지 : 3ms)
- C: 2ms부터 대기하다가, 3ms 시점에 작업을 시작해서 9ms 시점에 작업 완료(요청에서 종료까지 : 7ms)
- B: 1ms부터 대기하다가, 9ms 시점에 작업을 시작해서 18ms 시점에 작업 완료(요청에서 종료까지 : 17ms)
이렇게 A → C → B의 순서로 처리하면 각 작업의 요청부터 종료까지 걸린 시간의 평균은 9ms(= (3 + 7 + 17) / 3)가 됩니다.

각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs가 매개변수로 주어질 때, 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면 평균이 얼마가 되는지 return 하도록 solution 함수를 작성해주세요. (단, 소수점 이하의 수는 버립니다)

- jobs의 길이는 1 이상 500 이하입니다.
- jobs의 각 행은 하나의 작업에 대한 [작업이 요청되는 시점, 작업의 소요시간] 입니다.
- 각 작업에 대해 작업이 요청되는 시간은 0 이상 1,000 이하입니다.
- 각 작업에 대해 작업의 소요시간은 1 이상 1,000 이하입니다.
- 하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.

**Source Code 1:**

```java
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Queue;

public class Programmers_42627 {

    public int solution(int[][] jobs) {
        int answer = 0;
        int index = 0;
        int time = 0;
        int length = jobs.length;

        Queue<int[]> waiting = new PriorityQueue<>(((o1, o2) -> o1[1] - o2[1]));
        Arrays.sort(jobs, (o1, o2) -> o1[0] - o2[0]); // 대기 순서 대로 정렬

        // replaced with comparator.comparingInt
        // Queue<int[]> waiting = new PriorityQueue<>((Comparator.comparingInt(o -> o[1])));
        // Arrays.sort(jobs, Comparator.comparingInt(o -> o[0])); // 대기 순서 대로 정렬

        while(index < length || !waiting.isEmpty()){
            while(index < length && jobs[index][0] <= time){
                waiting.offer(jobs[index++]);
            }

            if(waiting.isEmpty()){
                time = jobs[index][0];
            }else {
                int[] job = waiting.poll();
                answer += time + job[1] - job[0];
                time += job[1]; // 작업 완료 시
            }
        }

        return answer/length;
    }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class Programmers_42627Test {

    Programmers_42627 s = new Programmers_42627();

    @Test
    public void test(){
        Assert.assertEquals(s.solution(new int[][]{{0,3},{1,9},{2,6}}),9);
    }

}
```

**Experience 1:**

레벨 3답게 여러모로 꼬아서(?)낸 문제 같다. 대학시절에 해결하지 못해서 씨플인가 받았던 스케쥴러 관련 문제이다... ~리리듀오 ㄱ나..? 우리의 os시간..~