# 자바스크립트 변수 유형

자바스크립트는 값 타입과 참조 타입의 두 가지 변수 유형이 있다.

- 기본 유형
    - boolean, null, undefined, string, number
- 참조 유형
    - array, function, object
- Javascript는 항상 값으로 전달되지만 변수가 객체 (배열 포함)를 참조 할 때 "값"은 객체에 대한 참조입니다.

## 기본 유형 ( Primitive Type ) : Number, String, Undefined, NUll, Boolean

기본 유형의 메모리 내 값은 실제 값이다. ( 예 boolean true, number 42 ).

기본 유형은 사용 가능한 고정 된 양의 메모리에 저장할 수 있다. 

기본 유형은 원본의 사본을 만드는 것을 의미한다. → 쌍둥이 중 한 명이 다리가 잘렸다고 해서 나머지 한 명이 다리가 잘리진 않는다

### 기본 유형 코드 예제

```jsx
var  a  =  13          //`13`을`a`에 할당 
var  b  =  a           //`a`의 값을`b`에 복사 
b  =  37              //`37`을`b` 
콘솔에 할당합니다 . log ( a )      // => 13
```

```jsx
var name = "Carlos"; 
var firstName = name; 
name = "Carla";

console.log (이름); // "칼라" 
console.log (firstName); // "카를로스"
```

- 변수 name이 생성되고, "Calors"값이 지정된다. js는 이를 위해 메모리 스팟을 할당한다.
- 변수를 firstname 생성하고, name의 값을 복사한다. firstname 자체에 메모리 스팟이 할당된다.
- 그런 다음의 값 name을 "Carla"로 변경한다. 그러나 firstname은 다른 메모리에 살기 때문에 여전히 원래 값을 유지한다.

### 기본 유형으로 작업할 때 `=` 연산자는 원래 변수의 복사본을 만든다.

## 참조 유형 ( Reference Type ) : Array, Object, Function

참조 유형은 다른 값을 포함 할 수 있다.

참조 유형의 내용은 변수에 사용 가능한 고정 된 양의 메모리에 맞지 않으므로 참조 유형의 메모리 내 값은 참조 자체 (메모리 주소) 이다.

참조 유형은 복합 유형 또는 컨테이너 유형이라고도 한다.

참조 유형은 원본에 alias를 만드는 것을 의미한다. 예를 들어 당신의 이름이 마가렛이지만 엄마가 당신을 호박파이라고 부르는 상황 ! 당신은 하나지만 별명이 두 개 마가렛도 당신, 호박파이도 당신

### 참조 유형 코드 예제

```jsx
var  a  =  {  c : 13  }   // 새 객체의 참조를`a`에 할당 
var  b  =  a           //`a` 내부의 객체 참조를 새 변수`b`에 복사 
b . c  =  37            //`b`가 
콘솔을 가리키는 객체의 내용을 수정합니다 . log ( a )      // => {c : 37}
```

변수 a 안에 {  c : 13  } 값이 들어있는 것이 아니라 **변수 a는 {  c : 13  } 을 가리키고 있다 (참조하고 있다) 라고 해석해야 한다.**

변수 b안에 변수 a의 값이 들어있는 것이 아니라 **변수 b는 변수 a가 가리키고 있는 {  c : 13  } 를 가르키고 있다(참조하고 있다) 라고 해석해야 한다.**

여기서 b.c 값을 변경하면 b가 가르키고 있던 { c : 13 } 이 변경되기 때문에 이를 가리키고 있던 a에도 영향을 미쳐 변경된  { c : 37 } 값이 출력된다.

```jsx
var myName = { 
  firstName : "Carlos" 
}; 
var identity = myName; 
myName.firstName = "Carla";

console.log (myName.firstName); // "Carla" 
console.log (identity.firstName); // "Carla"
```

- 변수 myName이 생성되고 속성이 있는 객체의 변수 firstName 값은 "Carlos"이다. js는 메모리 스팟 myName과 여기에 포함된 객체를 할당한다.
- 변수 identity가 생성되고 myName의 값 전용 메모리를 가리킨다.
- myName의 firstName 속성 값을 "Calors" 대신 "Carla"로 변경한다.
- myName과 firstName는 같은 값을 저장한 메모리를 가르키기 때문에 같은 값이 출력된다.

### 참조 유형으로 작업할 때 `=` 연산자는 새 객체를 만들지 않고 원래 객체 에 대한 별칭을 만든다.

### 참조 타입을 값 타입처럼 대입하기

참조 타입을 값 타임처럼 대입하기 위해서는 `Object.assign` 과 같은 함수를 사용해야 한다.

