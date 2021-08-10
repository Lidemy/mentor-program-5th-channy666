<?php
  require_once("conn.php");
  header("Content-type: application/json; charset=utf-8");

  if (empty($_POST["todos"])) {
    $json = array (
      "ok?" => false,
      "message" => "Empty To-do List"
    );

    $response = json_encode($json);
    echo $response;
    die();
    // 沒有 To-do List 的資料
  }

  $todos = $_POST["todos"];

  if (!empty($_GET["id"])) {
    $sql = "UPDATE channy_w12_hw2_todos SET todos = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $todos, $_GET["id"]);
  } else {
    $sql = "INSERT INTO channy_w12_hw2_todos (todos) VALUE (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $todos);
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
    // 資料寫入失敗
  };

  if (!empty($_GET["id"])) {
    $listID = $_GET["id"];
  } else {
    $listID = $conn->insert_id;
  }

  $json = array(
    "ok?" => true,
    "message" => "Success!",
    "last_id" => $listID
  );

  $response = json_encode($json);
  echo $response;

?>