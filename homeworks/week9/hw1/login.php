<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡易留言板</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
    <main class="board">
      <h1 class="board__title">會員登入</h1>
      <div class="board__btns">
        <a class="board__btn" href="index.php">回到首頁</a>
        <a class="board__btn" href="register.php">註冊</a>
      </div>
      <form class="board__register-form" method="POST" action="handle_login.php">
        <div class="board__register-info">
          <span>帳號：
            <input type="text" name="username" placeholder="請輸入帳號" />
          </span>
        </div>
        <div class="board__register-info">
          <span>密碼：
            <input type="password" name="password" placeholder="請輸入密碼" />
          </span>
        </div>
        <?php
          if (!empty($_GET["errCode"])) {
            $msg = 'Error';
            if ($_GET["errCode"] === '1') {
              $msg = "資料填寫不完全！";
            } else if ($_GET["errCode"] === '2') {
              $msg = '帳號或密碼錯誤！';
            }
            echo "<div class='error' >" . $msg . "</div>";
          }
        ?>
        <input type="submit" class="board__submit-btn" />
      </form>
    </main>
  </body>
</html>