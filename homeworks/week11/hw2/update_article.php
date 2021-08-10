<?php
  require_once("conn.php");
  require_once("utils.php");
  require_once("has_permission.php");


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

  if ($result->num_rows) {
    $row = $result->fetch_assoc();
  } else {
    header("Location: index.php");
    die();
    // 找不到文章
  }


?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog: update-article</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <?php include_once("header.php"); ?>
    <main>
      <section class="articles">
        <div class="create-article">
          <div class="create-article__title">編輯文章：</div>
          <form class="create-article__form" method="POST" action="handle_update_article.php?id=<?php echo escape($row["id"]); ?>" >
            <input type="text" name="title" class="create-article__form-title" value="<?php echo escape($row["title"]); ?>" />
            <textarea name="content" class="create-article__form-content" ><?php echo escape($row["content"]); ?></textarea>
            <?php
              if (!empty($_GET["errCode"])) {
                $msg = "ERROR"; 
                if ($_GET["errCode"] === "1") {
                  $msg = "文章標題或內容不可空白！";
                }
                echo '<div class="create-article__form-error">' . $msg . '</div>';
              }
            ?>
            <input type="submit" class="create-article__form-btn" />
            <input type="hidden" name="id" value="<?php echo escape($row["id"]); ?>" />
            <input type="hidden" name="previous-page" value="<?php echo $_SERVER["HTTP_REFERER"]; ?>" />
          </form>
      </section>
    </main>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  </body>
  <script>
  </script>
</html>
