## 為什麼我們需要 React？可以不用嗎？

React 是一個用來實作使用者介面的 JavaScript library，搭配其他的 library 一起使用，
就差不多是一個完整的框架。
開發者透過 React 的 state, props, component 等概念，可以更順利的製作有良好效能與擴充性的使用者介面。（但是我沒有其他框架的任何經驗，無從比較 QQ，只是就目前學習的感覺好像是滿方便的...）

不過 React 也就是一個做使用者介面的工具，還是有很多其他的框架、甚至不用任何框架就可以做出使用者介面，應該根據需求決定要使用什麼工具，不一定要是 React。

## React 的思考模式跟以前的思考模式有什麼不一樣？

以前主要是想想要呈現什麼樣的畫面，再去操作 DOM 元素，讓他們變成自己想要的樣子，畫面的呈現跟內含的資料大致上是綁再一起的。頂多需要拿取或改變資料的時候再把資料抽出來或再根據資料去改變 DOM 元素。

React 就是把畫面跟資料分開，畫面根據資料而產生，資料更新時，畫面就會跟著變化。這樣專注在管理資料上，畫面再從資料而生不用再自己去改變畫面，也可以確保當前的資料與呈現出來的畫面是一致的。

## state 跟 props 的差別在哪裡？

props 跟 state 都是帶有資訊的，component 也都可能會因為這些資訊而 render 出相對應的畫面。
只不過 props 是從 parent component 繼承而來，component 本身不能主動去改變 props（ component 可以設定自己的 props 的預設值，只是一旦有接受到 parent 給的 props，就會被蓋過去）
而 state 是 component 可以自由操作的（新增、設定預設值、修改等等），存在 component 內部，一般不會被 parent 或 child component 操縱（除了 parent 設定 child 的初始值，或是把 state 用 props、useContent 的方式傳下去）。state 通常用於存放與使用者互動相關的資料，會比較頻繁的被改變、更新。
