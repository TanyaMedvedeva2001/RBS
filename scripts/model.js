"use strict";
function getData(sortType, host, tempRoot, callback) {
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
