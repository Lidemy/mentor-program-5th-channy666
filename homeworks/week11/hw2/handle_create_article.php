<?php
  require_once("conn.php");
  require_once("utils.php");
  require_once("has_permission.php");

  if (empty($_POST["content"]) || empty($_POST["title"])) {
    header("Location: create_article.php?errCode=1");
    die();
    // 資料不齊全
  }

  $page = setPreviousPage($_POST["previous-page"]);

  $title = $_POST["title"];
  $content = $_POST["content"];
  
  $sql = "INSERT INTO channy_w11_hw2_articles (title, content) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $title, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows) {
    header("Location: " . $page);
  }
?>
