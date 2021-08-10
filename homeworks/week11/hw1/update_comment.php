<?php
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET["id"];

  if (!hasPermissions($_SESSION["username"], "update comment", $id)) {
    header("Location: index.php");
    die();
    // 沒有更新留言的權限
  }
  
  $sql = "SELECT content FROM channy_w11_hw1_comments WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  
  if (!$result->num_rows) {
    header("Location: index.php");
  }
  $row = $result->fetch_assoc();

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
      <h1 class="board__title">編輯留言</h1>
      <form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
        <textarea name="content" rows="5" placeholder="說吧！"><?php echo escape($row["content"]) ?></textarea>
        <?php
          if (!empty($_GET["errCode"])) {
            $msg = null;
            if ($_GET["errCode"] === '1') {
              $msg = "請輸入留言！";
            }
            echo "<div class='error' >" . $msg . "</div>";
          }
        ?>
        <input type="hidden" name="id" value="<?php echo $id ?>"/>
        <input type="submit" class="board__submit-btn"></input>
      </form>
    </main>
  </body>
</html>
