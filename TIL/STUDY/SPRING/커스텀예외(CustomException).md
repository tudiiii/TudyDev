# 커스텀 예외 ( Custom Exception )

## 기본 예외처리

```java
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
  
    @GetMapping("/product/{id}")
    public Response getProduct(@PathVariable String id){
        return productService.getProduct(id);
    }
}
```

## 커스텀 예외처리

사용자 정의 예외 클래스는 컴파일러가 체크하는 **일반 예외**로 선언할 수도 있고, 컴파일러가 체크하지 않는 **실행 예외**로 선언할 수도 있다.

- **일반 예외**로 선언할 경우 Exception을 상속받아 구현
- 프로그램 **실행 예외**로 선언할 경우에는 RuntimeException을 상속받아 구현

- 사용자 정의 예외 클래스 이름은 Exception으로 끝나는 것을 권장한다.
- 사용자 정의 예외 클래스 작성 시 생성자는 두 개를 선언하는 것이 일반적이다.
    - 매개 변수가 없는 기본 생성자
    - 예외 발생 원인(예외 메시지)을 전달하기 위해 String타입의 매개변수를 갖는 생성자
- 예외 메시지의 용도는 catch{} 블록의 예외처리 코드에서 이용하기 위해서이다.

```java
public class CustomException extends RuntimeException {

    // 1. 매개 변수가 없는 기본 생성자
    CustomException() {

    }

    // 2. 예외 발생 원인(예외 메시지)을 전달하기 위해 String 타입의 매개변수를 갖는 생성자
    CustomException(String message) {
        super(message); // RuntimeException 클래스의 생성자를 호출합니다.
    }
}
```

### @ControllerAdvise

@ControllerAdvise 는 모든 @Controller 즉, 전역에서 발생할 수 있는 예외를 잡아 처리해주는 annotation이다.

### @RestControllerAdvise

@ControllerAdvice 와 @ResponseBody을 가지고 있다.

@Controller처럼 작동하며 @ResponseBody를 통해 객체를 리턴할 수 있다.

### @ExceptionHandler

@Controller, @RestController에 적용된 Bean 내에서 발생하는 예외, 즉 controller 내부에서 처리되다가 오류나는 사항에 대해서 메서드로 핸들링할 수 있다.

```java
@ControllerAdvice
public class ExceptionHandlers {

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity handleFileException() {
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

}
```