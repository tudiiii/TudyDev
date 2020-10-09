
## [1. Two sum](https://leetcode.com/problems/two-sum/)

**Problem :**

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Source Code 1:**

```java
import java.util.ArrayList;
import java.util.List;

public class Leetcode_1 {
/*
    Runtime: 129 ms
    Memory Usage: 39.5 MB
*/

public int[] twoSum2(int[] nums, int target) {

        List<Integer> answerList = new ArrayList<>();
        int count;

        for(int i=0;i<nums.length;i++){
            int num = target-nums[i]; // target이 되기 위해 필요한 수
            count=0;

            while(count!=nums.length){
                if(num == nums[count] && count!=i){
                    // 합해서 target이 되는 수의 인덱스
                    answerList.add(i);
                    answerList.add(count);
                    break;
                }
                count++;
            }

            if(answerList.size()==2) break; // answerList에 필요한 값이 있으면 break
        }

        // List -> array
        int[] answer = new int[answerList.size()];
        for(int i=0; i<answerList.size(); i++){
            answer[i] = answerList.get(i);
        }

        return answer;
    }
```

**Source Code 2:**

```java
import java.util.HashMap;
import java.util.Map;

public class Leetcode_1 {
/*
    Runtime: 1 ms
    Memory Usage: 39 MB
*/

    public int[] twoSum(int[] nums, int target) {

        Map<Integer, Integer> answerMap = new HashMap<>();

        for(int i=0;i<nums.length;i++) 	{
            int num = target - nums[i]; // target이 되기 위해 필요한 수
            if(answerMap.containsKey(num))
                // num의 인덱스, num과 합하면 taget이 되는 수의 인덱스
                return new int[] {i, answerMap.get(num)};
            answerMap.put(nums[i], i);
        }

        return new int []{-1,-1};
    }
}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class Leetcode_1Test {

    Leetcode_1 s = new Leetcode_1();

    @Test
    public void test(){

        Assert.assertEquals(s.twoSum(new int[]{2,7,11,15},9),new int[]{0,1});
        Assert.assertEquals(s.twoSum(new int[]{3,2,4},6), new int[]{1,2});
    }
}
```
**Experience 1:**

처음에 문제를 풀었는데 runtime 거의 푼 사람 중에 꼴지.. ~~거의도 아니고 그냥 꼴지 ㅎ;~~ 이중 포문을 사용하고 싶지않아서 리스트를 사용했는데 이중 포문을 사용하는 것보다 더 오랜 시간이 걸렸다. 다른 사람이 푼 문제를 보니까 나와 같은 방식인데 `map`을 사용해서 `key`,`value`값으로 쉽게 찾는 것을 보고 따라풀었더니 runtime 1ms!! 136ms에서 1ms까지 ㅎ^^ 분발을 더 해야겠다는 생각이 드는 문제였다. 
