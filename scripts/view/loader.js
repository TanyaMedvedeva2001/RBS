var Loader = /** @class */ (function () {
    function Loader() {
        this.loader = document.getElementById("preloader");
    }
    Loader.prototype.show = function () {
        if (this.loader) {
            this.loader.style.display = 'inline-block';
        }
        else {
            alert("Loader не найден");
        }
    };
    Loader.prototype.hide = function () {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
        else {
            alert("Loader не найден");
        }
    };
    return Loader;
}());
export { Loader };
