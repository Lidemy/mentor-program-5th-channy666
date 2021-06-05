## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<fieldset></fieldset>`  
    產生一個框框把標籤內的東西包住，可以用在表單內，有把題目分組的感覺。  
    標籤內使用 `<legend></legend>`  裡面寫標題，標題就會呈現在 fiedset 框框的左上角框線上。  
    在標籤加上 disable `<fieldset disabled></fieldset>`，裡面的表單就會被禁用，除了在 legend 標籤內的表單之外，都無法輸入答案、無法點選、無法送出。
2. `<details></details>`
    元素的前面會出現一個箭頭，用滑鼠點擊元素後可以展開跟縮起來。標籤內使用 `<summary></summary>`，裡面就是縮起來時會顯示的字，其他在 summary 標籤外的字就是展開後會顯示的字。  
    details 標籤預設是縮起來的，箭頭指向右方，展開時指向下方。若要改成一開始就是展開的狀態可以在標籤上加上 open `<details open></details>`。但需要注意的是 open 本身是布林屬性，就算加上 `open="false"`，details 還會是展開的狀態，要隱藏就需要完全移除 `open`。
3. `<meter></meter>`
    產生一個數線（進度條），顯示目前的數值與測量範圍的比例。標籤上會加上以下幾個屬性： 
    * value: 當前的數值
    * min: 測量範圍的最小值，若沒有設定即為 0
    * max: 測量範圍的最大值，若沒有設定即為 1
    * low: 最小值的上限，必須介於 min 與 high 之間，若沒有設定即等於 min
    * high: 最大值的下限，必須介於 low 與 max 之間，若沒有設定即等於 max
    * optimum: 最佳數值，或說是建議數值，一個參考的基準。
    進度條預設為綠色，有可能因為 low, high, optimum 的設定而變成黃色或紅色

## 請問什麼是盒模型（box modal）
每個 html 的元素都是一個盒模型，盒模型分為幾個部分如下：
1. **content:** 元素本身
2. **padding:** 內邊距，元素本身到邊框間的距離
3. **border:** 邊框，長在盒子的最外層。還有另一種邊框 outline，兩者差別是，border 比較像往內長邊框，不會改變元素的定位點，但是元素本身會因為加了邊框而移動（因為長寬改變了），outline 則是直接在元素的外面套上一個邊框，元素本身不會移動，後者比較不常用到
4. **padding:** 盒子跟其他盒子間的距離
補充：box-sizing
box-sizing: content box 時，設定元素的寬高是元素本身（content）的寬高，如果再加上 padding 與 border 的話，整體的寬高就會是 content + padding + border
box-sizing: border box 時，設定的寬高就會是整體 content + padding + border 的寬高，若調整 padding 或 border，系統會自動調整 content，讓整體寬高符合設定的寬高

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
1. **block:** div, h 系列, p 等標籤預設都是 block，基本上整個盒模型都可以調整，並且單個元素自己佔滿一整行不會並排，預設的陳列方式是由上往下 
2. **inline:** span, a 等標籤預設為 inline，元素會由左往右排列，寬高即為元素本身的寬高，無法另外設定。左右 padding 可以設定，上下也可以設定但不會改變元素的位置（不會影響到其他元素），而 margin 則只會作用在左右的間距。
3. **inline-block:** button, input, select 等標籤預設為 inline-block，跟 block 一樣所有東西都可以調整，只是是跟 inline 一樣由左到右並排的陳列方式。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1. **static:** 預設的定位方式，例如 block 由上往下排、inline 左往右排。
2. **relative:** 以預設的定位為原點去移動，不會動到其他元素的位置。
3. **absolute:** 往上找到 position 不是 static 的元素，以他為定位點移動。position 為 absolute 的元素會脫離排版，底下的元素會遞補上來。
4. **fixed:** 以 viewport 作定位，不管網頁滑到哪裡，都會一直在同一個位置上。
