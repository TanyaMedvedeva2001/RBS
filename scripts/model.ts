export function getData(sortType:string, host:string, root:string, callback:(XMLHttpRequest["response"])){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host + 'dir?root=/home/' + root + '&sort=' + sortType);
    xhr.responseType = 'json'
    xhr.onerror = function(){
    }
    // 3. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function(){
        callback(xhr.response)
    }
    xhr.send()
}
