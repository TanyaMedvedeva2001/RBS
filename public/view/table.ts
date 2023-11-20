 import { FileModel } from "../model/file_model";
import { iRespFile } from "../index"
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

  createTable(jsonObj: iRespFile)
  {
    let dataJson = jsonObj.data
    let table : Element = document.querySelector("#files") as Element;
    table.innerHTML! = ''
    for (let i in jsonObj) {
      let tr = document.createElement('tr');
      let tdType = document.createElement('td');
      tdType.textContent = dataJson[i]['TypeFile'].replace(/\"/g, "")
      tr.appendChild(tdType)
      let tdName = document.createElement('td');
      tdName.textContent = dataJson[i]['Name'].replace(/\"/g, "")
      tr.appendChild(tdName)
      let tdSize = document.createElement('td');
      tdSize.textContent = dataJson[i]['StringSize'].replace(/\"/g, "")
      tr.appendChild(tdSize)
      // let tableObj = this
      if (dataJson[i]['TypeFile'].replace(/\"/g, "") == "Directory"){
        tr.onclick = () => {this.clickTable(jsonObj, i)}
      }
      table.appendChild(tr);
    }
  };
  clickTable(jsonObj : iRespFile, i : string){

    this.reqParam.tempRoot += jsonObj.data[i]['Name'] + '/';
    this.fileModel.getData()
  }

  init(){
      this.fileModel.getData()
  }
  
}

  

