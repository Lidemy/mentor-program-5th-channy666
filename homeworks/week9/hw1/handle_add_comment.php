<?php
  require_once("conn.php");
  require_once("utils.php");
  session_start();

  if (empty($_POST["content"])) {
    header("Location: index.php?errCode=1");
    die("資料不齊全");
  }

  $user_info = getUser($_SESSION["username"]);
  $nickname = $user_info["nickname"];
  $content = urlencode($_POST["content"]);
  

  $sql = sprintf("INSERT INTO channy_w9_comments (nickname, content) VALUES('%s', '%s')", $nickname, $content);

  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  if ($conn->affected_rows) {
    header("Location: index.php");
  }
?>
