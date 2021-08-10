<?php
  require_once("conn.php");
  require_once("utils.php");
  require_once("has_permission.php");

  $page = setPreviousPage($_POST["previous-page"]);
  $id = $_POST["id"];

  if (empty($_POST["content"]) || empty($_POST["title"])) {
    header("Location: update_article.php?errCode=1&id=" . $id);
    die(); 
    // 文章標題或內容不可空白
  }

  $title = $_POST["title"];
  $content = $_POST["content"];

  $sql = "UPDATE channy_w11_hw2_articles SET title = ?, content = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $title, $content, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: " . $page);
  // 本來有用 if ($conn->affected_rows) 來判斷沒有有更新成功，但是如果使用者沒有做任何改動就送出的話就會壞掉
  // 先把判斷拿掉，改天再回來看看怎麼做比較好

?>
