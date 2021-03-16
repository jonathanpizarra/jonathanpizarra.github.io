let all_btns, home_btn, about_btn, projects_btn, contact_btn, nav_items;
let clicked_nav_item = 0;

const init_btns = ()=>{
    all_btns = document.querySelectorAll('.nav li');
    nav_items = document.querySelectorAll(".nav-item");
    home_btn = document.getElementsByClassName('nav-home')[0];
    about_btn = document.getElementsByClassName('nav-about')[0];
    projects_btn = document.getElementsByClassName('nav-projects')[0];
    contact_btn = document.getElementsByClassName('nav-contact')[0];

    home_btn.addEventListener('click', function(){
        for(let n=0; n<all_btns.length; n++){
            all_btns[n].className = 'nav-home-color';
            nav_items[n].classList.remove('light');
            nav_items[n].classList.remove('dark');
        }
        home_btn.classList.add('nav-underline-100');
        about_btn.classList.remove('nav-underline-100');
        projects_btn.classList.remove('nav-underline-100');
        contact_btn.classList.remove('nav-underline-100');
        
        
        

        switch(clicked_nav_item){
            case 0:
                break;
            case 1:
                document.querySelector('#about').style.left = "100vw";
                show_name();
                show_home_animation();
                break;
            case 2:
                document.querySelector('#projects').style.top = "100vh";
                break;
            case 3:
                document.querySelector('#contact').style.top = "100vh";
                document.querySelector('#contact').style.left = "100vw";
                break;
        }


        clicked_nav_item = 0;
    })

    about_btn.addEventListener('click', function(){
        for(let n=0; n<all_btns.length; n++){
            all_btns[n].className = 'nav-about-color';
            nav_items[n].classList.remove('light');
            nav_items[n].classList.remove('dark');
        }
        about_btn.classList.add('nav-underline-100');
        home_btn.classList.remove('nav-underline-100');
        projects_btn.classList.remove('nav-underline-100');
        contact_btn.classList.remove('nav-underline-100');

        switch(clicked_nav_item){
            case 0:
                document.querySelector('#about').style.left = "0vw";
                hide_home_animation();
                break;
            case 1:
                break;
            case 2:
                document.querySelector('#projects').style.top = "100vh";
                break;
            case 3:
                document.querySelector('#contact').style.top = "100vh";
                document.querySelector('#contact').style.left = "100vw";
                break;
        }

        document.querySelector("#about").style.left = "0";

        clicked_nav_item = 1;
    })

    projects_btn.addEventListener('click', function(){
        for(let n=0; n<all_btns.length; n++){
            all_btns[n].className = 'nav-projects-color';
            nav_items[n].classList.remove('light');
            nav_items[n].classList.remove('dark');
        }
        projects_btn.classList.add('nav-underline-100');
        home_btn.classList.remove('nav-underline-100');
        about_btn.classList.remove('nav-underline-100');
        contact_btn.classList.remove('nav-underline-100');

        switch(clicked_nav_item){
            case 0:
                hide_home_animation();
                break;
            case 1:
                document.querySelector('#about').style.left = "100vw";
                break;
            case 2:
                break;
            case 3:
                document.querySelector('#contact').style.top = "100vh";
                document.querySelector('#contact').style.left = "100vw";
                break;
        }

        document.querySelector("#projects").style.top = "0";

        clicked_nav_item = 2;
    })

    contact_btn.addEventListener('click', function(){
        for(let n=0; n<all_btns.length; n++){
            all_btns[n].className = 'nav-contact-color';
            nav_items[n].classList.remove('light');
            nav_items[n].classList.remove('dark');
        }
        contact_btn.classList.add('nav-underline-100');
        home_btn.classList.remove('nav-underline-100');
        about_btn.classList.remove('nav-underline-100');
        projects_btn.classList.remove('nav-underline-100');


        switch(clicked_nav_item){
            case 0:
                hide_home_animation();
                break;
            case 1:
                document.querySelector('#about').style.left = "100vw";
                break;
            case 2:
                document.querySelector('#projects').style.top = "100vh";
                break;
            case 3:
                break;
        }
        document.querySelector("#contact").style.left = "0";
        document.querySelector("#contact").style.top = "0";
        clicked_nav_item = 3;
    })
}


which_button_was_clicked = (b)=>{
    if(b == 0){

    }
}





// init_home = ()=>{
//     let spaces = document.getElementsByClassName('space');
//     for(let s = 0; s<spaces.length; s++){
//         ((n)=>{
//             setTimeout(() => {
//                 spaces[n].classList.add('width-animation');
//             }, (spaces.length - n)*150);
//         })(s);
//     }
// }

show_name = ()=>{
    let names = document.querySelectorAll('.name');
    let webs = document.querySelectorAll('.web');
    let games = document.querySelectorAll('.game');
    let frames = document.querySelectorAll('.frame');

    for(let x=0; x<names.length; x++){
        ((x)=>{
            setTimeout(() => {
                names[x].classList.add('show-name');
            }, 200);

            setTimeout(() => {
                webs[x].classList.add('show-name');
            }, 300);

            setTimeout(() => {
                games[x].classList.add('show-name');
            }, 400);

            setTimeout(() => {
                frames[x].classList.add('show-frame');
            }, 100);
        })(x)
    }
}

hide_name = ()=>{
    let descs = document.querySelectorAll('.desc');
    for(let x=0; x<descs.length; x++){
        ((x)=>{
            setTimeout(() => {
                descs[x].classList.remove('show-name');
            }, 100);
        })(x);
    }
}

remove_home_animation = ()=>{
    let spaces = document.getElementsByClassName('space');
    for(let s = 0; s<spaces.length; s++){
        ((n)=>{
            setTimeout(() => {
                spaces[n].classList.remove('width-animation');
            }, (spaces.length - n)*150);
        })(s);
    }
}

hide_home_animation = ()=>{
    let spaces = document.getElementsByClassName('space');
    let frames = document.querySelectorAll('.frame');
    let i=0;
    for(let s = 0; s<spaces.length; s++){
        // ((s)=>{
            // setTimeout(() => {
                spaces[s].classList.add('width-animation-hide');
                spaces[s].classList.remove('width-animation');
                frames[s].classList.remove('show-frame');
                //break;
            // }, 200);
        // })(s);
    }
    hide_name();
}

show_home_animation = ()=>{
    let spaces = document.getElementsByClassName('space');
    for(let s=0; s<spaces.length; s++){
        ((n)=>{
            setTimeout(() => {
                spaces[n].classList.add('width-animation');
                spaces[n].classList.remove('width-animation-hide');
            }, 100);
        })(s);
    }
}


window.onload = function(){
    init_btns();
    show_home_animation();
    show_name();
}
