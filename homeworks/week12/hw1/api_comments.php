<?php
  require_once("conn.php");
  header("Content-type: application/json; charset=utf-8");

  if (empty($_GET["site_key"])) {
    $json = array(
      "ok?" => false,
      "message" => "Please add site_key in url!"
    );
    $response = json_encode($json);
    echo $response;
    die();
    // 沒有 site_key
  }

  $site_key = $_GET["site_key"];

  $sql = "SELECT id, nickname, content, created_at FROM channy_w12_hw1_comments WHERE site_key = ? " . (empty($_GET['before']) ?  '' : "AND id < ? ") . "ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  if (empty($_GET["before"])) {
    $stmt->bind_param("s", $site_key);
  } else {
    $stmt->bind_param("si", $site_key, $_GET["before"]);
  }
  $result = $stmt->execute();
  
  if (!$result) {
    $json = array (
      "ok?" => false,
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
    // 資料取得失敗
  };

  $result = $stmt->get_result();
  $comments = array();

  while($row = $result->fetch_assoc()) {
    array_push($comments, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  };

  $json = array(
    "ok?" => true,
    "message" => "Success!",
    "comments" => $comments,
  );

  $response = json_encode($json);
  echo $response;

?>