<?php
  require_once("utils.php");

  if (!isAdmin()) {
    if (isset($_SERVER["HTTP_REFERER"])) {
      header("Location: " . $_SERVER["HTTP_REFERER"]);
      die();
      // 沒有權限，回到前一頁
    }
    header("Location: index.php");
    die();
    // 沒有權限也沒有前一頁，回到首頁
  }
  
?>
