<?php
require('Connect.php');
function GetData(){
    $conn = Connect();

    $sql = "SELECT root, size, sizeStr, lead_time FROM statistics";
    if($result = $conn->query($sql)){
        foreach($result as $row){
            $root[] = $row["root"];
            $size[] = $row['size'];
            $sizeStr[] = $row['sizeStr'];
            $time[] = $row['lead_time'];
        }
    }
    mysqli_close($conn);
    $data = array("root" => $root,
                  "size" => $size,
                  "lead_time" => $time,
                  "sizeStr" => $sizeStr);
    return $data;
}