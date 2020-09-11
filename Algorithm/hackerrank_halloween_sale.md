
## [00001. halloween-sale](https://www.hackerrank.com/challenges/halloween-sale/problem)

**Problem :**

You wish to buy video games from the famous online video game store Mist.

Usually, all games are sold at the same price,  dollars. However, they are planning to have the seasonal Halloween Sale next month in which you can buy games at a cheaper price. Specifically, the first game you buy during the sale will be sold at  dollars, but every subsequent game you buy will be sold at exactly  dollars less than the cost of the previous one you bought. This will continue until the cost becomes less than or equal to  dollars, after which every game you buy will cost  dollars each.

For example, if ,  and , then the following are the costs of the first  games you buy, in order:

You have  dollars in your Mist wallet. How many games can you buy during the Halloween Sale?

Input Format

The first and only line of input contains four space-separated integers , ,  and .

제한 사항 - 링크 참고

> INPUT 23 3 6 80 , OUTPUT 6


**Source Code 1:**

```java
public class HalloweenSale {
    static int howManyGames(int p, int d, int m, int s) {
        int answer = 0;
        int addCash = 0;

        while (true) {
            addCash += p;
            if (addCash > s)break;
            answer++;
            p -= d;
            if (p < m)p = m;
        }

        return answer;
    }

}
```

**Test Code 1:**
```java
import org.junit.Assert;
import org.junit.Test;

public class HalloweenSaleTest {

    HalloweenSale s = new HalloweenSale();

    @Test
    public void test(){

        Assert.assertEquals(s.howManyGames(20,3,6,80),6);
        Assert.assertEquals(s.howManyGames(20,3,6,85),7);
    }

}
```

**Experience 1:**

`20200911` 지금까지 풀었던 문제들 보단 좀 간단한 문제였던 것 같다.