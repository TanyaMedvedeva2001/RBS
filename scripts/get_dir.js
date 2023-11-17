"use strict";
// document.addEventListener('load', function () {
//   var preloader: HTMLElement = document.querySelector('#preloader') as HTMLElement;
//   preloader.style.display = 'none';
// });
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

    function getData(sortType, host, tempRoot, callback) {
        console.log(tempRoot)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', host + 'dir?root=/home/' + tempRoot + '&sort=' + sortType);
        xhr.responseType = 'json';
        xhr.onerror = function () {
        };
        // 3. Этот код сработает после того, как мы получим ответ сервера
        xhr.onload = function () {
            callback(xhr.response);
        };
        xhr.send();
    }
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
    // buttonBack функционал кнопки "назад"
    var buttonBack = document.querySelector('#back_button');
    // let buttonBack = document.querySelector('#back_button');
    buttonBack.onclick = function () { onClickBack(); };
    //selectSort функционал селектора сортировки
    var selectSort = document.querySelector('#sort_type');
    selectSort.onchange = function () { selectChange(selectSort.value); };
    function onClickBack() {
        if (tempRoot != "") {
            tempRoot = tempRoot.substring(0, tempRoot.slice(0, -1).lastIndexOf('/') + 1);
            updateTable();
        }
        else {
            alert("Вернуться дальше корня нельзя!");
        }
    }
    function selectChange(value) {
        if (value == "ASC") {
            sortType = "ASC";
            updateTable();
        }
        else {
            sortType = "DESC";
            updateTable();
        }
    }
});
