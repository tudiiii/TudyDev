
## [42862. 체육복](https://programmers.co.kr/learn/courses/30/lessons/42862)

**Problem :**

점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

제한 사항

- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

**Source Code 1:**

```java
/* 체육복

테스트 1 〉	통과 (0.03ms, 70.1MB)
테스트 2 〉	통과 (0.08ms, 69.3MB)
테스트 3 〉	통과 (0.06ms, 68.5MB)
테스트 4 〉	통과 (0.06ms, 69.2MB)
테스트 5 〉	통과 (0.06ms, 68.5MB)
테스트 6 〉	통과 (0.03ms, 69.5MB)`
테스트 7 〉	통과 (0.06ms, 69.1MB)
테스트 8 〉	통과 (0.07ms, 68.6MB)
테스트 9 〉	통과 (0.05ms, 68.4MB)
테스트 10 〉통과 (0.09ms, 68.8MB)
테스트 11 〉통과 (0.05ms, 68.8MB)
테스트 12 〉통과 (0.04ms, 68MB)
 */

import java.util.ArrayList;
import java.util.List;

public class programmers_42862 {

    public int solution(int n, int[] lost, int[] reserve) {
        // 전체학생 수 - 체육복 잃어버린 학생 수
        int answer = n - lost.length;

        List<Integer> lostStudent = new ArrayList<>();
        List<Integer> reserveStudent = new ArrayList<>();

        // 여분이 있는데 체육복을 잃어버린 학생 0
        for(int i=0;i<lost.length;i++){
            for(int j=0;j<reserve.length;j++){
                if(lost[i]==reserve[j] && lost[i]!=0){
                    lost[i] = 0;
                    reserve[j] = 0;
                    answer++;
                }
            }
        }

        // 체육복 분실했지만 여분이 있는 학생 제외하고 LIST에 추가
        for(int lo : lost)  if(lo!=0) lostStudent.add(lo);
        for(int re : reserve)   if(re!=0)   reserveStudent.add(re);

        // 체육복 여분이 있는 학생이 없으면 END
        if(reserveStudent.size()==0) return answer;

        int i=0; int j=0; // 이중 for문 처럼 List 돌리기 (기준 -> 체육복 없는 학생)
        while(!lostStudent.isEmpty()){
            // 체육복 여유분을 나눠줄 수 있을 때
            if(lostStudent.get(i)==(reserveStudent.get(j)+1) || lostStudent.get(i)==(reserveStudent.get(j)-1)){
                // 수업에 참여할 수 있는 학생들은 제외
                lostStudent.remove(i);
                reserveStudent.remove(j);
                j=0; // 비교가 끝났기 때문에 j초기화 (이중for 문 느낌)
                answer++; // 수업에 참여할 수 있는 학생 수 ++
            }else{
                j++; 
                // 체육복을 빌릴수가 없을때
                if(j==reserveStudent.size()){
                    // 수업 참여 못 하는 학생 제외
                    lostStudent.remove(i);
                    j=0;
                }
            }

            if(reserveStudent.isEmpty()){
                break;
            }
        }


        // 체육복 여분이 있는 학생이 없으면 END
        return answer;
    }
}
```

**Test Code 1:**
```java
import org.junit.Test;
import static org.junit.Assert.*;

public class programmers_42862Test {

    programmers_42862 s = new programmers_42862();

    @Test
    public void test(){
       assertEquals(s.solution(5, new int[]{2, 4},new int[]{1,3,5}),5);
        assertEquals(s.solution(3, new int[]{1,2},new int[]{2,3}),2);
        assertEquals(s.solution(9, new int[]{2,4,7,8},new int[]{3,6,9}),8);
        assertEquals(s.solution(5, new int[]{2, 4},new int[]{3,5}),5);
        assertEquals(s.solution(6, new int[]{1,2,4},new int[]{2,3,4,5}),5);
        assertEquals(s.solution(5, new int[]{2,3},new int[]{3,4}),4);
        assertEquals(s.solution(5, new int[]{1},new int[]{3,4}),4);
        assertEquals(s.solution(5, new int[]{1,2,3,4,5},new int[]{1,2,3,4,5}),5);
        assertEquals(s.solution(3, new int[]{1,3},new int[]{1,2}),3);
        assertEquals(s.solution(8, new int[]{3,4,7},new int[]{1,3,5,6}),8);
        assertEquals(s.solution(6, new int[]{1,2,6},new int[]{2,3,4,5}),5);
        assertEquals(s.solution(8, new int[]{1,2,4,5,6,7},new int[]{2}),3);
        assertEquals(s.solution(5, new int[]{2,4},new int[]{3}),4);
    }
}
```

**Experience 1:**

`20200909` 보는것처럼 테스트 케이스가 계속 통과를 못해서 테스트 케이스 몇개를 체크한지 모르겠다. 반 년도 전에 푼 문제는 테스트케이스 1개를 통과하지 못하고 평균 실행시간도 0.9ms인데 오늘푼 문제는 테스트케이스도 다 통과하고 평균 실행시간도 0.05ms정도여서 아주 뿌듯하다.

이 문제는 **여벌 체육복을 가져온 학생이 체육복을 도난당했어도, 자신의 체육복이 있으니깐 수업에 참여할 수 있고 남은 체육복이 없으니 다른사람한테 빌려줄수 없는 제한사항** 이 가장 포인트가 아닐까싶다. 

만약 학생이 3명이고 lost 가 [1,2] 이고 reserve가 [2,3]일 때 그냥 생각했을때는 2가 1빌려주고 3이 2빌려주니까 3명 다 들을 수 있을 것 같다고 생각할 수 있다. but!!! 2번 학생이 여벌분이 도난당한것이기 때문에 다른사람한테 빌려줄수 없다는 사실~ 3번친구는 1번친구에게 체육복을 빌려줄 수 없기 때문에 체육수업을 들을 수 있는 학생은 2명이다! 1번 친구는 못 듣는다.

그래서 나는 먼저 같은 숫자가 있으면 0을 대입해주고 list에 삽입할때 값이 0은 추가할 수 없도록 하였다. 그리고 이중 포문처럼 체육복을 나눠줄 수 있는 학생 기준으로 체육복을 잃어버린 학생에게 나눠줄 수 있는지 코드를 짜보았다. 