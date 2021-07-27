<?php
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["update_nickname"])) {
    header("Location: index.php?errCode=2");
    die();
    // 沒有輸入暱稱
  }

  if (!hasPermissions($_SESSION["username"], "update nickname", NULL)) {
    header("Location: index.php");
    die();
    // 沒有更改暱稱的權限（ 沒有 session_id ）
  }

  $nickname = $_POST["update_nickname"];
  $username = $_SESSION["username"];

  $sql = "UPDATE channy_w11_hw1_users SET nickname = ? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows){
    header("Location: index.php");
  }
?>
