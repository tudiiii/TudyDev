# Jackson ObjectMapper

## ObjectMapper란 ?

- JSON 컨텐츠를 Java 객체로 deserializtion 하거나 Java 객체를 JSON으로 serializtion 할 때 사용하는 Jackson 라이브러리의 클래스
- ObjectMapper는 생성 비용이 비싸기 때문에 bean/static으로 처리하는 것이 좋다.

## ObejctMapper 사용

- Cat 클래스

```java
@Getter
@Setter
@NoArgsConstructor
public class Cat {
    private String name;

    public Cat(String name) {
        this.name = name;
    }
}
```

### Object to Json

Java 객체를 JSON으로 serialization 하기 위해서는 ObjectMapper의 `writeValue()` 메서드를 이용한다.

여기서 주의할 점은 JSON으로 직렬화 시킬 클래스에 Getter가 존재해야 한다는 것이다.

Jackson 라이브러리는 Getter와 Setter를 이용하여 prefix를 잘라내고 맨 앞을 소문자로 만드는 것으로 필드를 식별한다. 그렇기 때문에 만약 직렬화 시킬 클래스에 Getter가 존재하지 않으면 클래스에서 필드를 식별하고 못하고 결국 값을 가져오지 못하여 에러가 발생하게 된다.

```java
ObjectMapper objectMapper = new ObjectMapper();

Cat cat = new Cat("kitty");
String catString = objectMapper.writeValueAsString(cat);
System.out.println("catString : " + catString);

--- output ---
catString : {"name":"kitty"}
```

### Json to Obejct

JSON 파일을 Java 객체로 deserialization 하기 위해서는 ObjectMapper의 `readValue()` 메서드를 이용한다.

여기서 주의할 점이 있는데, 역직렬화 시킬 클래스(여기서는 Person 클래스)에 JSON을 파싱한 결과를 전달할 생성자가 있어야 한다.

나는 기본 생성자를 이용하였지만 생성자에 Jackson 라이브러리의 `@JsonCreator` 어노테이션을 쓰는 등 [다양한 방법](https://blog.benelog.net/jackson-with-constructor.html)이 있다.

```java
String json = "{\"name\":\"kitty\"}";
Cat cat2 = objectMapper.readValue(json, Cat.class);
System.out.println("cat2 name :  " + cat2.getName());

--- output ---
cat2 name :  kitty
```

### Json to Jackson JsonNode

```java
JsonNode jsonNode = objectMapper.readTree(json);
String name = jsonNode.get("name").asText();
System.out.println("Tree cat2 name : " + name);

--- output ---
Tree cat2 name : kitty
```

### Json List to List

```java
String jsonList = "[{\"name\":\"kitty\"},{\"name\":\"kitty2\"}]";
List<Cat> cats = objectMapper.readValue(jsonList, new TypeReference<List<Cat>>() {});
for (Cat catElement : cats) {
    System.out.println("catElement : " + catElement.getName());
}

--- output ---
catElement : kitty
catElement : kitty2
```

## ObjectMapper 사용예시

*ObjectMapper* 클래스 의 *writeValueAsString* 및 *writeValueAsBytes* 메소드 는 Java 객체에서 JSON을 생성하고 생성된 JSON을 문자열 또는 바이트 배열로 반환한다.

```java
@Autowired private ObjectMapper objectMapper;

@Test
public void 회원가입() throws Exception {
  String userName = "userName";
  String password = "password";

  when(userService.join(userName, password)).thenReturn(mock(User.class));

  mockMvc.perform(post("/api/v1/users/join")
         .contentType(MediaType.APPLICATION_JSON)
         .content(**objectMapper**.writeValueAsBytes(new UserJoinRequest(userName, password)))
          ).andDo(print())
          .andExpect(status().isOk());

}
```

## 참고

- 다양한 JSON / 직렬화 / 역직렬화
[Jackson ObjectMapper 소개](https://recordsoflife.tistory.com/599)