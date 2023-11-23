<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style type="text/css" media="screen">
    *html {
    font-family: sans-serif;
}
table {
    font-family: Sans-Serif, system-ui;
    font-size: 14px;
    border-radius: 5px;
    border-spacing: 0;
    text-align: center;
    margin-top: 4%;
    margin-bottom: 4%;
    margin-left: 2%;
    margin-right: 2%;
    width: 60%;
    height: 50%
}
body{
    background-color: #8d8741;
}
th{
    background: #659DbD;
    color: #FBEEC1;
    text-shadow: 0 1px 1px #BC986A;
    padding: 10px 20px;
}
th, td {
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #FBEEC1;
}
th:first-child, td:first-child {
    text-align: left;
}
th:first-child {
    border-top-left-radius: 10px;
}
th:last-child {
    border-top-right-radius: 10px;
    border-right: none;
}
td {
    font: 110%  system-ui;
    padding: 10px 20px;
    color: #5e4637;
    background: #DAAD86;
}
button[id="back_button"] {
    margin: 1%;
    color: #FBEEC1; /* цвет текста */
    text-decoration: none; /* убирать подчёркивание у ссылок */
    user-select: none; /* убирать выделение текста */
    background: #659DbD; /* фон кнопки */
    padding: .7em 1.5em; /* отступ от текста */
    outline: none; /* убирать контур в Mozilla */
    border-radius: 10px;
    cursor: pointer;
    display: block;
} 
button[id="back_button"]:hover { background: #a59d48(232,95,76); } /* при наведении курсора мышки */
button[id="back_button"]:active { background: #797337(152,15,0); } /* при нажатии */
select[id="sort_type"]{
    margin: 1%;
    background: #659DbD;
    color: #FBEEC1;
    border-radius: 10px;

}
button[id="redirect_btn"] {
    margin: 1%;
    color: #FBEEC1; /* цвет текста */
    text-decoration: none; /* убирать подчёркивание у ссылок */
    user-select: none; /* убирать выделение текста */
    background: #659DbD; /* фон кнопки */
    padding: .7em 1.5em; /* отступ от текста */
    outline: none; /* убирать контур в Mozilla */
    border-radius: 10px;
    cursor: pointer;
    display: block;
} 
.input-box {
    /* родительский блок относительно которого будем формировать положение
    тега label */
    position: relative;
    margin: 1%;
    display: flex
  }
input[name="root"] {
    background: #FBEEC1;
    padding: 10px;
    /* закруглим края у поля ввода */
    border-radius: 11px;
    width: 200px;
}

label[name="root-label"] {
    position: absolute;
    /* смещение относительно родительского элемента 10px вверх от верхнего края и   10px влево */
    top: -10px;
    left: 10px;
    background: #FBEEC1;
    padding: 0 5px;
    font-size:70%;
    color: #8d8741;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
}  
.data_block{
    width: 90%;
    background: #DAAD86;
    margin-top: 4%;
    margin-bottom: 4%;
    margin-left: 2%;
    margin-right: 2%;
    display: flex;
    position: relative;    
}
.canvas{
    max-width: 600px;
    max-height: 350px
}
</style>
<?php
    require('GetData.php');
    $data = GetData();
    $tempData = array();
    for ($i = 0; $i < count($data['sizeStr']); $i++){
        $tempData[$data['sizeStr'][$i]][] = $data['lead_time'][$i];
    }
    $tableData = array();
    foreach($tempData as $key => $val){
        $temp = 0;
        for($i = 0; $i < count($val); $i++){
            $temp += (int)$val[$i];
        }
        $tableData[$key] = $temp / count($val);
    }
    arsort($tableData);
?>
<script>
    window.onload = function() {
        var btnRedirect = document.querySelector("#back_button")
        btnRedirect.onclick = () => {
            window.location.href = 'http://localhost:8080/';
        }
        var data = <?php echo json_encode($tableData);?>;
        var ctx = document.getElementById("line-chart");
        new Chart(ctx, {
            type: 'line',
            color: '#000000',

            data: {
                labels: Object.keys(data),
                datasets: [{ 
                    data: Object.values(data),
                    label: "Среднее время выполнения, мс",
                    borderColor: "#FBEEC1",
                    fill: true,
                }
                ]
            },
            options: {
                borderColor: "#fbeec1",
                color: "#FBEEC1",
                title: {
                display: true,
                text: '',
                }
            }
        });
    }
</script>
</head>

<body>
    <button type="button" id="back_button">Назад</button>
    <div> <canvas id="line-chart" class="canvas" ></canvas></div>
    <article>
    <table>
        <thead>
          <tr>
            <th scope="col">Путь</th>
            <th scope="col">Размер файла</th>
            <th scope="col">Время выполнения, ms</th>
          </tr>
        </thead>
        <tbody>
        <?php
            $dataTable = GetData();
            for ($i = count($dataTable['sizeStr']) - 1; $i > 0; $i--) {
                echo "<tr>";
                echo "<td>" . $dataTable['root'][$i] . "</td>";
                echo "<td>" . $dataTable['sizeStr'][$i] . "</td>";
                echo "<td>" . $dataTable['lead_time'][$i] . "</td>";
                echo "<tr>";
            }
        ?>
        </tbody>
      </table>
    </article>
</body>
</html>