<?php
  require_once("utils.php");
  session_destroy();
  
  $page = setPreviousPage($_SERVER["HTTP_REFERER"]);
  header("Location: " . $page);
?>