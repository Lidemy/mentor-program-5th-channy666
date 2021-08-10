<?php
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET["page"])) {
    $page = intval($_GET["page"]);
  }
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT * FROM channy_w11_hw2_articles WHERE is_deleted IS NULL ORDER BY id DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $item_per_page, $offset);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog: article-list</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
    <link rel="stylesheet" href="./style.css"/>
  </head>
  <body>
    <?php include_once("header.php"); ?>
    <main>
      <section class="articles__list">
        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="article__list">
            <div class="article__title__list">
              <a class="article__title__list-btn" href="article.php?id=<?php echo escape($row["id"]); ?>">
                <?php echo escape($row["title"]); ?>
              </a>
            </div>
            <div class="article__list-info">
              <div class="article__time__list"><?php echo escape($row["created_at"]); ?></div>
              <?php if (isAdmin()) { ?>
                <div class="article__admin-btns__list">
                  <a class="article__admin-btn__list" href="update_article.php?id=<?php echo escape($row["id"]); ?>">編輯</a>
                  <a class="article__admin-btn__list" href="handle_delete_article.php?id=<?php echo escape($row["id"]); ?>">刪除</a>
                </div>
              <?php } ?>
            </div>
          </div>
        <?php } ?>
      </section>
      <?php
        $sql_page = "SELECT count(id) AS count FROM channy_w11_hw2_articles WHERE is_deleted IS NULL";
        $stmt_page = $conn->prepare($sql_page);
        $result_page = $stmt_page->execute();
        $result_page = $stmt_page->get_result();
        $row_page = $result_page->fetch_assoc();
        $count = $row_page["count"];
        $total_page = ceil($count / $item_per_page);
      ?>
      <div class= page__info>
        <span>總共有 <?php echo $count; ?> 篇文章，</span>
        <span>頁數：<?php echo $page ?> / <?php echo $total_page; ?></span>
      </div>
      <div class="paginator">
        <?php if ($page !== 1) { ?>
          <a href="article_list.php?page=1">文章列表</a>
          <a href="article_list.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="article_list.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="article_list.php?page=<?php echo $total_page ?>">最後一頁</a>
        <?php } ?>
      </div>
    </main>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  </body>
  <script>
  </script>
</html>
