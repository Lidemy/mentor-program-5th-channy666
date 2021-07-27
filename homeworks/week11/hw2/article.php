<?php
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_GET["id"])) {
    header("Location: index.php");
    die();
    // 沒有 article_id
  }

  $id = $_GET["id"];
  $sql = "SELECT * FROM channy_w11_hw2_articles WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($row["is_deleted"] === 1) {
    header("Location: index.php");
    die();
    // 文章是刪除狀態
  }

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog: article</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <?php include_once("header.php"); ?>
    <main>
      <section class="articles">
        <div class="article">
          <div class="article__header">
            <div class="article__title"><?php echo escape($row["title"]); ?></div>
            <?php if (isAdmin()) { ?>
              <div class="article__admin-btns__article">
                <a class="article__admin-btn" href="update_article.php?id=<?php echo escape($row["id"]); ?>">編輯</a>
                <a class="article__admin-btn" href="handle_delete_article.php?id=<?php echo escape($row["id"]); ?>">刪除</a>
              </div>
            <?php } ?>
          </div>
          <div class="article__time"><?php echo escape($row["created_at"]); ?></div>
          <div class="article__content__article"><?php echo escape($row["content"]); ?></div>
        </div>
      </section>
    </main>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  </body>
  <script>
  </script>
</html>
