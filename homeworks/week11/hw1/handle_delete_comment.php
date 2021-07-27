<?php
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET["id"];

  if (!hasPermissions($_SESSION["username"], "delete comment", $id)) {
    header("Location: index.php");
    die();
    //沒有刪除這則留言的權限
  }

  $sql = "UPDATE channy_w11_hw1_comments SET is_deleted = 1 WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows){
    header("Location: index.php");
  }
?>