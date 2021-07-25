<?php
  require_once("conn.php");

  $errCode = null;
  if (empty($_POST["username"]) || empty($_POST["nickname"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die("error: 資料不齊全！");
  }

  $username = urlencode($_POST["username"]);
  $nickname = urlencode($_POST["nickname"]);
  $password = urlencode($_POST["password"]);

  $sql = sprintf("INSERT INTO channy_w9_users (username, nickname, password) VALUES('%s', '%s', '%s')",
    $username,
    $nickname,
    $password
  );

  $result = $conn->query($sql);
  if (!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header("Location: register.php?errCode=2");
      die("error: 此帳號已被註冊過");
    }
    die($conn->error);
  }
  if ($conn->affected_rows){
    header("Location: index.php");
  }
?>