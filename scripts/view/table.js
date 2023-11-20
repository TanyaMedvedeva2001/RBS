var Table = /** @class */ (function () {
    function Table(fileModel, callCreateTable, reqParam) {
        this.reqParam = reqParam;
        this.fileModel = fileModel;
        this.callCreateTable = callCreateTable;
    }
    Table.prototype.createTable = function (jsonObj) {
        var _this = this;
        var table = document.querySelector("#files");
        table.innerHTML = '';
        var _loop_1 = function (i) {
            var tr = document.createElement('tr');
            var tdType = document.createElement('td');
            tdType.textContent = jsonObj[i]['TypeFile'].replace(/\"/g, "");
            tr.appendChild(tdType);
            var tdName = document.createElement('td');
            tdName.textContent = jsonObj[i]['Name'].replace(/\"/g, "");
            tr.appendChild(tdName);
            var tdSize = document.createElement('td');
            tdSize.textContent = jsonObj[i]['StringSize'].replace(/\"/g, "");
            tr.appendChild(tdSize);
            // let tableObj = this
            if (jsonObj[i]['TypeFile'].replace(/\"/g, "") == "Directory") {
                tr.onclick = function () { _this.clickTable(jsonObj, i); };
            }
            table.appendChild(tr);
        };
        for (var i in jsonObj) {
            _loop_1(i);
        }
    };
    ;
    Table.prototype.clickTable = function (jsonObj, i) {
        this.reqParam.tempRoot += jsonObj[i]['Name'] + '/';
        this.fileModel.getData();
    };
    Table.prototype.init = function () {
        this.fileModel.getData();
    };
    return Table;
}());
export { Table };
