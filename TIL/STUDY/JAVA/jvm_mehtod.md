## JVM 메모리 영역

-- 작성이 완료된 글이 아닙니다.

### jvm이 실행클래스를 실행하는 절차 

#### method에 static이 존재할 때

1. 해당 클래스를 현재 디렉토리에서 찾는다.
2. 찾으면 클래스 내부에 있는 `static` 키워드가 있는 메서드를 메모리로 로딩 한다.
    - ⭐️⭐️ 메인에 `static` 키워드가 존재하지 않으면 메모리에 로딩되지 않는다 !!!!!
    - method area의 static zone에 로딩 한다  `main()` mthod , `add()` method
3. static zone에서 `main()` 메소드를 실행한다. ( 호출, 시작 )
    - `main()` method가 호출되면 `main()` method의 호출정보가 stack area에 들어간다. (push)
    - `stack area` : 메소드가 호출되면 메서드의 호출정보가 저장되는 영역
    - 프로그램이 시작되는 부분이다. (pc의 위치가 현재 동작되고 있는 메소드이다.) 
4. stack area가 비어 있으면 프로그램이 종료된 것이다.

```java
public class test(){
    public static void main(String[] args){
        int a =10; int b=20;
        int v = add(a,b); // static method call
        System.out.println(v);
    }

    public static int add(int a,int b){
        int sum = a + b;
        return sum;
    }
    }
}
```

### method에 static이 존재하지 않을 때

1. 해당 클래스를 현재 디렉토리에서 찾는다.
2. 찾으면 클래스 내부에 있는 `static` 키워드가 있는 메서드를 메모리로 로딩 한다.
    - method area의 static zone에 로딩 한다.  `main()` mthod 
3. static zone에서 `main()` 메소드를 실행한다. ( 호출, 시작 )
    - `main()` method가 호출되면 `main()` method의 호출정보가 stack area에 들어간다. (push)
4. `new` 키워드로 객체를 생성하면 heap area에 저장된다.
5. tcp.add() 메소드를 호출하면 method area(non-static zone) 에 기계어 코드로 올라오고, heap area에 add 메소드의 번지가 (포인트 형태로) 할당된다.
    - `tpc` 변수는 stack area에 있으며 heap area에 add 메소드를 가르키고있다.

```java
public class Test{
    public static void main(String[] args){
        int a = 10; int b = 20;

        Test tpc = new Test(); // 객체 생성

        int v = tpc.add(a,b);
        System.out.println(v); 
    }

    public int add(int a, int b){
        int sum = a + b;
        return sum;
    }
}
```