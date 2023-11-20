import { FileModel } from "./model/file_model";
import { Table } from "./view/table";
import { Control } from "./view/control";
var desc = "DESC", asc = "ASC";
var reqParam = { tempRoot: "/home/", sort: asc };
var fileModel = new FileModel(reqParam, callback);
var table = new Table(fileModel, callback, reqParam);
var control = new Control(fileModel, reqParam);
function callback(xhr) {
    var responseFiles = xhr.response;
    table.createTable(responseFiles);
    fileModel.loader.hide();
}
document.addEventListener("DOMContentLoaded", function () {
    table.init();
    control.init();
});
