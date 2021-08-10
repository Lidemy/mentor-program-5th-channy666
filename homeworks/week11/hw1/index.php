<?php
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET["page"])) {
    $page = intval($_GET["page"]);
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT C.id AS id, C.username AS username, C.content AS content, C.created_at AS created_at, U.nickname AS nickname FROM channy_w11_hw1_comments AS C LEFT JOIN channy_w11_hw1_users AS U ON C.username = U.username WHERE is_deleted IS NULL ORDER BY C.id DESC LIMIT ? OFFSET ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $item_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();

  $username = null;
  $user_info = null;
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
          <a class="board__btn board__nickname"><?php echo escape($user_info["nickname"]); ?></a>
          <a class="board__btn update_user" >編輯暱稱</a>
          <?php if (hasPermissions($username, "modifiy user_role", NULL)) { ?>
            <a class="board__btn" href="user_role.php">使用者列表</a>
          <?php } ?>
          <a class="board__btn" href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
      <form class="board__update-user-form hide" method="POST" action="handle_update_nickname.php">
        <div class="board__update-user">
          <span>新的暱稱：
            <input type="text" name="update_nickname" placeholder="請輸入暱稱" />
          </span>
        </div>
        <?php
          if (!empty($_GET["errCode"])) {
            $msg = null;
            if ($_GET["errCode"] === '2') {
              $msg = "請輸入暱稱！";
            }
            echo "<div class='error' >" . $msg . "</div>";
          }
        ?>
        <input type="submit" class="board__submit-btn"></input>
      </form>
      <form class="board__new-comment-form" method="POST" action="handle_create_comment.php">
        <textarea name="content" rows="5" placeholder="說吧！"></textarea>
        <?php
          if (!empty($_GET["errCode"])) {
            $msg = null;
            if ($_GET["errCode"] === '1') {
              $msg = "請輸入留言！";
            }
            echo "<div class='error' >" . $msg . "</div>";
          }
        ?>
        <?php if (!$username) { ?>
          <div class="error" >請登入後留言</div>
        <?php } else if (!haspermissions($username, "create comment", NULL)) { ?>
          <div class="error" >您已被停權！</div>
        <?php } else {?>
          <input type="submit" class="board__submit-btn"></input>
        <?php } ?>
      </form>
      <div class="board__hr"></div>
      <section>
        <?php while ($row = $result->fetch_assoc()){ ?>
          <div class="card">
            <div class="card__avatar"></div>
            <div class="card__body">
              <div class="card__body-info">
                <span class="card__body-info-author"><?php echo escape($row["nickname"]); ?>(@<?php echo escape($row["username"]); ?>)</span>
                <span class="card__body-info-time"><?php echo escape($row["created_at"]); ?></span>
                  <?php if ($user_info) {
                    if (hasPermissions($username, "update comment", $row["id"])) {?>
                    <div class="card__body-btns">
                      <a class="card__body-btn" href="update_comment.php?id=<?php echo escape($row["id"]); ?>">編輯</a>
                      <a class="card__body-btn"  href="handle_delete_comment.php?id=<?php echo escape($row["id"]) ?>">刪除</a>
                    </div>
                  <?php } } ?>
              </div>
              <p class="card__body-content"><?php echo escape($row["content"]); ?></p>
            </div>
          </div>
        <?php } ?>
      </section>
      <div class="board__hr"></div>
      <?php
        $sql_page = "SELECT count(id) AS count FROM channy_w11_hw1_comments WHERE is_deleted IS NULL";
        $stmt_page = $conn->prepare($sql_page);
        $result_page = $stmt_page->execute();
        $result_page = $stmt_page->get_result();
        $row_page = $result_page->fetch_assoc();
        $count = $row_page["count"];
        $total_page = ceil($count / $item_per_page);
      ?>
      <div class= page__info>
        <span>總共有 <?php echo $count; ?> 筆留言，</span>
        <span>頁數：<?php echo $page ?> / <?php echo $total_page; ?></span>
      </div>
      <div class="paginator">
        <?php if ($page !== 1) { ?>
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
        <?php } ?>
      </div>
    </main>
  </body>
  <script>
    const btn = document.querySelector(".update_user")
    const updateUserForm = document.querySelector(".board__update-user-form")
    btn.addEventListener("click", function() {
      updateUserForm.classList.toggle("hide")
     }
    )
  </script>
</html>
