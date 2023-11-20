 import { FileModel } from "../model/file_model";

export class Table{
  fileModel : FileModel;
  callCreateTable : Function;
  reqParam : {tempRoot : string, sort : string};

  constructor(fileModel: FileModel,
              callCreateTable: Function,
              reqParam : {tempRoot : string,
                          sort : string})
  {
    this.reqParam = reqParam;
    this.fileModel = fileModel;
    this.callCreateTable = callCreateTable;

  }

  createTable(jsonObj: XMLHttpRequest["response"]['data'])
  {
    let table : Element = document.querySelector("#files") as Element;
    table.innerHTML! = ''
    for (let i in jsonObj) {
      let tr = document.createElement('tr');
      let tdType = document.createElement('td');
      tdType.textContent = jsonObj[i]['TypeFile'].replace(/\"/g, "")
      tr.appendChild(tdType)
      let tdName = document.createElement('td');
      tdName.textContent = jsonObj[i]['Name'].replace(/\"/g, "")
      tr.appendChild(tdName)
      let tdSize = document.createElement('td');
      tdSize.textContent = jsonObj[i]['StringSize'].replace(/\"/g, "")
      tr.appendChild(tdSize)
      // let tableObj = this
      if (jsonObj[i]['TypeFile'].replace(/\"/g, "") == "Directory"){
        tr.onclick = () => {this.clickTable(jsonObj, i)}
      }
      table.appendChild(tr);
    }
  };
  clickTable(jsonObj : XMLHttpRequest["response"]['data'], i : string){
    this.reqParam.tempRoot += jsonObj[i]['Name'] + '/';
    this.fileModel.getData()
  }

  init(){
      this.fileModel.getData()
  }
  
}

  

