import { Loader } from "../view/loader";
export class FileModel{
  
  reqParam : {tempRoot : string, 
              sort : string};
              callCreateTable : Function;
  xhr : XMLHttpRequest;
  loader = new Loader()
  constructor(reqParam : {tempRoot : string, sort : string}, callCreateTable : Function){
    this.reqParam = reqParam
    this.callCreateTable = callCreateTable
    this.xhr = new XMLHttpRequest();
  }
  getData(){
    const host: string = window.location.href
    this.loader.show()
    this.xhr.open('GET', host + 'dir?root=' + this.reqParam.tempRoot + '&sort=' + this.reqParam.sort);
    this.xhr.responseType = 'json'
    let xhrObj = this
    this.xhr.onerror = () => {
        alert(`Сервер не отвечает, статус: ${xhrObj.xhr.status}, текст ошибки: ${xhrObj.xhr.statusText}`)
    }
    // 3. Этот код сработает после того, как мы получим ответ сервера
    this.xhr.onload = () => {xhrObj.callCreateTable(xhrObj.xhr, xhrObj.reqParam, xhrObj)}
    this.xhr.send()
  }
}