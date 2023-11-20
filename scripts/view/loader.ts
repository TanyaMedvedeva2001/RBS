
export class Loader{

    loader = document.getElementById("preloader")!
    show(){
        if (this.loader){
            this.loader.style.visibility = 'visible'
        }
        else {
            alert("Loader не найден")
        }
    }
    hide(){
        if (this.loader){
            this.loader.style.visibility = 'hidden'
        }
        else {
            alert("Loader не найден")
        }
    }
}