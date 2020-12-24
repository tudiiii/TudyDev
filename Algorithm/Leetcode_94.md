
## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

**Problem :**

Given the root of a binary tree, return the inorder traversal of its nodes' values.

**Example 1:**

```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Example 2:**

```
Input: root = []
Output: []
```

**Example 3:**

```
Input: root = [1]
Output: [1]
```

**Example 4:**

```
Input: root = [1,2]
Output: [2,1]
```

**Example 5:**

```
Input: root = [1,null,2]
Output: [1,2]
```

**Constraints:**

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

**Source Code 1:**

```java

import java.util.ArrayList;
import java.util.List;

public class Leetcode_94 {

    public class TreeNode {
      int val;
      TreeNode left;
      TreeNode right;
      TreeNode() {}
      TreeNode(int val) { this.val = val; }
      TreeNode(int val, TreeNode left, TreeNode right) {
          this.val = val;
          this.left = left;
          this.right = right;
      }
  }

    List<Integer> output;

    public List<Integer> inorderTraversal(TreeNode root) {
        output = new ArrayList<>();
        inorderTraverse(root); // 중위순회
        return output;
    }

    private void inorderTraverse(TreeNode node) {
        if(node == null) return;

        inorderTraverse(node.left);
        output.add(node.val);
        inorderTraverse(node.right);
    }
}

```

```
**Experience 1:**

처음에 문제를 풀었는데 runtime 거의 푼 사람 중에 꼴지.. ~~거의도 아니고 그냥 꼴지 ㅎ;~~ 이중 포문을 사용하고 싶지않아서 리스트를 사용했는데 이중 포문을 사용하는 것보다 더 오랜 시간이 걸렸다. 다른 사람이 푼 문제를 보니까 나와 같은 방식인데 `map`을 사용해서 `key`,`value`값으로 쉽게 찾는 것을 보고 따라풀었더니 runtime 1ms!! 136ms에서 1ms까지 ㅎ^^ 분발을 더 해야겠다는 생각이 드는 문제였다. 
