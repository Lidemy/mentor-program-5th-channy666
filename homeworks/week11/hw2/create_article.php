<?php
  require_once("conn.php");
  require_once("utils.php");
  require_once("has_permission.php");

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog: create-article</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <?php include_once("header.php"); ?>
    <main>
      <section class="articles">
        <div class="create-article">
          <div class="create-article__title">新增文章：</div>
          <form class="create-article__form" method="POST" action="handle_create_article.php" >
            <input type="text" placeholder="請輸入文章標題" name="title" class="create-article__form-title" />
            <textarea name="content" class="create-article__form-content" placeholder="請輸入文章內容"></textarea>
            <?php
              if (!empty($_GET["errCode"])) {
                $msg = NULL;
                if ($_GET["errCode"] === '1') {
                  $msg = "文章標題與內容不可空白！";
                }
                echo '<div class="create-article__form-error">' . $msg . '</div>';
              }
            ?>
            <input type="submit" class="create-article__form-btn" />
            <input type="hidden" name="previous-page" value="<?php echo $_SERVER["HTTP_REFERER"]; ?>" />
          </form>
      </section>
    </main>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  </body>
  <script>
  </script>
</html>