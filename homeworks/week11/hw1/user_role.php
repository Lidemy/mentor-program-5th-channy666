<?php
  require_once("conn.php");
  require_once("utils.php");

  $result_admin = getUsersFromTheSameRole("ADMIN");
  $result_normal = getUsersFromTheSameRole("NORMAL");
  $result_banned = getUsersFromTheSameRole("BANNED");

  if(!hasPermissions($_SESSION["username"], "modify user_role", NULL)) {
    header("Location: index.php");
    die();
    // 沒有看到使用者身份的權限
  }

  $username = $_SESSION["username"];
  $user_info = getUser($username);

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>留言板會員列表</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
    <main class="board">
      <h1 class="board__title">Users</h1>
      <div class="board__btns">
        <a class="board__btn board__nickname"><?php echo escape($user_info["nickname"]); ?></a>
        <a class="board__btn" href="index.php">回到首頁</a>
        <a class="board__btn" href="handle_logout.php">登出</a>
      </div>
      <div class="board__hr"></div>
      <section class="users-role">
        <div class="users-role__name">管理員</div>
          <?php while ($row = $result_admin->fetch_assoc()){ ?>
            <div>
              <div class="card">
                <div class="card__avatar"></div>
                <div class="card__body card__body-users">
                  <div class="card__body-info">
                    <span class="card__body-info-author"><?php echo escape($row["nickname"]); ?>(@<?php echo escape($row["username"]); ?>)</span>
                    <span class="card__body-info-time"><?php echo escape($row["created_at"]); ?></span>
                    <a class="card__body-btn update-role__btn" >編輯身份</a>
                  </div>
                </div>
              </div>
              <form class="users-role__update-form hide" method="POST" action="handle_update_role.php">
                <div class="users-role__update-role">
                  身份：<input type="radio" name="role" value="NORMAL" id="<?php echo 'normal' . escape($row["username"]); ?>" /><label for="<?php echo 'normal' . escape($row["username"]); ?>">一般會員</label>
                  <input type="radio" name="role" value="BANNED" id="<?php echo 'banned' . escape($row["username"]); ?>" /><label for="<?php echo 'banned' . escape($row["username"]); ?>">停權會員</label>
                </div>
                <input type="submit" class="users-role__submit-btn" value="更改"></input>
                <input type="hidden" name="id" value="<?php echo escape($row["id"]); ?>"/>
              </form>
            </div>
          <?php } ?>
      </section>
      <section class="users-role">
        <div class="users-role__name">一般會員</div>
          <?php while ($row = $result_normal->fetch_assoc()){ ?>
            <div>
              <div class="card">
                <div class="card__avatar"></div>
                <div class="card__body card__body-users">
                  <div class="card__body-info">
                    <span class="card__body-info-author"><?php echo escape($row["nickname"]); ?>(@<?php echo escape($row["username"]); ?>)</span>
                    <span class="card__body-info-time"><?php echo escape($row["created_at"]); ?></span>
                    <a class="card__body-btn update-role__btn" >編輯身份</a>
                  </div>
                </div>
              </div>
              <form class="users-role__update-form hide" method="POST" action="handle_update_role.php">
                <div class="users-role__update-role">
                  身份：<input type="radio" name="role" value="ADMIN" id="<?php echo 'admin' . escape($row["username"]); ?>" /><label for="<?php echo 'admin' . escape($row["username"]); ?>">管理員</label>
                  <input type="radio" name="role" value="BANNED" id="<?php echo 'banned' . escape($row["username"]); ?>" /><label for="<?php echo 'banned' . escape($row["username"]); ?>">停權會員</label>
                </div>
                <input type="submit" class="users-role__submit-btn" value="更改"></input>
                <input type="hidden" name="id" value="<?php echo escape($row["id"]); ?>"/>
              </form>
            </div>
          <?php } ?>
      </section>
      <section class="users-role">
        <div class="users-role__name">停權會員</div>
          <?php while ($row = $result_banned->fetch_assoc()){ ?>
            <div>
              <div class="card">
                <div class="card__avatar"></div>
                <div class="card__body card__body-users">
                  <div class="card__body-info">
                    <span class="card__body-info-author"><?php echo escape($row["nickname"]); ?>(@<?php echo escape($row["username"]); ?>)</span>
                    <span class="card__body-info-time"><?php echo escape($row["created_at"]); ?></span>
                    <a class="card__body-btn update-role__btn" >編輯身份</a>
                  </div>
                </div>
              </div>
              <form class="users-role__update-form hide" method="POST" action="handle_update_role.php">
                <div class="users-role__update-role">
                  身份：<input type="radio" name="role" value="ADMIN" id="<?php echo 'admin' . escape($row["username"]); ?>" /><label for="<?php echo 'admin' . escape($row["username"]); ?>">管理員</label>
                  <input type="radio" name="role" value="NORMAL" id="<?php echo 'normal' .escape($row["username"]); ?>" /><label for="<?php echo 'normal' . escape($row["username"]); ?>">一般會員</label>
                </div>
                <input type="submit" class="users-role__submit-btn" value="更改"></input>
                <input type="hidden" name="id" value="<?php echo escape($row["id"]); ?>"/>
              </form>
            </div>
          <?php } ?>
        </div>
      </section>
    </main>
  </body>
  <script>
    document.querySelector(".board").addEventListener('click', function(e) {
      if (e.target.classList.contains("update-role__btn")) {
        const card = e.target.closest(".card")
        const form = card.nextElementSibling
        form.classList.toggle("hide")
      }
    }
    )
  </script>
</html>
