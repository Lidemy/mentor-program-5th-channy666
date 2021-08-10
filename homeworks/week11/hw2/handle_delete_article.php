<?php
  require_once("conn.php");
  require_once("utils.php");
  require_once("has_permission.php");

  $id = $_GET["id"];
  
  $page = setPreviousPage($_SERVER["HTTP_REFERER"]);
  if (strpos($page, "article.php")) {
    $page = "index.php";
    // 如果是在要刪除的文章的頁面刪除文章，就回到首頁
  }
  
  $sql = "UPDATE channy_w11_hw2_articles SET is_deleted = 1 WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows){
    header("Location: " . $page);
  }

?>
