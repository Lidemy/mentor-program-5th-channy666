## 請以自己的話解釋 API 是什麼
API(Application Programming Interface, 應用程式介面) 是一個提供資料交換的管道。  
提供資料的一方制定取得資料的規則（API 文件），包含取得資料的方式、對象（身份驗證）、要提供的資料等等。  
想要取得資料的一方則是依據 API 文件，遵守提供資料方制定的規則，透過 API 發出 request，向提供資料方取得資料後得到 response。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. **102** Processing: 伺服器已收到 request 且正在處理中，目前還沒有回應。若伺服器處理 request 的過程會超過 20 秒，即會發送 status code 102，告知使用者不是連線有問題，只是目前正在處理中而且會有點久，稍後處理完再給你 response。 [參考資料](https://datatracker.ietf.org/doc/html/rfc2518#section-10)
2. **300** Multiple Choice: 發出的 request 得到了一個以上的 response，應該要從中選一並重新導向過去。 [參考資料](https://datatracker.ietf.org/doc/html/rfc7231#section-6.4.1)
3. **410** Gone: 使用者發出 request 的目標已從伺服器上刪除，且很可能是永久的。（若無法判定是否為永久的，則會顯示 status code 404 NotFound）[參考資料](https://httpwg.org/specs/rfc7231.html#status.410)
4. **418** I'm a teapot: 想用茶壺煮咖啡時會得到的錯誤代碼。雖然 I'm a teapot 只出現在 HTCPCP 協定中而非 HTTP 的標準，還是想記錄一下這個有趣的 status code。 [參考資料](https://blog.techbridge.cc/2019/06/15/iam-a-teapot-418/)


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

> 這是一個存放餐廳資訊的平台，提供所有人查詢、新增、刪除、修改餐廳的資訊。

**Base URL: https://findTaiwanRestaurant.com**
|說明 | Method | Paths | 參數 | 範例 |
|---- |--------|------|-------|--------|
|所有餐廳資料 | GET | /giveMeFood | _limit: 限制回傳資料數量 | /giveMeFood?_limit=10 |
|單一餐廳資料 | GET | /giveMefood/:id | 無 | /giveMeFood/1 |
|新增餐廳資料 | POST | /giveMeFood | name: 餐廳名稱 | 無 |
|刪除餐廳資料 | DELETE | /giveMeFood/:id | 無 | 無 |
|修改餐廳名稱 | PATCH | /giveMeFood/:id | name: 餐廳名稱 | 無 | 

**Response Example**
```
https://findTaiwanRestaurant.com/giveMeFood?_limit=2

[
  {
    "id": 1,
    "name": "麥當勞-台北民生店",
    "address": "105台北市松山區民生東路三段135號",
    "tel": "02 27130715",
    "googleRate": 4.0
  },
  {
    "id": 2,
    "name": "創咖啡 TRUST CAFÉ",
    "address": "104台北市中山區民權東路三段60巷7號",
    "tel": "02 25083880",
    "googleRate": 4.4
  }
]
```
