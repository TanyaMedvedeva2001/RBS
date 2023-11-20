
import { FileModel } from "../model/file_model"
import { SortType } from "..";
export class Control{
  btnBack!: HTMLButtonElement;
  select!: HTMLSelectElement;
  fileModel : FileModel;
  reqParam : {tempRoot : string, sort : string};
  constructor(fileModel : FileModel,
              reqParam : {tempRoot : string, sort : string}
              ){
                this.btnBack =  document.querySelector("#back_button")!;
                this.select = document.querySelector("#sort_type")!;
                this.fileModel = fileModel;
                this.reqParam = reqParam;
              }
  init(){
    let ctrl = this
    this.btnBack.onclick = () => {
      if (ctrl.reqParam.tempRoot != "/home/"){
        ctrl.reqParam.tempRoot = ctrl.reqParam.tempRoot.substring(0, ctrl.reqParam.tempRoot.slice(0, -1)
                                                                               .lastIndexOf('/') + 1)
        ctrl.fileModel.getData()
      }
    }
    this.select.onchange = () => {
      if (this.select.value == SortType.asc){
        ctrl.reqParam.sort = SortType.asc
        ctrl.fileModel.getData()
      }
      else{
        ctrl.reqParam.sort = SortType.desc
        ctrl.fileModel.getData()
      }
    }
  }
}
 