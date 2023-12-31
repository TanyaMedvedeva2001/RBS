document.addEventListener('load', function () {
  var preloader: HTMLElement = document.querySelector('#preloader') as HTMLElement;
  preloader.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function(){
  function getData(sortType:string, host:string, tempRoot:string,callback:(XMLHttpRequest["response"])){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', host + 'dir?root=/home/' + tempRoot + '&sort=' + sortType);
    xhr.responseType = 'json'
    xhr.onerror = function(){
    }
    // 3. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function(){
        callback(xhr.response)
    }
    xhr.send()
  }
  // 1. Создаём новый XMLHttpRequest-объект
  let sortType: string = "ASC"
  const host: string = window.location.href
  let tempRoot: string = ""

  getData(sortType, host, tempRoot, function(response_: XMLHttpRequest) {
    let table: HTMLElement = document.querySelector('#files')!;
    let jsonObj: XMLHttpRequest["response"] = response_
    createTable(jsonObj, table)
  })
  
  //createTable создаёт новую таблицу на основе полученных данных
  function createTable (jsonObj:XMLHttpRequest["response"], table:Element)
  {
    const arrFile: string[] = ['TypeFile', 'Name', 'StringSize']
    for (let i in jsonObj) {
        let typeFile: string = JSON.stringify(jsonObj[i]['TypeFile']).replace(/\"/g, "")
        let tr = document.createElement('tr');
        for (let j = 0; j < 3; j++){
        let td = document.createElement('td');
        td.textContent = jsonObj[i][arrFile[j]].replace(/\"/g, "")
        tr.appendChild(td)
        }
        if (typeFile == "Directory"){
        newTableClick(jsonObj, tr, i)
        }
        table.appendChild(tr);
    };
  };

//newTableClick реакция на клик по имени директории
  function newTableClick (jsonObj:XMLHttpRequest["response"], tr:HTMLElement, i:string)
  {
    tr.onclick = function(){ 
    tempRoot += jsonObj[i]['Name'] + '/'
    updateTable()
    }
  }

//updateTable вызывает новый запрос и запсукает создание новой таблицы
  function updateTable(){
    getData(sortType, host, tempRoot, function(response:XMLHttpRequest["response"]) {
        let table = document.querySelector('#files')!;
        table!.innerHTML = '';
        let jsonObj = response
        createTable(jsonObj, table)
    }) 
  }
  // buttonBack функционал кнопки "назад"
  let buttonBack: HTMLButtonElement = document.querySelector('#back_button') as HTMLButtonElement;
  // let buttonBack = document.querySelector('#back_button');
  buttonBack.onclick = function(){onClickBack()}

  //selectSort функционал селектора сортировки
  let selectSort: HTMLSelectElement= document.querySelector('#sort_type') as HTMLSelectElement;
  selectSort.onchange = function(){selectChange(selectSort.value)}
  
  function onClickBack(){
    if (tempRoot != ""){
      tempRoot = tempRoot.substring(0, tempRoot.slice(0, -1).lastIndexOf('/') + 1)
      updateTable()
    }
    else {
      alert("Вернуться дальше корня нельзя!")
    }
  }  
   
  function selectChange(value: string){
    if (value == "ASC"){
        sortType = "ASC"
        updateTable()
    }
    else{
        sortType = "DESC"
        updateTable()
    }
  }
});