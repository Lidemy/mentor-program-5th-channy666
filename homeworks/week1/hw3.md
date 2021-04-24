## 教你朋友 CLI
> 過氣 H0w 哥我朋友啦！
1. command line 是什麼？  
  Commamd Line Interface(CLI) 命令列介面，與 Graphical User Interface(GUI) 圖形使用者介面一樣，都是一個與電腦溝通的地方。  
  而兩者差別在於溝通的方式，CLI 使用電腦看得懂的文字直接對電腦下指令，GUI 則是用人類比較直覺看得懂的圖形（例如直接點擊螢幕上顯示的按鈕）。  
  使用 CLI 下指令會比使用 GUI 的操作速度來的快，加上某些事情只能透過 CLI 來做，所以一起來學習 CLI 跟電腦當麻吉吧！

2. command line 怎麼用？  
  我想 H0w 哥一定是用 mac 吧！用內建的終端機 terminal 就可以囉！想要有好看的介面也可以下載 iterm2 喔。
  有了管道後就可以開始跟電腦溝通了，以下是幾個常用的、電腦看得懂的指令：
    * `pwd`: Print Working Directory 印出所在的位置
    * `ls`: LiSt 印出所在資料夾底下的檔案
    * `cd`: Change Directory 切換資料夾，`..`: 上一層資料夾，`~`: 根目錄
    * `man`: MANual 使用說明書（man＋指令），q 離開
    * `clear`: 清空畫面
    * `touch`: 更改時間（touch＋現有檔案名稱），或建立檔案（touch＋新檔案名稱）
    * `rm`: ReMove 刪除檔案
    * `rmdir`: 刪除資料夾
    * `mkdir`: MaKe DIRectory 新建資料夾
    * `mv`: MoVe 移動檔案 (mv＋欲移動的檔案＋欲移至的位置）或是改名（mv＋欲移動的檔案＋新的名字）
    * `cp`: CoPe 複製檔案（cp＋欲複製檔案＋複製檔案的名稱），複製資料夾（`cp -r `＋欲複製資料夾＋複製資料夾的名稱）
    * `cat`: CATenate 連接檔案，若只有 cat＋檔案名稱：顯示檔案內容
3. 用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案！
  ```
  mkdir wifi  //建立 wifi 資料夾
  cd wifi  //移動到 wifi 資料夾內
  touch afu.js  // 建立檔案 afu.js
  ```