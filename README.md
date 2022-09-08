# Planner Web



## ModelMapper

> http://modelmapper.org/
> 객체의 프로퍼티를 다른 객체의 프로퍼티로 맵핑해주는 유틸리티

`ModelMapper` 란 서로 다른 object 간의 필드 값을 자동으로 mapping 해주는 library

### 언제 사용할까?

예를들어 Springboot + jpa 로 개발할 경우 Entity 와 view layer에서 사용될 data object가 구분된다. 따라서 Entity의 값을 view layer에 전달할 경우 data object 로 새로 변환해주는 작업을 해야한다. 일반적으로 getter/setter 또는 Builder 패턴을 통하여 해당 작업을 할 경우 필드가 많을 수록 코드가 길어지고 반복적인 작업량이 늘어난다.

```java
        TestEntity testEntity = testRepository.findById("test");

        TestDto testDto = new TestDto();
        testDto.setEmail(testEntity.getEmail());
        testDto.setGender(testEntity.getGender());
        testDto.setId(testEntity.getId());
        
        // ...
        
```

**반복적인 object 간 변환을 간단하게 줄이고 싶을 때 `ModelMapper` 를 사용할 수 있다!**

### 사용법

#### 의존성 주입.

**maven**

```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>2.3.8</version>
</dependency>
```

**gradle**

```java
implementation group: 'org.modelmapper', name: 'modelmapper', version: '2.3.8'
```

#### Spring Bean 등록

매번 `ModelMapper` 를 생성하여 사용할 수 있지만, 반복적으로 여러 로직에서 사용됨으로 @Bean 으로 등록하여 사용하자.

```java
@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
```

#### 사용 방법

data 의 원본이 되는 source 와 기존 객체에 매핍할 경우 해당 객체를, 새로운 객체를 생성할 경우 생성할 객체의 class 를 전달하면 된다.

```java
TestEntity testEntity = testRepository.findById("test");
 
TestDto testDto = modelMapper.map(testEntity, TestDto.class);

// TestDto testDto = new TestDto();
// testDto.setEmail(testEntity.getEmail());
// testDto.setGender(testEntity.getGender());
// testDto.setId(testEntity.getId());
```

**추가적으로 특정 필드 skip, Null인 필드, source와 destination 객체 간의 필드가 다를 경우 등 다양한 상황에 대한 handling 방법이 있다. 해당 내용은 http://modelmapper.org/ 에서 직접 확인 해보면서 사용하는 것이 좋다.**





# REST API 제대로 알고 사용하기

> ### 목차
>
> 1. REST API의 탄생
> 2. REST 구성
> 3. REST 의 특징
> 4. REST API 디자인 가이드
> 5. HTTP 응답 상태 코드

