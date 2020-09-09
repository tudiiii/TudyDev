
## [42586. 기능개발](https://programmers.co.kr/learn/courses/30/lessons/42586)

**Problem :**

프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

제한 사항

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

**Source Code 1:**

```java
/* 기능개발

테스트 1 〉	통과 (0.41ms, 69.7MB)
테스트 2 〉	통과 (0.71ms, 69.6MB)
테스트 3 〉	통과 (0.65ms, 69.1MB)
테스트 4 〉	통과 (0.51ms, 69.7MB)
테스트 5 〉	통과 (0.43ms, 68.9MB)
테스트 6 〉	통과 (0.50ms, 69.1MB)
테스트 7 〉	통과 (0.60ms, 70.3MB)
테스트 8 〉	통과 (0.45ms, 68.5MB)
테스트 9 〉	통과 (0.58ms, 68.8MB)
테스트 10 〉	통과 (0.74ms, 70.7MB)
테스트 11 〉	통과 (0.46ms, 70.8MB)
 */

import java.util.LinkedList;
import java.util.Queue;

public class programmers_42586 {
    public int[] solution(int[] progresses, int[] speeds) {
        LinkedList<Integer> pro = new LinkedList<>();
        LinkedList<Integer> list;

        // 데이터 삽입
        for(int progress : progresses){
            pro.add(progress);
        }

        // 개발속도에 따른 기능배포 갯수 리스트
        list = functionNum(deploy(pro,speeds));

        // linkedList -> int[]
        return LinkedListToInt(list);
    }

    // 배포까지 걸리는 작업일수 리스트
    public LinkedList<Integer> deploy (Queue<Integer> pro, int[] speeds){

        LinkedList<Integer> days = new LinkedList<>();
        int i=0;

        while(!pro.isEmpty()){
            days.add(dayCount(pro.poll(),speeds[i]));
            i++;
        }

        return days;
    }

    // 배포가능 작업일수 구하기
    public int dayCount(int process, int speed){
        return (int) Math.ceil((double)(100-process)/speed);
    }

    // 리스트에 한 번에 배포될 수 있는 기능갯수 추가
    public LinkedList<Integer> functionNum(Queue<Integer> days){

        LinkedList<Integer> result = new LinkedList<>();
        int count= 1;
        int day = days.remove();

        while(!days.isEmpty()){
            if(days.peek()>day){ // 배포
                day = days.poll();
                result.offer(count);

                count=1;
            }else{ // 배포같이할 일 찾기
                days.poll();
                count++;
            }

            if(days.size()==0){
                result.offer(count);
            }
        }
        return result;
    }

    // 기능배포 갯수 리턴
    public int[] LinkedListToInt(LinkedList<Integer> result ){

        int[] answer =new int[result.size()];

        for(int i=0;i<answer.length;i++){
            answer[i] = result.remove();
        }
        return answer;
    }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class programmers_42586Test {

    programmers_42586 s = new programmers_42586();

    @Test
    public void testCase(){
        assertArrayEquals(s.solution(new int[]{93,30,55},new int[]{1,30,5}),new int[]{2,1});
        assertArrayEquals(s.solution(new int[]{95,90,99,99,80,99},new int[]{1,1,1,1,1,1}),new int[]{1,3,2};
    }

}
```

**Experience 1:**

`20200906` 여러가지로 분류해서 계산해야되는만큼 한 번 메소드를 나누서 문제를 풀어봤다. 메소드를 나누지 않은 소스코드 실행시간과 메소드를 나눈 후 소스코드 실행시간의 차이가 좀 나는것을 보고 진짜 메소드를 나누는 것이 좋긴 한 것 같지만 아직도 뭐가 좋고 뭐가 어떤지는 잘 모르겠어서..일단 그냥.. 해봤다 ㅎ 나중에 이 글을 봤을때에는 깨달았기를 바라면서 ㅎ;

`deploy`메소드에서 `days`라는 변수를 만들어서 작업이 끝나기까지 남은 일수들을 저장하고, `functionNum` 메소드에서 함께 배포할 수 있는 기능들의 갯수를 따로 `result` 변수에 저장하였다. `days`나 `result`는 링크드 리스트로 구현을 하였기 때문에 배열로 다시 저장해주기 위해서 `LinkedListToInt()`메소드를 선언해주었다.