
class CircularTimesTable{
    
    constructor(canv){
        this.canv = canv;
    
        this.h = window.innerHeight;
        this.w = window.innerWidth;
        this.pxr = window.devicePixelRatio;
        this.pxr = 2;
        this.hp = this.h * this.pxr;
        this.wp = this.w * this.pxr;
        this.r = this.hp/2-10;
        //
        this.setInt1;
        this.setInt2 ;
        //color vars
        this.color;
        this.red = 65;
        this.green = 15;
        this.blue = 245;
        this.redP = -1;
        this.greenP = 1;
        this.blueP = -1;
        //dimensions
        this.canv.height = this.hp;
        this.canv.width = this.wp;
        // canv.style.height = h + "px";
        // canv.style.width = w + "px";
        this.c = this.canv.getContext("2d");
        this.c.lineWidth = 1;
        //
        
        this.count = 0;
    }
    
    rad =(deg)=> deg * Math.PI / 180;
    dotX =(a)=> (this.wp/2) + this.r * Math.cos(this.rad(a));
    dotY =(a)=> (this.hp/2) + this.r * Math.sin(this.rad(a));
    
    clearc =()=>{
        this.c.beginPath();
        this.c.fillStyle = "#E4C3AD";
        this.c.fillRect(0, 0, this.wp, this.hp);
        this.c.closePath();
    }
    
    arc =()=>{
        this.c.beginPath();
        this.c.arc(this.wp/2, this.hp/2, this.r, 0, Math.PI*2);
        this.c.closePath();
        this.c.strokeStyle = "blue";
        this.c.stroke();
    }
    
    draw_lines = (count)=>{
        this.color = this.update_color();
        for(let j1=0; j1<500; j1++){
            this.c.beginPath();
            this.c.lineWidth = 1;
            this.c.moveTo(this.dotX(j1*0.72), this.dotY(j1*0.72));
            this.c.lineTo(this.dotX(j1*0.72*count), this.dotY(j1*0.72*count));
            this.c.closePath();
            this.c.strokeStyle = this.color;
            this.c.stroke();
        }
    }
    
    update_color =()=>{
        this.red += this.redP;
        this.green += this.greenP;
        this.blue += this.blueP;
        
        if(this.blue <= 0 || this.blue >= 255)
            this.blueP = -this.blueP;
        if(this.green <= 0 || this.green >= 200)
            this.greenP = -this.greenP;
        if(this.red <= 0 || this.red >= 255)
            this.redP = -this.redP;
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }
    
    init1 = ()=>{
      clearInterval(this.setInt2);
      this.setInt1 = setInterval(()=>{
    
        this.clearc();
        this.arc();
        this.draw_lines(this.count);
    
        this.count+=0.04;
        this.draw_stats();
      },70);
    }
    
    init2 =()=>{
        this.clearc();
        clearInterval(this.setInt);
        let input = prompt("Enter a number.\nTry 26, 56, 100, 102, 112, 76 or 72");
        
        let j1 = 0;
        stats.innerHTML = "N = " + input;
        this.setInt2 = setInterval(()=>{
            this.arc();
            this.c.beginPath();
            this.c.moveTo(this.dotX(j1*0.72), this.dotY(j1*0.72));
            this.c.lineTo(this.dotX(j1*input*0.72), this.dotY(j1*input * 0.72));
            this.c.closePath();
            this.c.strokeStyle = this.update_color();
            this.c.stroke();
            j1++;
            this.update_color();
            this.update_color();
            if(j1 >= 500){
                clearInterval(this.setInt2);
                return;
            }
        },70) ;
    }

    stop1 = ()=>{
        clearInterval(this.setInt1);
    }

    stop2 = ()=>{
        clearInterval(this.setInt2);
    }

    draw_stats = ()=>{
        this.c.beginPath();
        this.c.fillStyle = "#0d1f2d";
        this.c.font = "28px Montserrat";
        this.c.fillText('N = ' + this.count.toFixed(3), 10, 25);
        this.c.closePath();
    }

    setColor(r, g, b, rP, gP, bP){
        this.red = r;
        this.green = g;
        this.blue = b;
        this.redP = rP;
        this.greenP = gP;
        this.blueP = bP;
    }
    
    
    }
