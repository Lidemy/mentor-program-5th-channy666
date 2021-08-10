<?php
  require_once("conn.php");
  require_once("utils.php");

  if (!hasPermissions($_SESSION["username"], "modify user-role", NULL)) {
    header("Location: index.php");
    die();
    // 沒有權限更新使用者身份
  }

  if (empty($_POST["id"]) || empty($_POST["role"])) {
    header("Location: user_role.php");
    die();
    // 資料不齊全
  }

  $id = $_POST["id"];
  $role = $_POST["role"];
  $sql = "UPDATE channy_w11_hw1_users SET role = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $role, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  if ($conn->affected_rows) {
    header("Location: user_role.php");
  }

?>
