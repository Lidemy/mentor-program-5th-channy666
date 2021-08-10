<?php
  require_once("conn.php");
  require_once("utils.php");

  $id = $_POST["id"];

  if (empty($_POST["content"])) {
    header("Location: update_comment.php?errCode=1&id=" . $id);
    die(); //沒有輸入留言內容
  }

  if (!hasPermissions($_SESSION["username"], "update comment", $id)) {
    header("Location: index.php");
    die(); //沒有更新這則留言的權限
  }

  $content = $_POST["content"];

  $sql = "UPDATE channy_w11_hw1_comments SET content = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $content, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows){
    header("Location: index.php");
  }
?>
