import { FileModel } from "./model/file_model";
import { Table } from "./view/table";
import { Control } from "./view/control"


const desc = "DESC",
      asc = "ASC";

let reqParam = {tempRoot : "/home/", sort : asc}

let fileModel = new FileModel(reqParam, callCreateTable);
let table = new Table(fileModel, callCreateTable, reqParam);
let control = new Control(fileModel, reqParam);


function callCreateTable(xhr : XMLHttpRequest)
{
    let responseFiles = xhr.response
    if (responseFiles['Status'] != 200){
        alert(`Ошибка получения ответа от сервера, код ошибки: ${responseFiles['Status']}, 
        текст ошибки: ${responseFiles['ErrorText']}`)
    }
    table.createTable(responseFiles['Data']);
    fileModel.loader.hide()
}

document.addEventListener("DOMContentLoaded", () => {
    table.init()
    control.init()
})