![그림1.png](https://image.toast.com/aaaadh/alpha/2016/techblog/uADF8uB9BC1.png)

> 어느 날 뜬금없이 대학교 친구에게 전화가 왔습니다. 그러더니 ‘야, REST API가 정확히 뭐 어떤 거야? 하는 질문에 가슴에 비수가 날아와 꽂힌 듯한 느낌을 받았습니다. 며칠 전 카톡으로 요즘 보통 웹서비스들은 ‘REST API형태로 서비스를 제공한다’고 아는 척을 조금 했던 기억이 머릿속을 빠르게 스쳐 지나갔고 그 순간 대충 얼버무리며 ‘아, 그거 REST하게 클라이언트랑 서버간에 데이터를 주고 받는 방식’을 말한다며 얼렁뚱땅 마무리 지었던 기억이 납니다. 실제로 REST API의 서비스를 직접 개발도 해보고 사용도 해봤는데도 막상 설명을 하자니 어려움을 겪었던 적이 있으셨을 텐데요. 그래서 이번에 REST API에 대해 정리하게 되었습니다. 기본적인 REST API에 대한 내용 외에도 REST API를 설계하실 때 참고해야 할 몇 가지 TIP들에 대해 공유해보도록 하겠습니다.

## 1. REST API의 탄생

REST는 Representational State Transfer라는 용어의 약자로서 2000년도에 로이 필딩 (Roy Fielding)의 박사학위 논문에서 최초로 소개되었습니다. 로이 필딩은 HTTP의 주요 저자 중 한 사람으로 그 당시 웹(HTTP) 설계의 우수성에 비해 제대로 사용되어지지 못하는 모습에 안타까워하며 웹의 장점을 최대한 활용할 수 있는 아키텍처로써 REST를 발표했다고 합니다.

## 2. REST 구성

쉽게 말해 REST API는 다음의 구성으로 이루어져있습니다. 자세한 내용은 밑에서 설명하도록 하겠습니다.

- **자원(RESOURCE)** - URI
- **행위(Verb)** - HTTP METHOD
- **표현(Representations)**

## 3. REST 의 특징

#### 1) Uniform (유니폼 인터페이스)

Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말합니다.

#### 2) Stateless (무상태성)

REST는 무상태성 성격을 갖습니다. 다시 말해 작업을 위한 상태정보를 따로 저장하고 관리하지 않습니다. 세션 정보나 쿠키정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 들어오는 요청만을 단순히 처리하면 됩니다. 때문에 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순해집니다.

#### 3) Cacheable (캐시 가능)

REST의 가장 큰 특징 중 하나는 HTTP라는 기존 웹표준을 그대로 사용하기 때문에, 웹에서 사용하는 기존 인프라를 그대로 활용이 가능합니다. 따라서 HTTP가 가진 캐싱 기능이 적용 가능합니다. HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능합니다.

#### 4) Self-descriptiveness (자체 표현 구조)

REST의 또 다른 큰 특징 중 하나는 REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다는 것입니다.

#### 5) Client - Server 구조

REST 서버는 API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로간 의존성이 줄어들게 됩니다.

#### 6) 계층형 구조

REST 서버는 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있고 PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있게 합니다.

## 4. REST API 디자인 가이드

REST API 설계 시 가장 중요한 항목은 다음의 2가지로 요약할 수 있습니다.

**첫 번째,** URI는 정보의 자원을 표현해야 한다.
**두 번째,** 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

다른 것은 다 잊어도 위 내용은 꼭 기억하시길 바랍니다.

### 4-1. REST API 중심 규칙

------

#### 1) URI는 정보의 자원을 표현해야 한다. (리소스명은 동사보다는 명사를 사용)

```
    GET /members/delete/1
```

위와 같은 방식은 REST를 제대로 적용하지 않은 URI입니다. URI는 자원을 표현하는데 중점을 두어야 합니다. delete와 같은 행위에 대한 표현이 들어가서는 안됩니다.

#### 2) 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)로 표현

위의 잘못 된 URI를 HTTP Method를 통해 수정해 보면

```
    DELETE /members/1
```

으로 수정할 수 있겠습니다.
회원정보를 가져올 때는 GET, 회원 추가 시의 행위를 표현하고자 할 때는 POST METHOD를 사용하여 표현합니다.

**회원정보를 가져오는 URI**

```
    GET /members/show/1     (x)
    GET /members/1          (o)
```

**회원을 추가할 때**

```
    GET /members/insert/2 (x)  - GET 메서드는 리소스 생성에 맞지 않습니다.
    POST /members/2       (o)
```

**[참고]HTTP METHOD의 알맞은 역할**
POST, GET, PUT, DELETE 이 4가지의 Method를 가지고 CRUD를 할 수 있습니다.

| METHOD |                             역할                             |
| :----: | :----------------------------------------------------------: |
|  POST  |     POST를 통해 해당 URI를 요청하면 리소스를 생성합니다.     |
|  GET   | GET를 통해 해당 리소스를 조회합니다. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다. |
|  PUT   |             PUT를 통해 해당 리소스를 수정합니다.             |
| DELETE |              DELETE를 통해 리소스를 삭제합니다.              |

다음과 같은 식으로 URI는 자원을 표현하는 데에 집중하고 행위에 대한 정의는 HTTP METHOD를 통해 하는 것이 REST한 API를 설계하는 중심 규칙입니다.

### 4-2. URI 설계 시 주의할 점

------

#### 1) 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용

```
    http://restapi.example.com/houses/apartments
    http://restapi.example.com/animals/mammals/whales
```

#### 2) URI 마지막 문자로 슬래시(/)를 포함하지 않는다.

URI에 포함되는 모든 글자는 리소스의 유일한 식별자로 사용되어야 하며 URI가 다르다는 것은 리소스가 다르다는 것이고, 역으로 리소스가 다르면 URI도 달라져야 합니다. REST API는 분명한 URI를 만들어 통신을 해야 하기 때문에 혼동을 주지 않도록 URI 경로의 마지막에는 슬래시(/)를 사용하지 않습니다.

```
    http://restapi.example.com/houses/apartments/ (X)
    http://restapi.example.com/houses/apartments  (0)
```

#### 3) 하이픈(-)은 URI 가독성을 높이는데 사용

URI를 쉽게 읽고 해석하기 위해, 불가피하게 긴 URI경로를 사용하게 된다면 하이픈을 사용해 가독성을 높일 수 있습니다.

#### 4) 밑줄(_)은 URI에 사용하지 않는다.

글꼴에 따라 다르긴 하지만 밑줄은 보기 어렵거나 밑줄 때문에 문자가 가려지기도 합니다. 이런 문제를 피하기 위해 밑줄 대신 하이픈(-)을 사용하는 것이 좋습니다.(가독성)

#### 5) URI 경로에는 소문자가 적합하다.

URI 경로에 대문자 사용은 피하도록 해야 합니다. 대소문자에 따라 다른 리소스로 인식하게 되기 때문입니다. RFC 3986(URI 문법 형식)은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정하기 때문이지요.

```
    RFC 3986 is the URI (Unified Resource Identifier) Syntax document
```

#### 6) 파일 확장자는 URI에 포함시키지 않는다.

```
    http://restapi.example.com/members/soccer/345/photo.jpg (X)
```

REST API에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 URI 안에 포함시키지 않습니다. Accept header를 사용하도록 합시다.

```
    GET / members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg
```

### 4-3. 리소스 간의 관계를 표현하는 방법

------

REST 리소스 간에는 연관 관계가 있을 수 있고, 이런 경우 다음과 같은 표현방법으로 사용합니다.

```
    /리소스명/리소스 ID/관계가 있는 다른 리소스명

    ex)    GET : /users/{userid}/devices (일반적으로 소유 ‘has’의 관계를 표현할 때)
```

만약에 관계명이 복잡하다면 이를 서브 리소스에 명시적으로 표현하는 방법이 있습니다. 예를 들어 사용자가 ‘좋아하는’ 디바이스 목록을 표현해야 할 경우 다음과 같은 형태로 사용될 수 있습니다.

```
    GET : /users/{userid}/likes/devices (관계명이 애매하거나 구체적 표현이 필요할 때)
```

### 4-4. 자원을 표현하는 Colllection과 Document

------

Collection과 Document에 대해 알면 URI 설계가 한 층 더 쉬워집니다. DOCUMENT는 단순히 문서로 이해해도 되고, 한 객체라고 이해하셔도 될 것 같습니다. 컬렉션은 문서들의 집합, 객체들의 집합이라고 생각하시면 이해하시는데 좀더 편하실 것 같습니다. 컬렉션과 도큐먼트는 모두 리소스라고 표현할 수 있으며 URI에 표현됩니다. 예를 살펴보도록 하겠습니다.

```
    http:// restapi.example.com/sports/soccer
```

위 URI를 보시면 sports라는 컬렉션과 soccer라는 도큐먼트로 표현되고 있다고 생각하면 됩니다. 좀 더 예를 들어보자면

```
    http:// restapi.example.com/sports/soccer/players/13
```

sports, players 컬렉션과 soccer, 13(13번인 선수)를 의미하는 도큐먼트로 URI가 이루어지게 됩니다. 여기서 중요한 점은 **컬렉션은 복수**로 사용하고 있다는 점입니다. 좀 더 직관적인 REST API를 위해서는 컬렉션과 도큐먼트를 사용할 때 단수 복수도 지켜준다면 좀 더 이해하기 쉬운 URI를 설계할 수 있습니다.

## 5. HTTP 응답 상태 코드

마지막으로 응답 상태코드를 간단히 살펴보도록 하겠습니다. 잘 설계된 REST API는 URI만 잘 설계된 것이 아닌 그 리소스에 대한 응답을 잘 내어주는 것까지 포함되어야 합니다. 정확한 응답의 상태코드만으로도 많은 정보를 전달할 수가 있기 때문에 응답의 상태코드 값을 명확히 돌려주는 것은 생각보다 중요한 일이 될 수도 있습니다. 혹시 200이나 4XX관련 특정 코드 정도만 사용하고 있다면 처리 상태에 대한 좀 더 명확한 상태코드 값을 사용할 수 있기를 권장하는 바입니다.
상태코드에 대해서는 몇 가지만 정리하도록 하겠습니다.

| 상태코드 |                                                              |
| :------: | :----------------------------------------------------------: |
|   200    |            클라이언트의 요청을 정상적으로 수행함             |
|   201    | 클라이언트가 어떠한 리소스 생성을 요청, 해당 리소스가 성공적으로 생성됨(POST를 통한 리소스 생성 작업 시) |

| 상태코드 |                                                              |
| :------: | :----------------------------------------------------------: |
|   400    |    클라이언트의 요청이 부적절 할 경우 사용하는 응답 코드     |
|   401    | 클라이언트가 인증되지 않은 상태에서 보호된 리소스를 요청했을 때 사용하는 응답 코드 |
|          | (로그인 하지 않은 유저가 로그인 했을 때, 요청 가능한 리소스를 요청했을 때) |
|   403    | 유저 인증상태와 관계 없이 응답하고 싶지 않은 리소스를 클라이언트가 요청했을 때 사용하는 응답 코드 |
|          | (403 보다는 400이나 404를 사용할 것을 권고. 403 자체가 리소스가 존재한다는 뜻이기 때문에) |
|   405    | 클라이언트가 요청한 리소스에서는 사용 불가능한 Method를 이용했을 경우 사용하는 응답 코드 |

| 상태코드 |                                                              |
| :------: | :----------------------------------------------------------: |
|   301    | 클라이언트가 요청한 리소스에 대한 URI가 변경 되었을 때 사용하는 응답 코드 |
|          |  (응답 시 Location header에 변경된 URI를 적어 줘야 합니다.)  |
|   500    |          서버에 문제가 있을 경우 사용하는 응답 코드          |





## DTO란?

> DTO (Data Transfer Object)
> 계층 간 데이터 전송을 위한 객체

- 로직을 갖고 있지 않은 순수한 데이터 객체
- Request용 DTO의 경우 @NotEmpty, @Size 등 어노테이션을 이용해 입력값을 검증할 수 있음
- Response DTO의 경우 Setter 사용하지 않고, 생성자를 통해 값을 할당





https://jojoldu.tistory.com/407



https://velog.io/@mooh2jj/%EC%98%AC%EB%B0%94%EB%A5%B8-%EC%97%94%ED%8B%B0%ED%8B%B0-Builder-%EC%82%AC%EC%9A%A9%EB%B2%95

JPA Builder

시간나면 ModelMapper >>> MapStruct로 바꾸기

https://mangchhe.github.io/spring/2021/01/25/ModelMapperAndMapStruct/





토큰 >>https://mangkyu.tistory.com/55



왜 dto에 no 랑 all 어노테이션 달아야 저게 됐을까

---



### Mock

\- **Mock**이라는 단어를 사전에서 찾아보면 '테스트를 위해 만든 모형'을 의미한다.

\- 테스트를 위해 실제 객체와 비슷한 모의 객체를 만드는 것을 모킹(Mocking)이라고 하며, 모킹한 객체를 메모리에서 얻어내는 과정을 목업(Mock-up)이라고 한다.

 

\- 객체를 테스트하기 위해서는 당연히 테스트 대상 객체가 메모리에 있어야 한다.하지만 생성하는 데 복잡한 절차가 필요하거나 많은 시간이 소요되는 객체는 자주 테스트하기 어렵다. 또는 웹 애플리케이션의 컨트롤러처럼 WAS나 다른 소프트웨어의 도움이 반드시 필요한 객체도 있을 수 있다. 이런 복잡한 객체는 당연히 테스트 과정도 복잡하고 어려울 수 밖에 없다.

 

\- 따라서 테스트 하려는 실제 객체와 비슷한 **가짜 객체**를 만들어서 테스트에 필요한 기능만 가지도록 모킹을 하면 테스트가 쉬워진다.

\- 테스트하려는 객체가 복잡한 의존성을 가지고 있을 때, 모킹한 객체를 이용하면, 의존성을 단절시킬 수 있어서 쉽게 테스트할 수 있다.

\- 웹 애플리케이션에서 컨트롤러를 테스트할 때, 서블릿 컨테이너를 모킹하기 위해서는 **@WebMvcTest**를 사용하거나 **@AutoConfigureMockMvc**를 사용하면 된다.

 

\- 웹 환경에서 컨트롤러를 테스트하려면 반드시 서블릿 컨테이너가 구동되고 DispatcherServlet 객체가 메모리에 올라가야 하지만, 서블릿 컨테이너를 모킹하면 실제 서블릿 컨테이너가 아닌 테스트용 모형 컨테이너를 사용하기 때문에 간단하게 컨트롤러를 테스트할 수 있다.



---

**@WebMvcTest**

\- @Controller, @RestController가 설정된 클래스들을 찾아 메모리에 생성한다. 

\- @Service나 @Repository가 붙은 객체들은 테스트 대상이 아닌 것으로 처리되기 때문에 생성되지 않는다.

\- @WebMvcTest가 설정된 테스트 케이스에서는 서블릿 컨테이너를 모킹한 MockMvc타입의 객체를 목업하여 컨트롤러에 대한 테스트코드를 작성할 수 있다.

\- @WebMvcTest 어노테이션을 사용하면 MVC 관련 설정인 @Controller, @ControllerAdvice, @JsonComponent와 Filter, WebMvcConfigurer, HandlerMethodArgumentResolver만 로드되기 때문에, 실제 구동되는 애플리케이션과 똑같이 컨텍스트를 로드하는 @SpringBootTest 어노테이션보다 가볍게 테스트 할 수 있다.



#### @AutoConfigureMockMvc 사용하기 

\- @AutoConfigureMockMvc는 @WebMvcTest와 비슷하게 사용할 수 있는 어노테이션이다.

\- @SpringBootTest에는 웹 애플리케이션 테스트를 지원하는 **webEnvironment** 속성이 있다. 이 속성을 생략하면 기본값으로 WebEnvironment.MOCK이 설정되어 있는데, 이 설정에 의해서 서블릿 컨테이너가 모킹된다.

\- @SpringBootTest(webEnvironment=WebEnvironment.MOCK) 설정으로 모킹한 객체를 의존성 주입받으려면 **@AutoCOnfigureMockMvc**를 클래스 위에 추가 해야한다.



**@AutoConfigureMockMvc**

\- @WebMvcTest와 가장 큰 차이점은은 컨트롤러뿐만 아니라 테스트 대상이 아닌 **@Service**나 **@Repository**가 **붙은 객체들도 모두 메모리에 올린다는 것이다.**

\- 간단하게 테스트하기 위해서는 @AutoConfigureMockMvc가 아닌 @WebMvcTest를 사용해야 한다.

\- @WebMvcTest는 @SpringBootTest와 같이 사용될 수 없다. 왜냐하면 각자 서로의 MockMvc를 모킹하기 때문에 충돌이 발생하기 때문이다.

 



## @SpringBootTest

@SpringBootTest를 사용하면 손쉽게 통합 테스트를 위한 환경을 준비해준다. @SpringBootTest는 모든 빈들을 스캔하고 애플리케이션 컨텍스트를 생성하여 테스트를 실행한다. @SpringBootTest의 어노테이션에는 다양한 값을 줄 수 있는데, 이를 살펴보면 다음과 같다.

value와 properties: 애플리케이션 실행에 필요한 프로퍼티를 key=value 형태로 추가할 수 있음
args: 애플리케이션의 arguments로 값을 전달할 수 있음
classes: 애플리케이션을 로딩할 때 사용되는 컴포넌트 클래스들을 정의할 수 있음
webEnvironment: 웹 테스트 환경을 설정할 수 있음

`@RunWith`는 JUnit의 테스트 러너를 확장하는 방법 중 하나로 커스텀 테스트 러너를 설정해주는 방법이다. 테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자를 실행시킨다. 위 코드에서는 **SpringRunner.class**를 설정했기 때문에 SpringRunner라는 스프링 실행자를 사용한다. 이처럼 `@RunWith`는 스프링 부트 테스트와 JUnit 사이에서 연결자 역할을 한다.

💡 JUnit5 부터는 `@RunWith`을 사용하지 않는데 그 이유에 대해서는 기선님이 작성하신 [스프링 부트, @RunWith가 더 이상 보이지 않는 이유](https://www.whiteship.me/springboot-no-more-runwith/)를 참고하자.

`@SpringBootTest`는 `@RunWith`과 함께 사용해야한다. 이 애노테이션에는 **webEnvironment**라는 속성이 있는데 이 속성의 기본 값은 **MOCK**으로 되어있다. 속성의 값은 다음과 같다.

- MOCK : mock servlet environment. 내장 톰캣을 사용하지 않음.
- RANDOM_PORT / DEFINED_PORT : 내장 톰캣을 사용함.
- NONE: 서블릿 환경을 제공하지 않음.

여기서 사용하는 Mock에 대해서 조금 더 알아보자.

## Mock 타입 테스트

  Mock 타입은 Servlet Container(톰캣, jetty 등등)를 테스트용으로 띄우지 않고, Mockup[1](https://yadon079.github.io/2021/spring boot/boot-test#fn:1)을 해서 Servlet을 Mocking[2](https://yadon079.github.io/2021/spring boot/boot-test#fn:2)한 것을 띄워준다. dispatcherServlet이 생성은 되지만 Mockup이 되기 때문에, dispatcherServlet에 요청을 보낸 것**‘처럼’** 테스트를 할 수 있다. 이 때 mockup 된 Servlet과 상호작용을 하려면 MockMVC라는 클라이언트를 사용해야 한다.

MockMVC라는 클라이언트를 사용하려면 `@AutoConfigureMockMvc` 애노테이션을 추가하고 `@Autowired`를 사용해서 주입받는 방법이 가장 쉽다. 이 외에도 여러가지 방법이 있는데 스프링 부트 최신 버전에서 MockMVC를 만드는 방법은 애노테이션을 추가하는 것이 가장 쉽다.

### @Transactional





























---

기본 셋팅

```
sudo apt update
sudo apt install openjdk-18-jdk

# 도커 다운로드
curl -fsSL https://get.docker.com/|sudo sh
# 도커 권한 설정, 컨테이너 두개 이상일경우 연결시키고 유기적으로 활용할려면 필요함 compose 사용하기때문에
sudo usermod -aG docker $USER

#docker-django 디렉토리에서 docker compose 다운로드
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```







Dockerfile

```
FROM openjdk:18-jdk-alpine
ARG JAR_FILE=./*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

docker-compose.yml

```
version: '3'
services:
  spring-app:
      container_name: spring-app
      image: docker/spring
      ports:
       - "8080:8080"
  nginx:
      container_name: nginx
      image: docker/nginx
      ports:
       - "80:80"
      depends_on:
       - spring-app
```

Nginx/Dockerfile

```
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx-app.conf  /etc/nginx/conf.d/app.conf
COPY nginx.conf  /etc/nginx/nginx.conf

VOLUME ["/data", "/etc/nginx", "/var/log/nginx"]

WORKDIR /etc/nginx

CMD ["nginx"]
```

nginx-app.conf

```
server {
    listen       80;
    listen      [::]:80;

    server_name  "";

    access_log off;

    location / {
            proxy_pass http://[ec2 ip]:8080;
    	    proxy_set_header Host $host:$server_port;
            proxy_set_header X-Forwarded-Host $server_name;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

}
```

nginx.conf

```
daemon off;
user  www-data;
worker_processes  2;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
    use epoll;
    accept_mutex off;
}

http {
    include       /etc/nginx/mime.types;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    client_max_body_size 300m;
    client_body_buffer_size 128k;

    gzip  on;
    gzip_http_version 1.0;
    gzip_comp_level 6;
    gzip_min_length 0;
    gzip_buffers 16 8k;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/xml application/xml+rss application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";
    gzip_vary on;

    include /etc/nginx/conf.d/*.conf;
}
```



### Object Mapper

https://velog.io/@zooneon/Java-ObjectMapper%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-JSON-%ED%8C%8C%EC%8B%B1%ED%95%98%EA%B8%B0





### postgre 모든 테이블 삭제하기

```
DROP SCHEMA public CASCADE;
 CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
 GRANT ALL ON SCHEMA public TO public;
```





#### JSON

https://umanking.github.io/2021/07/24/jackson-localdatetime-serialization/





### Mock TEST

https://ktko.tistory.com/entry/%EC%8A%A4%ED%94%84%EB%A7%81Spring-MockMvc-%ED%85%8C%EC%8A%A4%ED%8A%B8

https://bomz.tistory.com/29

https://itmore.tistory.com/entry/MockMvc-%EC%83%81%EC%84%B8%EC%84%A4%EB%AA%85

https://velog.io/@geesuee/Spring-Spring-Boot-MockMvc

https://yadon079.github.io/2021/spring%20boot/boot-test

https://elevatingcodingclub.tistory.com/61

https://we1cometomeanings.tistory.com/65

https://mangkyu.tistory.com/144





## Jenkins 설치

```
sudo apt update
sudo apt install openjdk-18-jdk

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
    
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
    
sudo apt-get update
sudo apt-get install fontconfig openjdk-11-jre
sudo apt-get install jenkins
```

https://gksdudrb922.tistory.com/195

https://abbo.tistory.com/184

### Junkins 실행

```
sudo vi /usr/lib/systemd/system/jenkins.service
```



```
sudo systemctl daemon-reload
sudo systemctl start jenkins
sudo systemctl status jenkins
```

--시작

sudo service jenkins start

 

--종료

sudo service jenkins stop

 

--restart

sudo service jenkins restart



