<?php
  require_once("conn.php");
  session_start();
  
  function getUser($username) {
    global $conn;
    $sql = "SELECT * FROM channy_w11_hw1_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    if ($result->num_rows) {
      $row = $result->fetch_assoc();
      return $row;
    }
  }

  function getUsersFromTheSameRole ($role) {
    global $conn;
    $sql = "SELECT * FROM channy_w11_hw1_users WHERE role = ? ORDER BY id ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $role);
    $result= $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }


  // $acton: modify user_role 更改身份、update comment 編輯留言、delete comment 刪除留言、create comment 新增留言、update nickname 編輯暱稱
  function hasPermissions ($username, $action, $comment_id) { 
    if (!$username) {
      return false;
    }
    
    $user_info = getUser($username);
    
    if ($user_info["role"] === "ADMIN") {
      return true;
    }

    if ($action === "update comment" || $action === "delete comment") {
      global $conn;
      $sql = "SELECT username FROM channy_w11_hw1_comments WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("i", $comment_id);
      $result = $stmt->execute();
      if (!$result) {
        die($conn->error);
      }
      $result = $stmt->get_result();
      if ($result->num_rows) {
        $row = $result->fetch_assoc();
        if ($row["username"] === $username) {
          return true;
        }
      }
    }

    if ($action === "create comment") {
      if ($user_info["role"] !== "BANNED") {
        return true;
      }
    }

    if ($action === "update nickname") {
      return true;
    }

    return false;
  }
?>
