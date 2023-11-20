 import { FileModel } from "../model/file_model";

export class Table{
  fileModel : FileModel;
  callback : Function;
  reqParam : {tempRoot : string, sort : string};

  constructor(fileModel: FileModel,
              callback: Function,
              reqParam : {tempRoot : string,
                          sort : string})
  {
    this.reqParam = reqParam;
    this.fileModel = fileModel;
    this.callback = callback;

  }

  createTable(jsonObj: XMLHttpRequest["response"])
  {
      let table : Element = document.querySelector("#files") as Element;
      table.innerHTML! = ''
      const arrFile: string[] = ['TypeFile', 'Name', 'StringSize']
      for (let i in jsonObj) {
        let typeFile: string = JSON.stringify(jsonObj[i]['TypeFile']).replace(/\"/g, "")
        let tr = document.createElement('tr');
        for (let j = 0; j < 3; j++){
          let td = document.createElement('td');
          td.textContent = jsonObj[i][arrFile[j]].replace(/\"/g, "")
          tr.appendChild(td)
          let tableObj = this
          if (typeFile == "Directory"){
            tr.onclick = () => {tableObj.clickTable(jsonObj, i)}
          }
        }
        table.appendChild(tr);
      };
      // console.log(jsonObj)

  }
  clickTable(jsonObj : XMLHttpRequest["response"], i : string){
    this.reqParam.tempRoot += jsonObj[i]['Name'] + '/';
    this.fileModel.getData()
  }

  init(){
      this.fileModel.getData()
  }
  
}

  

