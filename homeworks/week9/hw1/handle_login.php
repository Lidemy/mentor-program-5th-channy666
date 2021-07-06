<?php
  require_once("conn.php");
  session_start();

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=1");
    die("資料填寫不全");
  }

  $username = urlencode($_POST["username"]);
  $password = urlencode($_POST["password"]);

  $sql = sprintf("SELECT * FROM channy_w9_users WHERE username = '%s' AND password = '%s'", $username, $password);

  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  
  $row = $result->fetch_assoc();

  if ($result->num_rows) {
    $_SESSION["username"] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }
?>