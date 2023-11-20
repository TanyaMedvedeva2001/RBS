import { Loader } from "../view/loader";
var FileModel = /** @class */ (function () {
    function FileModel(reqParam, callCreateTable) {
        this.loader = new Loader();
        this.reqParam = reqParam;
        this.callCreateTable = callCreateTable;
        this.xhr = new XMLHttpRequest();
    }
    FileModel.prototype.getData = function () {
        var host = window.location.href;
        this.loader.show();
        this.xhr.open('GET', host + 'dir?root=' + this.reqParam.tempRoot + '&sort=' + this.reqParam.sort);
        this.xhr.responseType = 'json';
        var xhrObj = this;
        this.xhr.onerror = function () {
            alert("\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442, \u0441\u0442\u0430\u0442\u0443\u0441: ".concat(xhrObj.xhr.status, ", \u0442\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438: ").concat(xhrObj.xhr.statusText));
        };
        // 3. Этот код сработает после того, как мы получим ответ сервера
        this.xhr.onload = function () { xhrObj.callCreateTable(xhrObj.xhr, xhrObj.reqParam, xhrObj); };
        this.xhr.send();
    };
    return FileModel;
}());
export { FileModel };
