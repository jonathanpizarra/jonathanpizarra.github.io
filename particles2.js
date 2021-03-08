let canv, c, w, h, s, sp, r, dpr, width, height, count, speed, stats;
let setInt;
let field1, field2;

let particles = [];
// let colors = ["#ade4b3", "#ade4df", "#adc5e4", "#beade4", "#e4addf"];
// let colors = ["#f788e3", "#9b88f7", "#88e3f7", "#f7f588", "#95f788", "#f7b188"];
// let colors = ["#93d7e6", "#edea9f"];
// let colors = ["#88e3f7", "#f7f588"];
let colors = ["#E4C3AD", "#546A7B"];
let colors2 = ["#9EA3B0", "#FAE1DF"];

let default_directions = [[0,20], [20,0], [0,-20], [-20,0]];
let scroll_width;

class Particle{

    constructor(x, y, color, size, speed, ww, wh){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speed = speed;
        this.ww = ww;
        this.wh = wh;

        this.direction();
    }
    
    direction = ()=>{
        let i = Math.round(Math.random());
        if(i == 0){ // x
            this.dir_x = Math.ceil(Math.random() * 30) - 15;
            this.dir_y = 0;
        }else{ // y
            this.dir_y = Math.ceil(Math.random() * 30) - 15;
            this.dir_x = 0;
        }
    }

    update_pos = ()=>{
        if(this.dir_x == 0){
            if(this.dir_y < 0){
                this.y -= this.size;
                this.dir_y++;
                if(this.y < 0) this.y = this.wh - (this.wh % this.size);
            }else if(this.dir_y > 0){
                this.y += this.size;
                this.dir_y--;
                if(this.y > this.wh) this.y = 0;
            }else{
                this.direction();
            }

        }else if(this.dir_y == 0){
            if(this.dir_x < 0){
                this.x -= this.size;
                this.dir_x++;
                if(this.x < 0) this.x = this.ww - (this.ww % this.size);
            }else if(this.dir_x > 0){
                this.x += this.size;
                this.dir_x--;
                if(this.x > this.ww) this.x = 0;
            }else{
                this.direction();
            }
        }
    }

}

class ParticleField{
    constructor(canv, w, h, dpr, s, sp, r, count, speed, colors, bg, start){
        this.canv = canv;
        this.w = w;
        this.h = h;
        this.dpr = dpr;
        this.s = s; // square side length
        this.sp = sp;// multiplier for spacing between squares
        this.r = r;// corner radius of squares
        this.count = count;
        this.speed = speed;
        this.colors = colors;
        this.bg = bg;
        this.scroll_width = getScrollbarWidth();
        // this.w -= this.scroll_width;

        this.c = this.canv.getContext('2d');
        this.canv.width = w;
        this.canv.height = h;
        // this.canv.style.width = w;

        this.start = start;
        this.update = true;
        this.max = 100;
        this.particles = [];
    }

    init = ()=>{
        this.particles = [];
        this.count = 0;

        let color = 'transparent';
        this.c.fillStyle = color;
        this.c.fillRect(0, 0, this.w, this.h);
        this.c.closePath();


        for(let m=this.s*(this.s+this.sp); m<this.w; m+=this.s*(this.s+this.sp)){
            for(let n=this.s*(this.s+this.sp); n<this.h; n+=(this.s*(this.s+this.sp))){
                color = this.colors[Math.floor(Math.random() * this.colors.length)];
                // color = colors[0]; // testing
                this.particles.push(new Particle(m, n, color, this.s, this.s, this.w, this.h));
                this.particles[this.count].dir_x = default_directions[this.count%4][0];
                this.particles[this.count].dir_y = default_directions[this.count++%4][1];
               // console.log(color, m, n);
            }
        }
    
        //this.draw();
        this.canv.addEventListener('click', this.add_particle);
    
    }

    frame = ()=>{

        this.c.beginPath();
        this.c.fillStyle = this.bg;
        this.c.fillRect(0, 0, this.w, this.h);
        this.c.closePath();

        for(let n=0; n<this.particles.length; n++){
            if(!this.update){
                this.particles[n].update_pos();
            }
            this.c.beginPath();
            this.c.fillStyle = this.particles[n].color;
            styledRect(this.c, this.particles[n].x, this.particles[n].y, this.s);
            // c.fillRect(particles[n].x, particles[n].y, s, s);
            // c.closePath();
        }

        let len = this.particles.length;

        for(let n=0; n<len; n++){
            for(let m=n+1; m<len; m++){
                if(this.particles[n].x == this.particles[m].x && this.particles[n].y == this.particles[m].y){
                    if(this.particles[n].color === this.particles[m].color){
                        this.particles.splice(m, 1);
                        this.particles.splice(n, 1);
                        len -= 2;
                    }else{

                        this.particles[m].dir_x = default_directions[0][0];
                        this.particles[m].dir_y = default_directions[0][1];
                        this.particles[n].dir_x = default_directions[1][0];
                        this.particles[n].dir_y = default_directions[1][1];

                        for(let p=0; p<2; p++){
                            this.particles.push(new Particle(this.particles[n].x, this.particles[n].y, this.colors[Math.floor(Math.random() * this.colors.length)], this.s, this.speed, this.w, this.h));
                            this.particles[this.particles.length-1].dir_x = default_directions[2+p][0];
                            this.particles[this.particles.length-1].dir_y = default_directions[2+p][1]
                            this.c.fillStyle = this.particles[this.particles.length-1].c;
                            roundRect(this.c, this.particles[this.particles.length-1].x, this.particles[this.particles.length-1].y, this.s);

                        }
                        
                    }
                    
                }
            }
        }

        if(this.update) this.update = false;  
        if(!this.start)clearInterval(this.setInt);  

    }

