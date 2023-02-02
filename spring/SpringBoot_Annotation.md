# Spring boot test annotation

## Spring 테스트 어노테이션

스프링에서는 Web Layer(Controller)만을 테스트하는 @WebMvcTest와 애플리케이션 전체를 로드하여 진행하는 @SpringBootTest가 있다.

- @WebMvcTest
    - Controller(API) Layer만을 테스트하기 적합한 테스트 어노테이션
    - 전체 애플리케이션을 실행하는 것이 아닌 Controller만을 로드하여 테스트 진행 → 컨트롤러와 연과된 빈들만을 제한적으로 찾아서 등록
    - 신규기능이나 버그 패치 등 일부 기능만 테스트할 경우 사용
- @SpringBootTest
    - 실제 애플리케이션을 자신의 로컬 위에 올려서 포트 주소가 Listening 되어지고, 실제 DB와 커넥션이 붙어지는 상태에서 진행되는 Live 테스트 방법 ⇒ 통합 테스트를 위한 환경
- @DataJpaTest
    - Jpa(DB I/O) 테스트, JPA 관련 Bean(EntityManager)

### @SpringBootTest + @AutoConfigureMockMvc

1. 특징
    - 프로젝트 내부에 있는 스프링 빈을 모두 등록하여 테스트에 필요한 의존성을 추가
    - 실제 운영 환경에서 사용될 클래스들을 통합하여 테스트
    - 단위 테스트와 같이 기능 검증을 위한 것이 아니라, Spring Framework에서 전체적으로 Flow가 제대로 동작하는지 검증하기 위해 사용
2. 장점
    - 애플리케이션의 설정, 모든 Bean을 모두 로드하기 때문에 운영환경과 가장 유사한 테스트가 가능
3. 단점
    - 테스트 단위가 크기 때문에 디버깅이 까다로움
    - 어플리케이션의 설정, 모든 Bean을 로드하기 때문에 시간이 오래 걸림

Q) @AutoConfigureMockMvc는 언제쓰나요?

- Mock 테스트시 필요한 의존성을 제공

```java
@Autowired
MockMvc mvc;
```

- MockMvc 객체를 통해 실제 컨테이너가 실행되는 것은 아니지만 로직상 테스트 가능
- print() 함수를 통해 좀 더 테일한 테스트 결과를 볼 수 있음

![https://blog.kakaocdn.net/dn/bxGs9U/btrsXshcyoc/37LDu7y4JrAaCgJ08BW4Xk/img.png](https://blog.kakaocdn.net/dn/bxGs9U/btrsXshcyoc/37LDu7y4JrAaCgJ08BW4Xk/img.png)

- @WebMvcTest가 아닌 @SpringBootTest에서도 Mock 테스트를 가능하게 해주는 역할

Q ) Mock이 뭐죠?

- 테스트 작성을 위한 환경 구축이 어렵거나, 테스트가 특정 경우 및 순간에 의존적인 경우 테스트 작성 시간을 단축하기 위해 사용
- 실제를 흉내낸 가짜 객체
- Mock 객체는 Mock일 뿐, 실제 객체를 작동했을 때 예상대로 작동하지 않을 수 있음

Q ) MockBean이 뭐죠?

- Mock 객체를 빈으로 등록
- Spring의 ApplicationContext는 Mock 객체를 빈으로 등록하며, 이미 동일한 타입의 동일한 객체가 빈으로 등록되어있을 경우, 해당 빈은 선언한 @MockBean으로 대체됨

```java
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @MockBean private UserService userService;
		
		...
}
```

- @SpringBootTest를 통해 어플리케이션 내부의 모든 Bean을 등록
- Mock테스트를 위해 @AutoConfigureMockMvc를 사용
    - 이로써 MockMvc 객체를 통해 실제 컨테이너가 실행되는 것은 아니지만 로직상 테스트 가능
    - @WebMvcTest가 아닌 환경에서도 Mock 테스트가 가능
- @MockBean을 사용해 1개의 객체를 Bean으로 등록

### @WebMvcTest

1. 특징
    - MVC를 위한 테스트. 컨트롤러가 예상대로 작동되는지 테스트하기 위해 사용됨
    - Web Layer만 로드하며, @WebMvcTest 어노테이션을 사용시 아래의 항목들만 스캔하도록 제한하여 보다 빠르고 가벼운 테스트가 가능
        - (ex : @Controller, @ControllerAdvice, @JsonComponent, @Convert, @GenericConverter, Filter, WebMvcConfigurer, HandlerMethodArgumentResolver)
    - Security, Filter, Interceptor, request / response Handling, Controller의 항목들만 스캔하도록 제한하며, @Component는 스캔 대상에서 제외
2. 장점
    - WebApplication과 관련된 Bean들만 등록하기 때문에 @SpringBootTest보다 빠름
    - 통합테스트를 진행하기 어려운 테스트를 개별적으로 진행 가능
        
        (ex : 결제 모듈 API 사용에서 특정 조건에 따라 실패하는 경우를 Mock을 통해 가짜 객체를 만들어 테스트 가능)
        
3. 단점
    - Mock을 기반으로 테스트 하기 때문에, 실제 환경에서는 예상 밖의 동작오류가 발생할 수 있음

Q. controller에 @WebMvcTest을 사용하지 않은이유?

### **@RunWith**

JUnit 프레임워크의 테스트 실행 방법을 확장할 때 사용하는 어노테이션. WebApplicationContext를 생성, 관리하는 작업을 해당 어노테이션 안에 선언된 클래스로 이용한다는 의미.

- junit4 에서 사용

### @Test

해당 함수가 테스트함수임을 의미

### @MockBean

- mockito패키지 하위에 존재 → spring-boot-test에서 제공하는 어노테이션
- Bean 등록 과정에서 테스트에 필요한 Mocking 객체를 기존 객체 대신에 Bean으로 등록시켜 사용할수 있게 만들어주기때문에 해당 Bean을 의존 하는 모든 다른 객체들에 DI하여 손쉽게 Mocking 객체를 사용 할 수 있도록 해준다.

### @MockBean vs @Autowired

- AutoWired
    - 필요한 의존 객체의 타입에 해당하는 빈을 찾아 주입
    - • @SpringBootTest 에 의해 띄워진 빈들중 찾아서 주입하는 것. → 이미 구현된 내용을 사용.
- MockBean
    - Mock은 껍데기만 있는 객체
    - Mock Bean은 기존에 사용되던 Bean의 껍데기만 가져오고 내부의 구현 부분은 모두 사용자에게 위임한 형태.
- 차이점 ?
    - AutoWired로 의존 주입 후 테스트 하는 경우 실제 구현된 내용이 사용됨.
        
        예를 들면 이메일 서비스를 테스트하는 경우 이메일이 실제로 보내짐.
        
        그러나 mockBean은 껍데기만 가지고 오기 때문에 이메일이 보내지지 않으며,
        
        사용자가 이메일을 보내는 것과 같은 기대값을 넣어 테스트 할 수 있다.
        
        ⇒ 실제 디비에 값을 넣지 않고 넣은것과 같은 기대값을 넣어 테스트
        
        → repository 주입시 @MockBean 사용
        

### @MockBean vs @Mock

Bean이 컨테이너에 존재해야 할 경우 MockBean을 사용하고, 그렇지 않은경우에 Mock을 사용

## 참고
[@SpringBootTest, @AutoConfogureMockMvc, 그리고 @WebMvcTest](https://astrid-dm.tistory.com/536)