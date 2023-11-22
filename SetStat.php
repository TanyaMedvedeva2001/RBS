<?php
// defined('INDEX') OR die('Прямой доступ к странице запрещён!');

$dblogin = "root"; // ВАШ ЛОГИН К БАЗЕ ДАННЫХ
$dbpass = ""; // ВАШ ПАРОЛЬ К БАЗЕ ДАННЫХ
$db = "rbsstat"; // НАЗВАНИЕ БАЗЫ ДЛЯ САЙТА
$dbhost="localhost"; 


$conn = mysqli_connect($dbhost, $dblogin, $dbpass, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully\n";

$json = file_get_contents("php://input");
if (!empty($json)){
    echo "Данные получены\n";
}
else{
    echo "Данные не получены\n";
}

$data = json_decode($json, true);
$lead_time = $data['Time'];
$root = $data['Root'];
$size = $data['Size'];
$sizeStr = $data['SizeStr'];

$stmt = $conn->prepare("INSERT INTO statistics(lead_time, root, size, sizeStr) VALUES (?, ?, ?, ?)");
$stmt->bind_param('isis', $lead_time, $root, $size, $sizeStr);
$result = $stmt->execute();

if($result){
    echo "Данные отправлены";
}
else{
    echo "Данные не отправлены";
}
$stmt->close();

mysqli_close($conn);

