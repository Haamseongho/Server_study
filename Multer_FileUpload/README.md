# Multer 
- 파일 업로드에 필요한 모듈 


## 사용방법
<hr />

### 1. 패키지 설치

```

     npm install multer --save 

```

<br />


### 2. 불러오기

```
 
    var multer = require("multer");

```

### cf:) View단 설정 
 
```
  <form method="post" action="/process/file" enctype="multipart/form-data">
        <table border="1">
            <tr>
                <td><label width="50px">파일 업로드 하기</label></td>
            </tr>
            <tr>
                <td><input type="text" name="cr_name" placeholder="작성자 이름"></td>
            </tr>
            <tr>
                <td><input type="file" name="file"></td>
            </tr>
            <tr>
                <td>
                    <input type="submit" value="파일 업로드" name="submit">
                </td>
            </tr>
        </table>

    </form>


``` 

★ 중요한 부분은 View단에서는 웹파일 전송방식 multipart/form-data 설정해야 한다. 

> enctype="multipart/form-data"

<br />

### 3. 저장소를 만든다.


> - 업로드 목적지 
> - 업로드 파일명
> ```


    var storage = multer.diskStorage({
         destination: function (req, file, callback) {
             callback(null, 'uploads/');
        },
         filename: function (req, file, callback) {
             callback(null, file.fieldname + '-' + Date.now());
       }
    });

```

> var upload = multer({storage: storage}).single('file'); 


- 위에 설정한 storage는 파일을 업로드 할 때에 어떤 식으로 관리할 것인지 설정하는 부분입니다.
- 위와 같이 설정한 뒤, multer의 인자로 정의해줍니다.
cf :) filename 부분을 재정의해서 파일 이름을 정리할 수 있습니다.

```

[ 예시 ]

      filename: function (req, file, callback) {
        file.uploadFile = {
            name : file.originalname
        };
        callback(null,file.uploadFile.name);
    }
   
```

- 위와 같이 진행하게 되면 파일의 원본 이름을 가지고 와서 
저장하게 된다.

```


	router.post("/process/file", upload, function (req, res, next) {
    	console.log(req.file);
    	var cr_name = req.body.cr_name;
    	var upFile = req.file;


    	/*
         DB save
    	 파일 업로드
    	 */
    	
	
    	Files.collection.insert({cr_name: cr_name, created_at: 	Date.now(), upFile: upFile}, function (err, file) {
    	    if (err) return next(err);
    	    else {
    	        console.log("insert file well");
    	        res.status(200).render("main");
    	    }
    	})
	}); 
```
- 라우터 쪽에 upload라는 미들웨어를 먼저 불러줌으로써 multer를 작동한 뒤 해당 라우터의 콜백이 진행되도록 구성합니다.
- DB를 연동해서 저장하게 된다면 관리하기에 더 좋을 것입니다.
