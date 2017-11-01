# FCM Cloud Messaging

<hr />

## FCM 앱서버 등록 

-------

###1. Google이 제공하는 FCM 연결 서버 
    - HTTP , XMPP 용 프로토콜을 활용하여 클라이언트 앱으로 메세지를 보낸다. 
    - 앱 서버 --> (HTTP or XMPP 프로토콜) --> FCM 연결 서버 --> 클라이언트 앱 

: 그렇기 때문에 클라이언트와 서버 둘 다 구현이 되어야 한다.

(Admin Node.js SDK의 FCM api를 사용하여 메시지 보내기)

<br />
---
### 2.  앱서버 역할 

- 클라이언트와 통신
- FCM 연결 서버에 올바른 형식이 지정된 요청 보내기
- 서버 기반의 서버 응답코드를 보내는 지수 백오프 알고리즘을 활용하여 요청 처리 후 다시 보낸다
- 서버 키와 클라이언트 등록 토큰을 안전하게 관리할 수 있다 ( 클라이언트 코드에는 서버 키가 포함 되어선 안된다 )
- XMPP 프로토콜인 경우 메세지 ID를 생성할 수 있어야 한다 ( 메세지 고유 내용 정리 --> 식별자로 활용 )

---
### 3.  프로토콜 활용 

### HTTP 
--
- 클라우드에서 기기로 전송하는 다운스트림 전용 최대 데이터는 4KB
- 동기 메시징 방식 / 앱 서버가 HTTP POST 요청으로 메세지를 보내고 응답을 기다린다
- 응답이 수신될 때 까지 발신자가 다른 메세지를 보내지 못하도록 차단

### XMPP

- 기기에서 클라우드로 전송하는 업스트림과 클라우드에서 기기로 전송하는 다운스트림을 지원하며 최대 데이터는 4KB이다
- 비동기 메시징 방식 / 앱 서버가 XMPP 연결을 통해 최대 회전 속도로 모든 기기에서 양방향으로 메세지를 주고 받는다
- 비동기방식으로 연결 서버 확인과 실패 알림을 보낸다
- 확인 형식은 JSON으로 인코딩 되어 있으며 ACK 와 NACK를 통하여 잘 받았는지 잘 받지 못했는지 확인할 수 있다


### 인증

메세지 요청 ( HTTP Header / HTTP Body )

- HTTP Header
    - Authoriation : 서버키 등록 하는 부분 
    - Content-Type : (JSON) == application/json / (Text) == application/x-www-form-urlencoded;charset=UTF-8 

cf : ) Content-Type 생략할 경우 일반 텍스트로 간주한다


---

### 서버 키 유효성 확인
( Android에 입력할 것 )

```

     #api_key = 서버키 
     # curl -- header "Authorization: key=$api_key" \
            -- header Content-Type:"application/json" \
            https://fcm.googleapis.com/fcm/send \ 
            -d "{\"registration_ids\":[\"ABC\"]}" 

```

401에러 : 서버 키가 유효하지 않은 