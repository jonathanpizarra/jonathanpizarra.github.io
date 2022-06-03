let canv, c, w, h, s, sp, r, dpr, width, height, count, speed, stats;
let setInt;

let particles = [];
// let colors = ["#ade4b3", "#ade4df", "#adc5e4", "#beade4", "#e4addf"];
// let colors = ["#f788e3", "#9b88f7", "#88e3f7", "#f7f588", "#95f788", "#f7b188"];
// let colors = ["#93d7e6", "#edea9f"];
let colors = ["#88e3f7", "#f7f588"];

let default_directions = [[0,20], [20,0], [0,-20], [-20,0]];
let scroll_width;

let div = document.createElement('div');
div.innerHTML = "<p style='color:#f788e3;' >#f788e3</p>" + 
                "<p style='color:#9b88f7;' >#9b88f7</p>" +
                "<p style='color:#88e3f7;' >#88e3f7</p>" +
                "<p style='color:#f7f588;' >#f7f588</p>" +
                "<p style='color:#95f788;' >#95f788</p>" +
                "<p style='color:#f7b188;' >#f7b188</p>" ;                

document.getElementById("home").append(div);

class Particle{

    constructor(x, y, color, size, speed, ww, wh){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size; // width and height
        this.speed = speed;
        this.ww = ww; // horizontal boundary - container width
        this.wh = wh; // vertical boundary - container height

        this.dir_x = null;
        this.dir_y = null;

        this.direction(); // randomize direction
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
    constructor(canv, w, h, dpr, s, sp, r, count, speed, colors){
        this.canv = canv;
        this.w = w;
        this.h = h;
        this.dpr = dpr;
        this.s = s;
        this.sp = sp;
        this.r = r;
        this.count = count;
        this.speed = speed;
        this.colors = colors;

        this.c = this.canv.getContext('2d');
        this.canv.width = w;
        this.canv.height = h;
    }


    
}

const init = ()=>{
    canv = document.getElementById("particles");
    stats = document.getElementById("stats");
    c = canv.getContext("2d");
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = 2;
    scroll_width = getScrollbarWidth();
    console.log("scroll width: ", scroll_width);
    w -= scroll_width;
    canv.width = w;
    canv.height = h;
    
    s = 8; // square side length
    sp = 4; // multiplier for spacing between squares
    r = 3; // corner radius of squares
    count = 0;
    speed = 100;

    for(let m=s*(s+sp); m<w; m+=s*(s+sp)){
        for(let n=s*(s+sp); n<h; n+=(s*(s+sp))){
            let color = colors[Math.floor(Math.random() * colors.length)];
            // color = colors[0]; // testing
            particles.push(new Particle(m, n, color, s, s, w, h));
            particles[count].dir_x = default_directions[count%4][0];
            particles[count].dir_y = default_directions[count++%4][1];
           // console.log(color, m, n);
        }
    }

    console.log("c:", count)
    document.addEventListener('click', add_particle);

    draw();

}

const draw = ()=>{
    console.log(window.devicePixelRatio);

    let start = true;

    setInt = setInterval(function(){

        c.beginPath();
        c.fillStyle = "rgba(13, 31, 45, 0.3)";
        c.fillRect(0, 0, w, h);
        c.closePath();

        for(let n=0; n<particles.length; n++){
            if(!start){
                particles[n].update_pos();
            }
            c.beginPath();
            c.fillStyle = particles[n].color;
            roundRect(particles[n].x, particles[n].y, s);
            // c.fillRect(particles[n].x, particles[n].y, s, s);
            // c.closePath();
        }

        let len = particles.length;

        for(let n=0; n<len; n++){
            for(let m=n+1; m<len; m++){
                if(particles[n].x == particles[m].x && particles[n].y == particles[m].y){
                    if(particles[n].color === particles[m].color){
                        particles.splice(m, 1);
                        particles.splice(n, 1);
                        len -= 2;
                    }else{

                        particles[m].dir_x = default_directions[0][0];
                        particles[m].dir_y = default_directions[0][1];
                        particles[n].dir_x = default_directions[1][0];
                        particles[n].dir_y = default_directions[1][1];

                        for(let p=0; p<2; p++){
                            particles.push(new Particle(particles[n].x, particles[n].y, colors[Math.floor(Math.random() * colors.length)], s, speed, w, h));
                            particles[particles.length-1].dir_x = default_directions[2+p][0];
                            particles[particles.length-1].dir_y = default_directions[2+p][1]
                            c.fillStyle = particles[particles.length-1].c;
                            roundRect(particles[particles.length-1].x, particles[particles.length-1].y, s);

                        }
                        
                    }
                    
                }
            }
        }

        if(start) start = false;
        stats.innerHTML = "Particles: " + particles.length;

        clearInterval(setInt);

    },speed);

}

const add_particle = (e)=>{

    let x = e.clientX;
    let y = e.clientY + window.scrollY;
    console.log(x,y,window.scrollY)
    x = x - (x%s);
    y = y - (y%s);

    if(y > h) return;

    let exists = false;
    //clearInterval(setInt);
    for(let n=0; n<particles.length; n++){
        if( (x >= particles[n].x && x <= particles[n].x) && (y >= particles[n].y && y<= particles[n].y) ){
            particles.splice(n,1);
            exists = true;
            break;
        }
    }

    if(!exists){
        if(particles.length >= 75){
            // particles = [];
            // clearInterval(setInt);
            // init();
            return;
        }
        let color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, s, s, w, h));
        c.fillStyle = particles[particles.length-1].color;
        roundRect(particles[particles.length-1].x, particles[particles.length-1].y, s);
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

const roundRect = (x,y,s)=>{
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



init();
let x=0;
window.onresize = function(){
    particles = [];
    clearInterval(setInt);
    init();

   // console.log("resized", x++);
}