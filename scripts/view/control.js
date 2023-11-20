var Control = /** @class */ (function () {
    function Control(fileModel, reqParam) {
        this.btnBack = document.querySelector("#back_button");
        this.select = document.querySelector("#sort_type");
        this.fileModel = fileModel;
        this.reqParam = reqParam;
    }
    Control.prototype.init = function () {
        var _this = this;
        var ctrl = this;
        this.btnBack.onclick = function () {
            if (ctrl.reqParam.tempRoot != "/home/") {
                ctrl.reqParam.tempRoot = ctrl.reqParam.tempRoot.substring(0, ctrl.reqParam.tempRoot.slice(0, -1)
                    .lastIndexOf('/') + 1);
                ctrl.fileModel.getData();
            }
        };
        this.select.onchange = function () {
            if (_this.select.value == "ASC") {
                ctrl.reqParam.sort = "ASC";
                ctrl.fileModel.getData();
            }
            else {
                ctrl.reqParam.sort = "DESC";
                ctrl.fileModel.getData();
            }
        };
    };
    return Control;
}());
export { Control };
