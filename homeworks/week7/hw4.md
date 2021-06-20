## 什麼是 DOM？
DOM(Document Object Model) 文件物件模型，是一個把 document 轉換成 object 的模型。例如把瀏覽器看的 html 文件變成類似樹狀結構的物件，每個樹幹樹枝的連接處都是一個節點，代表 html 文件中的各個標籤、屬性、內容等等。  
html 文件變成樹狀結構的物件後就可以很方便的存取文件中每一個節點，並使用其他的程式語言來操作 html 文件（改變內容風格、做事件處理等等）。
## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
當有事件發生時，會先從根節點（以瀏覽器來說的話就是 window ）沿著 html 結構一層一層往下傳遞到發生事件的元素（target）為止，事件傳遞到 target 後會再往上一層一層傳回到根節點，才結束一個事件的傳遞。  
事件從根節點往下傳到 target 的過程就是處於捕獲階段，從 target 往上傳回 window 的過程則是冒泡階段。
## 什麼是 event delegation，為什麼我們需要它？
event delegation 事件代理，事件傳遞的順序是先從最上層根節點開始往下傳到發生事件的元素，再往上傳回到根節點，所以上層的元素都會知道自己下層的元素發生事件了。只要監聽上層元素，就等於是監聽了底下所有的元素，除了不用各別監聽下層所有元素以節省資源外，對於動態新增的元素，只要是在監聽元素的下層，也會被監聽到，不用再另外掛上監聽器。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
event.preventDefault() 是阻止瀏覽器的預設行為，例如阻止表單送出、阻止超連結，但是事件還是一樣會傳遞下去  
event.stopPrepagation() 停止事件傳遞下去
舉例如下
```html
<div class="box">
  box
  <div>
    <a href="https://google.com" target="_blank" class="link">google</a>
  </div>
</div>
```

放上三個監聽器  
監聽器 1
``` javascript
// 發生點擊事件時，若偵測到 .box 元素處於捕獲階段，印出 click1
document.querySelector('.box').addEventListener('click', 
  function(event) {
    console.log('click1!')
  }, true
)
```

監聽器 2
``` javascript
// 發生點擊事件時，若偵測到 .box 元素處於冒泡階段，印出 click2
document.querySelector('.box').addEventListener('click', 
  function(event) {
    console.log('click2!')
  }, false
)
```

監聽器 3
``` javascript
document.querySelector('.link').addEventListener('click', 
  function(event) {
    event.preventDefault()
  }
)
```

當點擊超連結（.link）時，位於上層的 `.box` 會先進入捕獲階段，印出 `ckick1`。往下傳遞到 target(`.link`) 時，監聽器 3 的 `event.preventDefault()` 會阻止瀏覽器連過去 google 網站的動作，但是並不會阻止事件傳遞，事件從 `.link` 再往上傳遞回去，`.box` 進入冒泡階段，印出 `click2`。 
若把監聽器 3 改成 `event.stopPropagation()`，上層的 `.box` 一樣會先進入捕獲階段印出 `click1`，往下傳 `.link` 接到點擊事件而開啟新分頁到 google 網站，也同時把事件攔截下來不繼續傳遞，所以 `.box` 並不會冒泡、不會印出 `click2`。