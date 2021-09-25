## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS(Domain Name System) 網域名稱系統，對應域名與 IP 位址的系統。域名（網址）對人類來說較好閱讀與記憶，電腦則是比較擅長處理由數字組成的 IP 位址，因此需要一個系統紀錄域名與 IP 的對應關係，方便雙方溝通使用。  
在瀏覽器輸入網址，或是點擊連結時都時會非常頻繁的使用到 DNS 服務，Google 提供公開的 DNS 可以得到使用者造訪網站的資訊，可以分析、利用這些數據或是賣給別人。而對使用者來說，google 的 DNS IP 位址方便好記，越多人使用 cache 資料就越齊全，造訪網站時速度就更快。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
當有一個以上的 transaction 同時進行時可能會相互影響，例如改動到同一筆資料、讀取到改動前的錯誤資料等等，因此在 transaction 開始時先把資料庫中需要更動到的 role 或是 table lock 起來，讓其他的 transaction 無法更動、甚至無法讀取資料，等到 transaction 結束後才會解開讓下一個 transaction 使用資料，以確保每一筆 transaction 都是一致且隔離的（過程中資料庫的資料是正確的，且不會被其他 transaction 影響到）。
不過如果所需要用到的資料被 lock 住，就需要等前一筆 transaction 結束，勢必會犧牲一些效能、降低使用者的體驗感受。

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL 與 SQL 都是用來存放資料的，SQL 是關連式的資料庫，有事先制定好各個 role 的 table（包含名稱、資料類型、大小等等），需要依照設定好的架構存入資料。也因為資料庫的一致性，要取得 table 間相互關聯的資料很容易，SQL 語法也是清楚明瞭，在新增或是修改資料上很方便。  
NoSQL(Not Only SQL) 則是非關連式的資料庫，資料的存入像 JSON 格式那樣，採用 `key: value` 的形式，資料庫沒有特定的結構，每一筆資料之間也沒有關連性，可以任意切割或調整，也可以分散到不同的伺服器中建立副本，擴充性非常高，適合存放很大量的資料，但是資料就比較缺乏一致性與完整性。


## 資料庫的 ACID 是什麼？
為了保證 transaction 的正確性，需要符合的四個特性
1. automicity 原子性：一筆 transaction 若沒有全部都成功，則全部都失敗，不會有只完成一半的狀態。如果只有成功一半，會 roll back 回到 transaction 開始之前的狀態（也就是 transaction 全部都失敗）
2. consistancy 一致性：transaction 開始前與結束後，都維持資料的一致性，都符合原先設定的原則（例如帳戶金額不會小於零、轉帳前後的金錢總數是一樣的、商品沒有庫存後就不能再購買等等）
3. isolation 隔離性：transaction 間不會互相影響。若有兩個 transaction 都要使用到同一筆資料，在第一個 transaction 結束後，第二個 transaction 才能取得該筆資料，避免在 transaction 進行過程中資料被改變。
4. durability 持久性：transaction 成功後，新增或更改的資料不會不見