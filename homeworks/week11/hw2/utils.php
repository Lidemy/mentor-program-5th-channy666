<?php
  require_once("conn.php");
  session_start();

  function isAdmin() {
    if (!empty($_SESSION["username"])) {
      global $conn;
      $username = $_SESSION["username"];
      $sql = "SELECT * FROM channy_w11_hw2_admin WHERE username = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("s", $username);
      $result = $stmt->execute();
      if (!$result) {
        return false;
      }
      $result = $stmt->get_result();
      if ($result->num_rows) {
        return true;
      }
      return false;
    }
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function setPreviousPage($page) {
    if (!empty($page) && !strpos($page, "update") && !strpos($page, "delete") && !strpos($page, "create") && !strpos($page, "handle")) {
      return $page;
    }
    return "index.php";
    // 沒有前一頁或前一頁是新增、編輯、刪除或處理頁面就回到首頁
    // 覺得這樣處理好像不是很好，但是暫時想不到其他的方法 QQ 一樣改天再回來看看
  }
 
?>
