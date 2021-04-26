## 跟你朋友介紹 Git
> 記得當初開始看菜哥影片是因為一句話：起司熱狗，氣死偶。

Git 是一個做版本控制的軟體，比人類自己幫不同版本亂取什麼**最終終極版v29**之類的方便太多了！除了提供最基本的版本順序，也能很清楚的看出各版本間的差異，甚至還可以開分支提供多人協作的功能。  

在 terminal（或是可以下載 iTrem2）上輸入 `git --version` 安裝 Git，然後用 `git init` 就可以建立 Git 版本控制的專案。
版本就類似像資料夾一樣，每更新一個版本就是新增一個資料夾，所以需要先把檔案加入資料夾中以進行版本控制。假設我們想把 `afu.js` 這個檔案加入版本控制就要用 `git add afu.js`，如果想把所在位置內的所有檔案都加入版本控制的話可以直接 `git add .`，這邊要比較注意的是，一但檔案經過改動後就必須要再 git add 一次，重新加入版本控制。  
當目前所有該改的檔案都改完並且加入版本控制之後，就可以來建立一個新的版本啦！假設這個版本我想叫做 howfu，就可以用 `git commit -m "howfu"`。還有另一個比較方便地指令 `git commit -am "howfu"`，可以同時把**改動過的**檔案加入版本控制並且 commit，但是要注意，**新建的**檔案不算喔，還是需要手動 `git add .` 加入後再 commit。如果想看目前版本的狀態可以用 `git status`，想看過去版本記錄的話可以用 `git log`。  
另外一定要提到 [github.com](https://github.com/) 這個網站，顧（網域）名思義就是一個存放 git 專案的地方。
註冊網站後 create 一個新的專案，裡面有教怎麼把自己電腦連上 GitHub，連上後就可以用 `git push origin master` 把東西放上去啦！如果要從 GitHub 下載到電腦的話則是用 `git pull origin master`。
存放在 GitHub 上的 repository 可以很方便的讓多個人或多個裝置協作。使用 `git clone 專案的網址` 把其他人的 repository 下載到自己電腦中，修改好後再 push 回去，讓 GitHub 上的跟 local 端的同步。但是如果多人一起修改同一個專案很可能會改動到同一個檔案，這時可以使用 git 一個很方便的功能叫做 branch 分支，有點像是從主要的 repository(main) 上再分出一條一模一樣的 repository(branch)，每個人先在自己分出來的分支（branch）上修改專案，完成後再合併 (merge) 回去 main，如果合併時發現有衝突的話 git 也會標示出衝突的檔案與衝突的內容，此時再手動解決衝突就可以了。  
最後還有一點要注意的是，GitHub 上的 repository 作者如果沒有開權限的話，一般來說是沒有辦法隨意任人修改的，可以 clone 下來到自己的 local 端，但是是沒有辦法再 push 回去原作者的 repository。如果想要其他人的 repository 而且想修改的話，在 Github 上使用 Fork，就可以把別人的 repository 複製一份到自己的帳號上，自己的這份跟原作者那份已經無關，這時要在自己這邊這份做修改、開 branch 或是要 push 要 pull 就都可以了。

以下為幾個 Git 的常用指令：
1. `git init`: initialize 在欲版本控制的位置輸入，建立 git 版本控制專案
2. `git status`: 確認 git 版本控制狀態
3. `git add`: 將檔案加入版本控制（`git add + 檔案名稱`）→ staged , `git add .`: 所有檔案加入版本控制（檔案經修改後都要再加一次）
4. `git rm --cached`: 將檔案移出版本控制（`git rm --cached + 檔案名稱`）→ untracked
5. `git commit`: 新建一個版本 (`git commit -m "版本敘述"`)
    * 檔案經過修改後須先將檔案加入版本控制後再 commit
    * `git commit -am "版本敘述"`: `git add .` 加上 `git commit -m` "版本敘述" （將所有檔案加入版本控制並新增一個版本但不會包含**新增的**untracked的檔案，新增的檔案需要 git add 加入版本控制)
6. `git log`: 版本控制的歷史紀錄，`git log --oneline` : 簡短的歷史紀錄
7. `git checkout +版本代碼` : 回到某個版本
8. `git checkout +分支名稱` : 切換到此分支
9. `.gitignore`: 要忽略的檔案 , 需先 (`touch .gitignore` 新增檔案後 , `vim .gitignore` 編輯器寫入要忽略的檔案
* `.gitignore`本身也需要加入版本控制 (staged)
11. `git diff`: 在 commit 之前確認改了什麼東西
12. `git branch -v`: ( `gb -v` )顯示目前有哪些branch
13. `git branch + 名稱`: 建立新的branch (名稱不能含空格)
14. `git checkout -b + 名稱`: 建立新的branch並且跳到新的去
15. `git branch -d + 名稱`: 刪除branch
16. `git merge + 名稱`: 把 branch 合併進來 (若有衝突==conflict==手動解決)
19. `git remote add origin +網址` : 加一個遠端
20. `git remote -v` : 顯示遠端連線狀態
21. `git remote remove origin` : 與遠端斷開連結！
22. `git push origin + 名稱` : 上傳至 GitHub
23. `git pull origin + 名稱` : 從 GitHub 上下載下來