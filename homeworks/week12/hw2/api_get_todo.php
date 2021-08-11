<?php
  require_once("conn.php");
  header("Content-type: application/json; charset=utf-8");
  

  if (empty($_GET["id"])) {
    $json = array(
      "ok?" => false,
      "message" => "Please add id in url!"
    );
    $response = json_encode($json);
    echo $response;
    die();
    // 沒有 id
  }

  $id = $_GET["id"];

  $sql = "SELECT * FROM channy_w12_hw2_todos WHERE id = ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
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
  $row = $result->fetch_assoc();

  $json = array(
    "ok?" => true,
    "message" => "Success!",
    "data" => array(
      "id" => $row["id"],
      "todos" => $row["todos"]
    )
  );

  $response = json_encode($json);
  echo $response;

?>