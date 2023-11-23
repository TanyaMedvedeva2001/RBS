<?php
function Connect():mysqli {
    $dblogin = "root"; // ВАШ ЛОГИН К БАЗЕ ДАННЫХ
    $dbpass = ""; // ВАШ ПАРОЛЬ К БАЗЕ ДАННЫХ
    $db = "rbsstat"; // НАЗВАНИЕ БАЗЫ ДЛЯ САЙТА
    $dbhost="localhost"; 

    try{
        $conn = mysqli_connect($dbhost, $dblogin, $dbpass, $db);
    }catch(Exception $e){
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
};
