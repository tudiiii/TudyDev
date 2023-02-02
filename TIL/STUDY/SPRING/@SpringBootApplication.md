# @SpringBootApplication 이란?

## XXXApplication.java

스프링 부트는 main 메서드가 선언된 클래스를 기준으로 실행된다.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SnsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnsApplication.class, args);
	}

}
```

어노테이션 `@SpringBootApplication` 은 스프링 부트의 가장 기본적인 설정을 선언해 준다.

## @SpringBootApplication

= @Configuration + @EnableAutoConfiguration + @ComponentScan

```java
@Target(value = {ElementType.TYPE})
@Retention(value = RetentionPolicy.RUNTIME)
@Documented
@Inherited
**@SpringBootConfiguration**
**@EnableAutoConfiguration**
**@ComponentScan**(excludeFilters = {
    @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {TypeExcludeFilter.class}),
    @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {AutoConfigurationExcludeFilter.class})})
public @interface SpringBootApplication {

    @AliasFor(annotation = EnableAutoConfiguration.class)
    public Class<?>[] exclude() default {};

    @AliasFor(annotation = EnableAutoConfiguration.class)
    public String[] excludeName() default {};

    @AliasFor(annotation = ComponentScan.class, attribute = "basePackages")
    public String[] scanBasePackages() default {};

    @AliasFor(annotation = ComponentScan.class, attribute = "basePackageClasses")
    public Class<?>[] scanBasePackageClasses() default {};

    @AliasFor(annotation = ComponentScan.class, attribute = "nameGenerator")
    public Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    @AliasFor(annotation = Configuration.class)
    public boolean proxyBeanMethods() default true;
}
```

### @**ComponentScan**

- @Component 어노테이션 및 @Service, @Repository, @Controller, @RestController 등의 어노테이션을 스캔하여 Bean 으로 등록해주는 어노테이션이다.
- 해당 어노테이션이 선언된 하위 패키지에서 위와 같은 Annotaion을 찾아서 Bean으로 등록한다.
    - 스프링의 component-scanning 기술을 통해 ApplicationContext에 빈으로 등록하게 하는 역할이다.

- AutoConfigurationExcludeFilter

이렇게 많은 클래스들이 항상 다 빈으로 등록된다면 엄청난 리소스 낭비가 될 것이다.

스프링부트는 현재 프로젝트에서 필요한 부분만 auto configure되도록 하며, AutoConfigurationExcludeFilter가 @Conditional 어노테이션등을 활용해 필터링 작업을 수행한다.

### @**EnableAutoConfiguration**

- 사전에 정의한 라이브러리들을 Bean으로 등록해주는 어노테이션이다.
    - spring-boot-autoconfigure 안에 META-INF 밑에 있는 spring.factories 안에 있는 자동 설정들을 조건에 따라서 등록시키는 역할을 한다.
- 사전에 정의한 라이브러리들 모두가 등록되는 것은 아니고 특정 조건이 만족될 경우에 Bean으로 등록된다.

### @Configuration

- 현재 클래스가 Spring의 설정 파일임을 알려주는 어노테이션이다.
- Configuration을 클래스에 적용하고 @Bean을 해당 클래스의 메소드에 적용하려면 @Autowired로 빈을 부를 수 있다.

## 참고

[@SpringBootApplication에 대해 알아보자](https://velog.io/@gehwan96/SpringBootApplication%EC%9D%B4%EB%9E%80)