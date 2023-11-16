import { getData } from "./model.js";
document.addEventListener('DOMContentLoaded', function () {
    // 1. Создаём новый XMLHttpRequest-объект
    var sortType = "ASC";
    var host = window.location.href;
    var tempRoot = "";
    getData(sortType, host, tempRoot, function (response_) {
        var table = document.querySelector('#files');
        var jsonObj = response_;
        createTable(jsonObj, table);
    });
    //createTable создаёт новую таблицу на основе полученных данных
    function createTable(jsonObj, table) {
        var arrFile = ['TypeFile', 'Name', 'StringSize'];
        for (var i in jsonObj) {
            var typeFile = JSON.stringify(jsonObj[i]['TypeFile']).replace(/\"/g, "");
            var tr = document.createElement('tr');
            for (var j = 0; j < 3; j++) {
                var td = document.createElement('td');
                td.textContent = jsonObj[i][arrFile[j]].replace(/\"/g, "");
                tr.appendChild(td);
            }
            ;
            if (typeFile == "Directory") {
                newTableClick(jsonObj, tr, i);
            }
            table.appendChild(tr);
        }
        ;
    }
    ;
    //newTableClick реакция на клик по имени директории
    function newTableClick(jsonObj, tr, i) {
        tr.onclick = function () {
            tempRoot += jsonObj[i]['Name'] + '/';
            updateTable();
        };
    }
    //updateTable вызывает новый запрос и запсукает создание новой таблицы
    function updateTable() {
        getData(sortType, host, tempRoot, function (response) {
            var table = document.querySelector('#files');
            table.innerHTML = '';
            var jsonObj = response;
            createTable(jsonObj, table);
        });
    }
    function onClickBack() {
        if (tempRoot != "") {
            tempRoot = tempRoot.substring(0, tempRoot.slice(0, -1).lastIndexOf('/') + 1);
            updateTable();
        }
        else {
            alert("Вернуться дальше корня нельзя!");
        }
    }
    // buttonBack функционал кнопки "назад"
    var buttonBack = document.querySelector('#back_button');
    // let buttonBack = document.querySelector('#back_button');
    buttonBack.onclick = onClickBack;
    function selectChange(e) {
        if (e.target.value == "ASC") {
            sortType = "ASC";
            updateTable();
        }
        else {
            sortType = "DESC";
            updateTable();
        }
    }
    //selectSort функционал селектора сортировки
    var selectSort = document.querySelector('#sort_type');
    selectSort.onchange = selectChange;
});
