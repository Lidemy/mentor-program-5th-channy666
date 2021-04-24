## 交作業流程
> 已交第一週作業為例
1. 在 local 端把作業 repository clone 下來 `git clone https://github.com/Lidemy/mentor-program-5th-channy666.git` 
2. 開新的 branch `git branch week1hw`
3. 進入作業區 `/mentor-program-5th-channy666/homeworks/`
4. 寫當週作業，寫完後檢查
5. 當週所有作業都完成並檢查無誤後，若有新增檔案 `git add .` 把所有新增的檔案都加入版本控制
6. commit 一個新的版本 
  * 確定所有檔案都加入版本控制後用 `git commit -m "版本敘述"` commit 一個新的版本
  * 也可以直接使用 `git commit -am "版本敘述"`，會把**修改過的檔案**加入版本控制並 commit 一個新的版本
  * `git commit -am "版本敘述"` 只會把原有修改過的檔案加入版本控制，若是**新增的檔案**必須先手動 `git add .`加入版本控制後再 commit
7. push 上 GitHub `git push origin week1hw`
7. 到 GitHub 上請求 pull request（把 week1hw merge 到 master）
8. 把 pull request 的網址提交到學習系統上（務必確認交到正確的週數上！）
9. 到學習系統的作業列表確認有沒有交成功
10. 感恩 Huli 大大、感恩助教大大！
11. 作業修改完並且 GitHub 上 week1hw 分支已經 merge 到 master 上後，刪除 GitHub 上的 week1hw 分支
12. 回到電腦 local 端，把 GitHub 上 merge 完的 repository pull 下來 `git pull origin master` （若目前在 week1hw 分支底下，須先 `git checkout master` 回到 master 再 pull）
13. pull 下來後確認 local 端的 master 是已經更新成 merge 完的版本後就可以 `git branch -d week1hw`