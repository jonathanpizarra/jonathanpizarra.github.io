let all_btns, home_btn, about_btn, projects_btn, contact_btn, nav_items;

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
    })
}


init_btns();