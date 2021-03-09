let projects_bg = document.getElementById('projects-bg');
let cols = document.getElementsByClassName('col');
let navs = document.getElementsByClassName('nav-item');

let p1 = document.getElementsByClassName('col1')[0];
let p2 = document.getElementsByClassName('col2')[0];
let p3 = document.getElementsByClassName('col3')[0];
let p4 = document.getElementsByClassName('col4')[0];
let p5 = document.getElementsByClassName('col5')[0];
let p6 = document.getElementsByClassName('col6')[0];
let p7 = document.getElementsByClassName('col7')[0];
let p8 = document.getElementsByClassName('col8')[0];

const change_text_color = (els, color)=>{
    for(e of els){
        e.style.color = color;
    }
}

const add_class = (els, add, rem)=>{
    for(e of els){
        e.classList.remove(rem)
        e.classList.add(add);
    }
}


init_tetris = ()=>{
    let canv;
    let tetris;
    let board, current, next, coords, score;
    let start = true;
    p1.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<canvas id='tetris-canv'></canvas>";
        canv = document.getElementById('tetris-canv');
        if(start){
            tetris = new Tetris(canv);
            tetris.init();
            tetris.animate();
            start = false;
        }else{
            tetris = new Tetris(canv);
            tetris.init();
            tetris.board = board;
            tetris.current = current;
            tetris.next = next;
            tetris.coords = coords;
            tetris.score = score;
            tetris.animate();
        }
        projects_bg.style.backgroundColor = '#333';
        change_text_color(cols, '#E4C3AD');
        add_class(navs, 'light', 'dark');
    });

    p1.addEventListener('mouseleave', function(){
        tetris.stopAnimation();
        board = tetris.board;
        current = tetris.current;
        next = tetris.next;
        coords = tetris.coords;
        score = tetris.score;
    })
}
init_tetris();

init_slide = ()=>{
    let box, slide;

    p2.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<div id='box'></div>"
        slide = new SlidePuzzle();
        slide.matrix();
        slide.init_slide();
    })

    p2.addEventListener('mouseleave', function(){

    })
}
init_slide();

init_particles = ()=>{
    let canv, c, w, h, s, sp, r, dpr, count, speed;
    let field1;
    let colors = ["#E4C3AD", "#546A7B"];

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
        projects_bg.innerHTML = "<canvas id='proj-particles'></canvas>";
        canv = document.getElementById('proj-particles');
        if(start){
            field1 = new ParticleField(canv,w, h, dpr, s, sp, r, count, speed, colors, bg_color, true );
            field1.init();
            field1.draw();
            start = false;
        }else{
            
            canv = document.getElementById('proj-particles');
            let particles = field1.particles;
            field1 = new ParticleField(canv,w, h, dpr, s, sp, r, count, speed, colors, bg_color, true );
            field1.particles = particles;
            field1.draw();
        } 
        change_text_color(cols, '#FAE1DF');
        add_class(navs, 'light', 'dark');
    });

    p3.addEventListener('mouseleave', function(){
        field1.stop();
    });
}
init_particles();


init_circular = ()=>{
    let start = true;
    let canv;
    let times_table;

    p4.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<canvas id='proj-circular'></canvas>";
        canv = document.getElementById("proj-circular");
        
        if(start){
            
            times_table = new CircularTimesTable( canv );
            start = false;
        }else{
            let count = times_table.count;
            let red = times_table.red;
            let green = times_table.green;
            let blue = times_table.blue;
            let redP = times_table.redP;
            let greenP = times_table.greenP;
            let blueP = times_table.blueP;
    
            times_table = new CircularTimesTable( canv );
            times_table.count = count;
            times_table.setColor(red, green, blue, redP, greenP, blueP);
        }
        times_table.init1();
        change_text_color(cols, '#0d1f2d');
        add_class(navs, 'dark', 'light');
        setTimeout(()=>canv.style.opacity = 1, 50);
    });
    
    p4.addEventListener('mouseleave', function(){
        times_table.stop1();
    });
}
init_circular();

init_propositional = ()=>{
    projects_bg.innerHTML = "<div class='prop-container'><pre class='prop-text'></pre></div>";
    let txt;
    let prop;
    let index = 0;
    let rehover = false;
    p7.addEventListener("mouseover", function(){
        projects_bg.innerHTML = "<div class='prop-container'><pre class='prop-text'></pre></div>";
        txt = document.getElementsByClassName('prop-text')[0];
        prop = new PropositionAnimation(txt);
        projects_bg.style.backgroundColor = "#111";
        if(rehover){
            prop.start = index;
        }
        prop.draw();
        
        setTimeout(()=>txt.style.opacity = 1,50);
        change_text_color(cols, '#E4C3AD');
        add_class(navs, 'light', 'dark');
    });

    p7.addEventListener("mouseleave", function(){
        index = prop.index;
        prop.stop();
        rehover = true;
        
    });
}
init_propositional();

init_conway = ()=>{
    let conway, stats, canv;
    p5.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<div id='conway-stats'></div><canvas id='conway-canv'></canvas>";
        stats = document.getElementById('conway-stats');
        canv = document.querySelector('#conway-canv');
        conway = new Conway(canv, stats);
        conway.init();
        change_text_color(cols, '#E4C3AD');
        add_class(navs, 'light', 'dark');
       
    });

    p5.addEventListener('mouseleave', function(){
        conway.stop();
    })
}
init_conway();


init_pipboy = ()=>{
    p6.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<div id='pip-container'><img id='pip-boy-img' src='images/pip-boy.png'/></div>";
        setTimeout(()=>{document.getElementById('pip-boy-img').style.opacity = 1}, 50);
        change_text_color(cols, '#E4C3AD');
        add_class(navs, 'light', 'dark');
    })

    p6.addEventListener('mouseleave', function(){

    })
}
init_pipboy();

init_minesweeper = ()=>{
    let mine;
    let start = true;
    p8.addEventListener('mouseover', function(){
        projects_bg.innerHTML = "<div id='mine-tab'></div>";
        projects_bg.style.backgroundColor = "#E4C3AD";
            mine = new Minesweeper();
            mine.init();
            mine.simulate_click();
        change_text_color(cols, "#0d1f2d");
        add_class(navs, 'dark', 'light');
    })

    p8.addEventListener('mouseleave', function(){

    })
}
init_minesweeper();