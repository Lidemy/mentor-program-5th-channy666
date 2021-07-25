<?php
  require_once("conn.php");
  require_once("utils.php");
  session_start();

  $result = $conn->query("SELECT * FROM channy_w9_comments ORDER BY id DESC");
  if (!$result) {
    die($conn->error);
  }

  $username = null;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user_info = getUser($username);
  }

?>
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
      <h1 class="board__title">Comments</h1>
      <div class="board__btns">
        <?php if (empty($username)) { ?>
          <a class="board__btn" href="register.php">註冊</a>
          <a class="board__btn" href="login.php">登入</a>
        <?php } else { ?>
          <a class="board__btn board__nickname"><?php echo urldecode($user_info["nickname"]); ?></a>
          <a class="board__btn" href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
      <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
        <textarea name="content" rows="5" placeholder="說吧！"></textarea>
        <?php
          if (!empty($_GET["errCode"])) {
            $msg = 'Error';
            if ($_GET["errCode"] === '1') {
              $msg = "請輸入留言！";
            }
            echo "<div class='error' >" . $msg . "</div>";
          }
        ?>
        <?php if ($username) { ?>
          <input type="submit" class="board__submit-btn"></input>
        <?php } else {?>
          <div class="please-login" >請登入後留言</div>
        <?php } ?>
      </form>
      <div class="board__hr"></div>
      <section>
        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="card">
            <div class="card__avatar"></div>
            <div class="card__body">
              <div class="card__body-info">
                <span class="card__body-info-author"><?php echo urldecode($row["nickname"]); ?></span>
                <span class="card__body-info-time"><?php echo $row["created_at"]; ?></span>
              </div>
              <p class="card__body-content"><?php echo urldecode($row["content"]); ?></p>
            </div>
          </div>
        <?php } ?>
      </section>
    </main>
  </body>
</html>
