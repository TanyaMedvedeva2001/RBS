export function getData(sortType, host, root, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host + 'dir?root=/home/' + root + '&sort=' + sortType);
    xhr.responseType = 'json';
    xhr.onerror = function () {
    };
    // 3. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.send();
}
