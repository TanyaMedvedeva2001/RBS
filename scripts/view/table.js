var Table = /** @class */ (function () {
    function Table(fileModel, callback, reqParam) {
        this.reqParam = reqParam;
        this.fileModel = fileModel;
        this.callback = callback;
    }
    Table.prototype.createTable = function (jsonObj) {
        var table = document.querySelector("#files");
        table.innerHTML = '';
        var arrFile = ['TypeFile', 'Name', 'StringSize'];
        var _loop_1 = function (i) {
            var typeFile = JSON.stringify(jsonObj[i]['TypeFile']).replace(/\"/g, "");
            var tr = document.createElement('tr');
            var _loop_2 = function (j) {
                var td = document.createElement('td');
                td.textContent = jsonObj[i][arrFile[j]].replace(/\"/g, "");
                tr.appendChild(td);
                var tableObj = this_1;
                if (typeFile == "Directory") {
                    tr.onclick = function () { tableObj.clickTable(jsonObj, i); };
                }
            };
            for (var j = 0; j < 3; j++) {
                _loop_2(j);
            }
            table.appendChild(tr);
        };
        var this_1 = this;
        for (var i in jsonObj) {
            _loop_1(i);
        }
        ;
        // console.log(jsonObj)
    };
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
