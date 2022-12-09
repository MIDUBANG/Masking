# 🚀 Masking Personal Information in Image with Tesseract.js 
Tesseract.js를 이용해 이미지 속 개인정보를 자동으로 마스킹하는 사이트

## Demo
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/81161750/206628583-9137df92-e3eb-4255-841d-41d651c3cbc0.gif)


## URL 
<img src="https://img.shields.io/badge/Netlify-blue?style=for-the-badge&logo=Netlify&logoColor=white"> https://masking.netlify.app/ 

<br>
<br>


## 🚀 Run Project
```
git clone
```

## 🚀 Stacks

#### Tesseract.js OCR
![image](https://user-images.githubusercontent.com/81161750/206629972-46f80d54-f4d1-43cf-8e2e-7949a86c88ab.png)
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/81161750/206630346-e008731c-8afe-45a9-84cd-91327ea48ef6.gif)
* reference : https://tesseract.projectnaptha.com/

<br>
<br>

#### ETC
<img src="https://img.shields.io/badge/Netlify-blue?style=for-the-badge&logo=Netlify&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">  


<br>
<br>




### 🚀 Modul Script 

#### 1. CDN 
```
<script src="https://unpkg.com/tesseract.js@2.1.4/dist/tesseract.min.js"></script>
```


#### 2. Code related to Tesseract
```
const { createWorker } = Tesseract;
   
var status = document.querySelector(".loading");
var progress = document.querySelector(".progress");

      const recognize = async (file) => {
        const {
          data: { text },
        } = await Tesseract.recognize(file, "kor", {
          corePath:
            "https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js",
          logger: (m) => console.log(m),
        });
        console.log(text);
        result = text;
      };

      const worker = createWorker({
        logger: (m) => {
          console.log(m);
          if (m.status === "recognizing text") {
            status.innerHTML = "분석 중...";
            progress.innerHTML = Math.floor(m.progress * 100) + "%";

            if (m.progress === 1) {
              status.innerHTML = "분석 완료✨";
              progress.innerHTML = "";
            }
          } else {
            status.innerHTML = "이미지 전송 중, 기다려주세요!!";
          }
        },
      });


      const sendFile = async () => {
        console.log("성공", elm.files[0]);
        await worker.load();
        await worker.loadLanguage("kor");
        await worker.initialize("kor");
        const { data } = await worker.recognize(elm.files[0]);
        await worker.terminate();
        result(data);
      };

```

#### 3. Personal information extraction
```
      const findInfomation = (data) => {
        var phone = /\d{3}-\d{4}-\d{4}/;
        var id =
          /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-4]\d{6}/;

        var result_phone = [];
        var result_id = [];

        data.words.map((word) => {
          if (word.text.match(phone)) {
            result_phone.push(word);
          }

          if (word.text.match(id)) {
            result_id.push(word);
          }
        });

        if (result_phone) {
          console.log("폰 번호 : ", result_phone);
          result_phone.map((res) => {
            console.log("좌표는 : ", res.line.bbox);
            var { x0, y0, x1, y1 } = res.line.bbox;
            draw(x0, y0, x1, y1);
          });
        }

        if (result_id) {
          console.log("주민등록번호 :", result_id);
          result_id.map((res) => {
            console.log("좌표는 : ", res.line.bbox);
            var { x0, y0, x1, y1 } = res.line.bbox;
            draw(x0, y0, x1, y1);
          });
        }
      };
```

#### 4. Drawing masking with canvas

```
      function draw(x0, y0, x1, y1) {
        var start_x = x0;
        var start_y = y0;
        var width = x1 - x0;
        var height = y1 - y0;

        ctx.fillStyle = "rgb(0,0,0,1)";

        ctx.fillRect(start_x * B, start_y * B, width * B, height * B);
      }
```
