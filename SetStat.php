<?php
// defined('INDEX') OR die('Прямой доступ к странице запрещён!');
require('Connect.php');

$conn = Connect();

try{
    $json = file_get_contents("php://input");
}catch(Exception $e){
    die("Данные не получены " . $e->getMessage() . "\n");
}

echo "Данные получены\n";


$data = json_decode($json, true);
$lead_time = $data['Time'];
$root = $data['Root'];
$size = $data['Size'];
$sizeStr = $data['SizeStr'];

$stmt = $conn->prepare("INSERT INTO statistics(lead_time, root, size, sizeStr) VALUES (?, ?, ?, ?)");
$stmt->bind_param('isis', $lead_time, $root, $size, $sizeStr);

try{
    $result = $stmt->execute();
}catch(Exception $e){
    die("Данные не отправлены " . $e->getMessage() . "\n");
}

echo "Данные отправлены\n";

$stmt->close();

mysqli_close($conn);

