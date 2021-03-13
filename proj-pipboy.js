
class PipAnimation{
    constructor(container){
        this.container = document.getElementById(container);
        this.speed = 500;
        this.i = 1;
        this.container.innerHTML = "<img src='images/pip" + this.i + ".png' class='pip-visible' />";

        for(let x=2; x<8; x++){
            this.container.innerHTML += "<img src='images/pip" + x + ".png' class='pip-invisible' />";
        }
        this.images = document.querySelectorAll("#pip-container img");
        this.i = 0;
    }

    animate = ()=>{
        let img;
        this.setInt = setInterval(()=>{
            for(let x=0; x<7; x++){
                if(x == this.i){
                    this.images[x].className = "pip-visible";
                }else{
                    this.images[x].className = "pip-invisible";
                }
            }

            this.i++;
            if(this.i >= 7){
                this.i = 0;
            }
        }, this.speed);
        
    }

}