```jsx
var person = {
	name : 'sujin',
	age : 25
}
var newPerson = Object.assign({} , person)

console.log(person); // { name : "sujin" , age : 25 }
console.log(newPerson); // { name : "sujin" , age : 25 }

person.age = 24

console.log(person); // { name : "sujin" , age : 24 }
console.log(newPerson); // { name : "sujin" , age : 25 }

```

하지만 아래와 같이 **참조 타입 내부에 참조 타입이 존재**하는 경우 다른 결과를 얻을 수 도 있다.

- 참고 자바스크립트 메소드

    JSON.parse()란?

    - **parse 메소드는 string 객체를 json 객체로 변환시켜줍니다.**

    **JSON.stringify란?**

    - stringify 메소드는 json 객체를 String 객체로 변환시켜 줍니다.

```jsx
var student = {
  info: {
    firstName: 'kim',
    lastName: 'minsu',
  },
  department: 'Computer Software Engineering',
  grade: 'senior',
  graduated: false,
}
var newStudent = Object.assign({}, student)

console.log(student)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
```

위의 코드는 `Object.assign`함수를 이용해 객체를 할당했다.하지만 `student`와 `newStudent`객체 내부에 있는 `info`객체가 **같은 메모리 주소**를 가지고 있다.

`student`객체의 `info`의 `firstName`의 값을 바꾸고 확인해보았다.

```jsx
student.info.firstName = 'park'

console.log(student)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
```

`student`의 `info`의 값이 변하면서 `newStudent`의 `info`객체 또한 변하는 것을 확인할 수 있다.

`student`와 `newStudent`객체 자체의 주소는 다르지만 내부의 `info`객체의 주소가 동일하기 때문이다.이와 같이 **객체 내부에 객체**가 있을 때 **재귀 함수**를 이용하거나 `JSON`객체의 함수를 이용하면 된다.

```jsx
var student = {
  info: {
    firstName: 'kim',
    lastName: 'minsu',
  },
  department: 'Computer Software Engineering',
  grade: 'senior',
  graduated: false,
}
var newStudent = JSON.parse(JSON.stringify(student))
student.info.firstName = 'park'

console.log(student)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// 
```

`JSON.stringify`를 이용해 문자열로 바꾼후 `JSON.parse`로 다시 객체로 변환하면 된다.

### Primitive Type 과 Reference Type 의 비교 연산자

```jsx
var str1 = "Hello World";
var str2 = "Hello World";

console.log(str1 === str2); // true
```

```jsx
var obj1 = { name : "Hello World"};
var obj2 = { name : "Hello World"};

console.log(obj1 === obj2); // false
SON.stringify (obj1) === JSON.stringify (obj2) // true
```

```jsx
var obj1 = { name : "Hello World"};
var obj2 = obj1;

console.log(obj1 === obj2); // true
```

## 함수에서 기본 primitive와 객체 전달

기본 데이터 유형은 값으로 함수에 전달된다.

```jsx
var myName = "Carlos"; 
function myNameIs (aName) { 
  aName = "Carla"; 
} 
myNameIs (myName);
console.log (myName); 
```

- 출력값

객체는 참조를 통해 함수에 전달된다.

```jsx
var myName = {}; 
function myNameIs (aName) { 
  aName.firstName = "Carla"; 
} 
myNameIs (myName);
console.log (myName); 
```

- 출력값

    ```jsx
    // {firstName : "Carla"} 객체
    ```

    myNameIs 함수를 호출한 후 myName 변수에 기록하면 firstName "Carla"와 같은 값을 가진 키를 가진 객체를 기록한다. 

    객체를 함수에 전달할 때 복사본을 전달하지 않기 때문에

    myName 객체를 전달하기 때문에 함수에서 해당 개체의 속성을 변경하면 외부 범위에 있는 개체의 속성이 변경된다.

    **참조로 무언가를 전달하는 것은 객체의 복사본이 아닌 다른 것을 가리키는 무언가를 전달하는 것이다.**

    **따라서 JavaScript는 참조로 객체를 전달하므로 함수 내에서 해당 객체의 속성을 변경하면 변경 사항이 외부 범위에 반영된다.**

```jsx
var myName = { 
  firstName : "Carla" 
};

function myNameIs (aName) { 
  aName = { 
    nickName : "Carlita" 
  }; 
}

myNameIs (myName);
console.log (myName);
```

```jsx
var myName = { 
  firstName : "Carla" 
};

function myNameIs (aName) { 
  aName.nickName = "Carlita"; 
}

myNameIs (myName); 
console.log (myName);
```

- 출력값