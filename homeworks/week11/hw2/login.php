<?php  
  require_once("utils.php");

  if (isAdmin()) {
    header("Location: index.php");
    die();
    // 已經登入了
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog_login</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <?php include_once("header.php"); ?>
    <main class="login">
      <section class="login__section">
        <div class="login__title">Log In</div>
        <form class="login__form" method="POST" action="handle_login.php">
          <div class="login__form-info">
            <div>USERNAME</div>
            <input type="text" name="username" placeholder=" 使用者名稱"/>
          </div>
          <div class="login__form-info">
            <div>PASSWORD</div>
            <input type="password" name="password" placeholder=" 使用者密碼"/>
          </div>
          <?php
            if (!empty($_GET["errCode"])) {
              $msg = NULL;
              if ($_GET["errCode"] === '1') {
                $msg = "資料不齊全！";
              }
              if ($_GET["errCode"] === '2') {
                $msg = "帳號錯誤！";
              }
              if ($_GET["errCode"] === '3') {
                $msg = "密碼錯誤！";
              }
              echo '<div class="login__form-error">' . $msg . '</div>';
            }
          ?>
          <input type="submit" class="login__form-btn" value="登入"/>
          <input type="hidden" name="previous-page" value="<?php echo $_SERVER['HTTP_REFERER']; ?>" />
      </section>
    </main>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  </body>
  <script>
  </script>
</html>
