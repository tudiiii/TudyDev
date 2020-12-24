
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

**Experience 1:**
대학교 자료구조 시간에 배웠던 이진트리의 순회들.. 잊고 있었는데 다시 소스 코드로 구현하려고 하니깐 어려움이 있었다.

이번기회에 이진트리에 대한 정리를 할 생각이다.
