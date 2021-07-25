<?php
  require_once("conn.php");
  
  function getUser($username) {
    $sql = sprintf("SELECT * FROM channy_w9_users WHERE username = '%s'", $username);
    global $conn;
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }

    if ($result->num_rows) {
      $row = $result->fetch_assoc();
      return $row;
    }
  }
?>
