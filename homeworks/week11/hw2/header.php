<?php
  require_once("utils.php");
?>

<div class="navbar">
  <div class="navbar__visitor">
    <div class="navbar__title" >
      <a  class="navbar__title-btn" href="index.php">Who's Blog!</a>
    </div>
    <div class="navbar__btns">
      <a class="navbar__btn" href="article_list.php">文章列表</a>
      <a class="navbar__btn" >分類專區</a>
      <a class="navbar__btn" >關於我</a>
    </div>
  </div>
  <?php if (isAdmin()) { ?>
    <div class="navbar__admin">
      <div class="navbar__admin-btns">
        <?php if (!strpos($_SERVER["REQUEST_URI"], "index.php")) { ?>
          <a class="navbar__admin-btn" href="index.php">首頁</a>
        <?php } ?>
        <?php if (!strpos($_SERVER["REQUEST_URI"], "create_article.php")) { ?>
          <a class="navbar__admin-btn" href="create_article.php">新增文章</a>
        <?php } ?> 
        <a class="navbar__admin-btn" href="handle_logout.php">登出</a>
      </div>
    </div>
  <?php } else { ?>
   <div class="navbar__admin">
      <div class="navbar__admin-btns">
        <?php if (!strpos($_SERVER["REQUEST_URI"], "index.php")) { ?>
          <a class="navbar__admin-btn" href="index.php">首頁</a>
        <?php } ?>
        <?php if (!strpos($_SERVER["REQUEST_URI"], "login.php")) { ?>
          <a class="navbar__admin-btn" href="login.php">登入</a>
        <?php } ?>
      </div>
    </div>
  <?php } ?>
</div>
<div class="banner">
  <div class="banner__desc">存放技術之地</div>
  <div class="banner__welcome">Welcome to my blog</div>
</div>
