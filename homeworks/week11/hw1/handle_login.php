<?php
  require_once("conn.php");
  session_start();

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=1");
    die();
    // 資料填寫不全
  }

  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM channy_w11_hw1_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    die();
    // 找不到帳號
  }

  if (password_verify($password, $row["password"])) {
    $_SESSION["username"] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=3");
    // 密碼錯誤
  }

?>