import { FileModel } from "./model/file_model";
import { Table } from "./view/table";
import { Control } from "./view/control";
var desc = "DESC", asc = "ASC";
var reqParam = { tempRoot: "/home/", sort: asc };
var fileModel = new FileModel(reqParam, callCreateTable);
var table = new Table(fileModel, callCreateTable, reqParam);
var control = new Control(fileModel, reqParam);
function callCreateTable(xhr) {
    var responseFiles = xhr.response;
    if (responseFiles['Status'] != 200) {
        alert("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043A\u043E\u0434 \u043E\u0448\u0438\u0431\u043A\u0438: ".concat(responseFiles['Status'], ", \n        \u0442\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438: ").concat(responseFiles['ErrorText']));
    }
    table.createTable(responseFiles['Data']);
    fileModel.loader.hide();
}
document.addEventListener("DOMContentLoaded", function () {
    table.init();
    control.init();
});
