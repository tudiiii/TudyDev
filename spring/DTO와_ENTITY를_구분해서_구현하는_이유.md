# DTO와 ENTITY를 구분해서 구현한 이유

## Entity vs DTO

dto 객체는 view layer와 데이터를 주고받을 때 사용

entity 객체는 db layer와 데이터를 주고받을 때 사용

entity가 변경되면 여러 클래스에 영향을 끼치게 되는 반면

request와 response용 DTO는 view 를 위한 클래스라 정말 자주 변경된다.

## Entity

실제 데이터베이스 테입르과 매핑되는 클래스

- 데이터베이스 영속성(Persistent)의 목적으로 사용되는 객체
- 많은 Service 클래스와 비즈니스 로직들이 Entity 클래스를 기준으로 동작하기 때문에 Entity 클래스가 변경되면 여러 클래스에 영향을 줄 수 있다.
- 따라서 Request나 Response 값을 전달하는 클래스로 사용하는 것은 좋지 않다.
- setter 메소드 사용 지양 (setter가 있다는 것은 불변하지 않다는 것)
- Entity에는 setter 대신 Constructor(생성자) 또는 Builder 사용

## DTO

Data Transfer Object

- 계층 간 데이터 교환이 이루어질 수 있도록 하는 객체
- JSON serialization과 같은 직렬화에 사용
- setter 메소드를 가지는 경우 가변 객체로 활용 가능
- getter나 setter 메소드 외의 다른 비즈니스 로직은 포함하지 않는다.

## Entity와 DTO를 분리하는 이유

### = DB 와 View사이의 역할을 분리하기 위해

- DTO의 목적은 전달 : view와 통신하기 때문에 UI 요건에 따라 자주변경 될 수 있다.
- Entity의 목적은 테이블 매핑
- 테이블에 매핑되는 정보가 실제 view 에서 원하는 정보와 다를 수 있다. 이러한 경우 변환하는 로직이 entity에 들어가게 된다면 Entity가 지저분해진다.
- DB로부터 조회한 모든 엔티티를 뷰로 넘기게 되면 원하지 않는 정보까지 전달하게 되어 정보 노출에 대한 문제가 생길 수 있고 이를 막기 위한 비지니스 로직과는 상관없는 방어 로직들이 생기게 된다.