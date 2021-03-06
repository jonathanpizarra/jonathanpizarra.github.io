let p3 = document.getElementsByClassName('col3')[0];
let p4 = document.getElementsByClassName('col4')[0];


const init_particles = ()=>{
    let canv, c, w, h, s, sp, r, dpr, count, speed;
    let field1;
    let colors = ["#E4C3AD", "#546A7B"];
    let bg = document.getElementById('projects-bg');

    bg.innerHTML = "<canvas id='proj-particles'></canvas>";
    canv = document.getElementById('proj-particles');
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = 2;
    s = 8;
    sp = 4;
    r = 2;
    count = 0;
    speed = 100;
    let bg_color = "rgba(13, 31, 45, 0.3)";
    let start = true;

    p3.addEventListener('mouseover', function(){
        if(start){
            field1 = new ParticleField(canv,w, h, dpr, s, sp, r, count, speed, colors, bg_color, true );
            field1.init();
            field1.draw();
            start = false;
        }else{
            bg.innerHTML = "<canvas id='proj-particles'></canvas>";
            canv = document.getElementById('proj-particles');
            let particles = field1.particles;
            field1 = new ParticleField(canv,w, h, dpr, s, sp, r, count, speed, colors, bg_color, true );
            field1.particles = particles;
            field1.draw();
        } 
    });

    p3.addEventListener('mouseleave', function(){
        field1.stop();
    });
}
init_particles();


init_circular = ()=>{
    let start = true;
    let bg = document.getElementById('projects-bg');
    p4.addEventListener('mouseover', function(){
        bg.innerHTML = "<canvas id='proj-circular'></canvas>";
        times_table();
    });
    
    p4.addEventListener('mouseleave', function(){
        
    });
}