    draw = ()=>{
    
        this.setInt = setInterval(this.frame, this.speed);
    
    }

    stop = ()=>{
        clearInterval(this.setInt);
    }

    add_particle = (e)=>{

        let x = e.clientX;
        let y = e.clientY + window.scrollY;
        console.log(x,y,window.scrollY)
        x = x - (x%this.s);
        y = y - (y%this.s);
    
        if(y > this.h) return;
    
        let exists = false;
        //clearInterval(setInt);
        for(let n=0; n<this.particles.length; n++){
            if( (x >= this.particles[n].x && x <= this.particles[n].x) && (y >= this.particles[n].y && y<= this.particles[n].y) ){
                this.particles.splice(n,1);
                exists = true;
                break;
            }
        }
    
        if(!exists){
            if(this.particles.length >= this.max){
                // particles = [];
                // clearInterval(setInt);
                // init();
                return;
            }
            let color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push(new Particle(x, y, color, this.s, this.s, this.w, this.h));
            this.c.fillStyle = this.particles[this.particles.length-1].color;
            styledRect(this.c, this.particles[this.particles.length-1].x, this.particles[this.particles.length-1].y, this.s);
        }
        
        
    }
    
}



function getScrollbarWidth() {
    // https://stackoverflow.com/a/13382873/12364598
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
  
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;
  
}

const roundRect = (c, x, y, s)=>{
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x+r, y);
    c.arc(x + s -r, y + r, r, 1.5*Math.PI, 2*Math.PI, false);
    c.lineTo(x + s, y + s - r);
    c.arc(x + s - r, y + s - r, r, 0, 0.5*Math.PI, false);
    c.lineTo(x + r, y + s);
    c.arc(x + r, y + s - r, r, 0.5*Math.PI, Math.PI, false);
    c.lineTo(x, y + r);
    c.arc(x + r, y + r, r, Math.PI, 1.5*Math.PI, false);
    c.closePath();
    c.fill();
}

const styledRect = (c, x, y, s)=>{
    c.beginPath();
    c.arc(x+r, y+r, r, 0.5*Math.PI, 2*Math.PI, false);
    c.arc(x+s-r, y+r, r, Math.PI, 0.5*Math.PI, false);
    c.arc(x+s-r, y+s-r, r, 1.5*Math.PI, Math.PI, false);
    c.arc(x+r, y+s-r, r, 0, 1.5*Math.PI, false);
    c.closePath();
    c.fill();
}


initialize = ()=>{
    canv = document.getElementById('particles');
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = 2;
    s = 8;
    sp = 4;
    r = 2;
    count = 0;
    speed = 100;
    let bg = "rgba(13, 31, 45, 0.3)";
    field1 = new ParticleField(canv, w*2, h, dpr, s, sp, r+1, count, speed, colors, bg, false);
    field1.init();
    field1.draw();

    bg = "rgba(228, 195, 173, 0.3)";
    canv = document.getElementById('particles2');
    speed = 120;
    field2 = new ParticleField(canv, w, h, dpr, s, sp, r, count, speed, colors2, bg, true);
    field2.init();
    field2.draw();

}

initialize();

window.onresize = function(){
    clearInterval(field1.setInt);
    field1.init();
    field1.draw();

    // clearInterval(field2.setInt);
    // field2.particles = [];
    // field2.init();
    // field2.draw();
}

function print_nav_timing_data() {
    // https://stackoverflow.com/a/53307588/12364598
    // Use getEntriesByType() to just get the "navigation" events
    var perfEntries = performance.getEntriesByType("navigation");
  
    for (var i=0; i < perfEntries.length; i++) {
      console.log("= Navigation entry[" + i + "]");
      var p = perfEntries[i];
      // dom Properties
      console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));
      console.log("DOM complete = " + p.domComplete);
      console.log("DOM interactive = " + p.interactive);
  
      // document load and unload time
      console.log("document load = " + (p.loadEventEnd - p.loadEventStart));
      console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));
  
      // other properties
      console.log("type = " + p.type);
      console.log("redirectCount = " + p.redirectCount);
    }
  }

if(performance.getEntriesByType("navigation")[0].type == 'reload'){
    location.href = 'index.html';
}