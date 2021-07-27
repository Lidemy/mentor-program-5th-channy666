<?php
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["content"])) {
    header("Location: index.php?errCode=1");
    die();
    //資料不齊全
  }

  if (!hasPermissions($_SESSION["username"], "create comment", NULL)) {
    header("Location: index.php");
    die();
    //沒有權限
  }

  $username = $_SESSION["username"];
  $content = $_POST["content"];
  
  $sql = "INSERT INTO channy_w11_hw1_comments (username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows) {
    header("Location: index.php");
  }
?>
