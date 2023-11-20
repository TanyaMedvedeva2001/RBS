import { FileModel } from "./model/file_model";
import { Table } from "./view/table";
import { Control } from "./view/control"

export enum SortType {
    asc = "ASC",
    desc = "DESC"
}
export interface iRespFile{
    status: number;
    errorText: string;
    data: any;
}

let reqParam = {tempRoot : "/home/", sort : SortType.asc}

let fileModel = new FileModel(reqParam, callCreateTable);
let table = new Table(fileModel, callCreateTable, reqParam);
let control = new Control(fileModel, reqParam);


function callCreateTable(xhr : XMLHttpRequest)
{
    let responseFiles : any = xhr.response 
    let respFile : iRespFile = { 
        status: responseFiles['Status'],
        errorText: responseFiles['ErrorText'],
        data: responseFiles['Data']
    }
    if (respFile.status != 200){
        alert(`Ошибка получения ответа от сервера, код ошибки: ${respFile.status}, 
        текст ошибки: ${respFile.errorText}`)
    }
    table.createTable(respFile);
    fileModel.loader.hide()
}

document.addEventListener("DOMContentLoaded", () => {
    table.init()
    control.init()
})