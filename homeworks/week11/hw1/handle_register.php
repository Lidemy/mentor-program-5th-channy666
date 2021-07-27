<?php
  require_once("conn.php");
  session_start();

  $errCode = null;
  if (empty($_POST["username"])|| empty($_POST["password"]) || empty($_POST["nickname"])) {
    header("Location: register.php?errCode=1");
    die();
    // 資料不齊全
  }

  $username = $_POST["username"];
  $nickname = $_POST["nickname"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

  $sql = "INSERT INTO channy_w11_hw1_users (username, nickname, password) VALUES(?, ?, ?)" ;
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $result = $stmt->execute();

  if (!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header("Location: register.php?errCode=2");
      die();
      // 帳號被註冊過
    }
    die($conn->error);
  }
  if ($conn->affected_rows){
    $_SESSION["username"] = $username;
    header("Location: index.php");
  }
?>