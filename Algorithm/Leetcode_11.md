
## [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

**Problem :**

Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

Notice that you may not slant the container.

**Example 1:**

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**

```
Input: height = [1,1]
Output: 1
```

**Example 3:**

```
Input: height = [4,3,2,1,4]
Output: 16
```

**Example 4:**

```
Input: root = [1,2]
Output: [2,1]
```

**Example 5:**

```
Input: height = [1,2,1]
Output: 2
```

**Constraints:**

- n = height.length
- 2 <= n <= 3 * 104
- 0 <= height[i] <= 3 * 104

**Source Code 1:**

```java
public class Leetcode_11 {
    /*
    Runtime: 2 ms
    Memory Usage: 40.4 MB
     */
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length -1;
        int max = ((right-left) * Math.min(height[left], height[right]));

        while(left<right){ // 인덱스 비교
            if(height[left]<=height[right]){
                left++;
            }else {
                right--;
            }
            // 최대 넓이 구하기
            max = Math.max(max,((right-left) * Math.min(height[left], height[right])));

        }

        return max;
    }
}
```

**Experience 1:**
