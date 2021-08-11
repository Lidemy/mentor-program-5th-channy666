<?php
  require_once("conn.php");
  header("Content-type: application/json; charset=utf-8");

  if (empty($_POST["content"]) || empty($_POST["nickname"]) || empty($_GET["site_key"])) {
    $json = array (
      "ok?" => false,
      "message" => "Please input missing fields!"
    );

    $response = json_encode($json);
    echo $response;
    die();
    // 資料不齊全
  }

  $nickname = $_POST["nickname"];
  $site_key = $_GET["site_key"];
  $content = $_POST["content"];

  $sql = "INSERT INTO channy_w12_hw1_comments (nickname, site_key, content) VALUE (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $site_key, $content);
  $result = $stmt->execute();
  
  if (!$result) {
    $json = array (
      "ok?" => false,
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
    // 資料寫入失敗
  };

  $json = array(
    "ok?" => true,
    "message" => "Success!"
  );

  $response = json_encode($json);
  echo $response;

?>