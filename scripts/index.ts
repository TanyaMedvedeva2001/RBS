import { FileModel } from "./model/file_model";
import { Table } from "./view/table";
import { Control } from "./view/control"


const desc = "DESC",
      asc = "ASC";

let reqParam = {tempRoot : "/home/", sort : asc}

let fileModel = new FileModel(reqParam, callback);
let table = new Table(fileModel, callback, reqParam);
let control = new Control(fileModel, reqParam);


function callback(xhr : XMLHttpRequest)
{
    let responseFiles = xhr.response
    table.createTable(responseFiles);
    fileModel.loader.hide()
}

document.addEventListener("DOMContentLoaded", () => {
    table.init()
    control.init()
})