/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/get_dir.js":
/*!****************************!*\
  !*** ./scripts/get_dir.js ***!
  \****************************/
/***/ (() => {

eval("\n// document.addEventListener('load', function () {\n//   var preloader: HTMLElement = document.querySelector('#preloader') as HTMLElement;\n//   preloader.style.display = 'none';\n// });\ndocument.addEventListener('DOMContentLoaded', function () {\n\n    // 1. Создаём новый XMLHttpRequest-объект\n    var sortType = \"ASC\";\n    var host = window.location.href;\n    var tempRoot = \"\";\n\n    getData(sortType, host, tempRoot, function (response_) {\n        var table = document.querySelector('#files');\n        var jsonObj = response_;\n        createTable(jsonObj, table);\n    });\n\n    function getData(sortType, host, tempRoot, callback) {\n        console.log(tempRoot)\n        var xhr = new XMLHttpRequest();\n        xhr.open('GET', host + 'dir?root=/home/' + tempRoot + '&sort=' + sortType);\n        xhr.responseType = 'json';\n        xhr.onerror = function () {\n        };\n        // 3. Этот код сработает после того, как мы получим ответ сервера\n        xhr.onload = function () {\n            callback(xhr.response);\n        };\n        xhr.send();\n    }\n    //createTable создаёт новую таблицу на основе полученных данных\n    function createTable(jsonObj, table) {\n        var arrFile = ['TypeFile', 'Name', 'StringSize'];\n        for (var i in jsonObj) {\n            var typeFile = JSON.stringify(jsonObj[i]['TypeFile']).replace(/\\\"/g, \"\");\n            var tr = document.createElement('tr');\n            for (var j = 0; j < 3; j++) {\n                var td = document.createElement('td');\n                td.textContent = jsonObj[i][arrFile[j]].replace(/\\\"/g, \"\");\n                tr.appendChild(td);\n            }\n            if (typeFile == \"Directory\") {\n                newTableClick(jsonObj, tr, i);\n            }\n            table.appendChild(tr);\n        }\n        ;\n    }\n    ;\n    //newTableClick реакция на клик по имени директории\n    function newTableClick(jsonObj, tr, i) {\n        tr.onclick = function () {\n            tempRoot += jsonObj[i]['Name'] + '/';\n            updateTable();\n        };\n    }\n    //updateTable вызывает новый запрос и запсукает создание новой таблицы\n    function updateTable() {\n        getData(sortType, host, tempRoot, function (response) {\n            var table = document.querySelector('#files');\n            table.innerHTML = '';\n            var jsonObj = response;\n            createTable(jsonObj, table);\n        });\n    }\n    // buttonBack функционал кнопки \"назад\"\n    var buttonBack = document.querySelector('#back_button');\n    // let buttonBack = document.querySelector('#back_button');\n    buttonBack.onclick = function () { onClickBack(); };\n    //selectSort функционал селектора сортировки\n    var selectSort = document.querySelector('#sort_type');\n    selectSort.onchange = function () { selectChange(selectSort.value); };\n    function onClickBack() {\n        if (tempRoot != \"\") {\n            tempRoot = tempRoot.substring(0, tempRoot.slice(0, -1).lastIndexOf('/') + 1);\n            updateTable();\n        }\n        else {\n            alert(\"Вернуться дальше корня нельзя!\");\n        }\n    }\n    function selectChange(value) {\n        if (value == \"ASC\") {\n            sortType = \"ASC\";\n            updateTable();\n        }\n        else {\n            sortType = \"DESC\";\n            updateTable();\n        }\n    }\n});\n\n\n//# sourceURL=webpack://rbs/./scripts/get_dir.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/get_dir.js"]();
/******/ 	
/******/ })()
;