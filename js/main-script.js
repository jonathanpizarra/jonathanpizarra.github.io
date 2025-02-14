// ===============================
let activeTab = "home"
// ===============================

$(function(){
    console.log("What are you looking for?")

    // =====================================
    let nameBoxes = $(".name-box-texts div p")
    let nameBars = $(".name-bar-texts div p")
    let letters = new Array(15).fill(1)
    let wins = 0
    let msgs = [
        'Dev',
        'Nothing to see here.',
    ]

    nameBoxes.each((index, element)=>{
        // $(element).addClass("bin")
        // $(nameBars[index]).addClass("bin")

        $(element).on("click", (e)=>{
            if(e.target.innerText.length == 1){

                let bin = e.target.innerText.charCodeAt(0).toString(2).padStart(8, '0')
                bin = bin.substring(0, 4) + ' ' + bin.substring(4)
                $(element).addClass("bin")
                $(nameBars[index]).addClass("bin")
                e.target.innerText = bin
                nameBars[index].innerText = bin

                letters[index] = 0
            }else if(e.target.innerText.length == 9){
                let dec = parseInt(e.target.innerText.split(' ').join(''), 2)
                let letter = String.fromCharCode(dec)
                $(element).removeClass("bin")
                $(nameBars[index]).removeClass("bin")
                e.target.innerText = letter
                nameBars[index].innerText = letter

                letters[index] = 1
            }

            if(letters.every((l)=> l == 0)){
                if( wins == 0) wins++
                $(".web-dev-text")[0].innerText = msgs[wins]
            }else{
                $(".web-dev-text")[0].innerText = msgs[0]
            }
        })
    })

    const animateName = (here) => {
        console.log('animate name called here', here)
        $('.name-bar').css({left: 'auto', right: 0, width: '0.5rem'})
        $('.name-bar-texts').css({left: 'auto', right: 0})
        $('.name-bar').delay(1250).animate({left: 'auto', right: 0, width: '100%'}, 900, () => {
            console.log('animation done');
            $('.name-bar-texts').css({left: 0, right: 'auto'})
        })
        $('.name-bar').animate({width: '0.5rem', right: 'auto', left: 0}, 900, () => {
            console.log('animation doneeeee')
            $('.name-container').hover(()=>{
                console.log('hovering...')
            })
        })
        // $('.name-bar-texts').delay(2500).animate({right:0, left: auto}, 2000)
        // $('.name-bar-texts').animate({left:0, right: auto}, 2000)
    }

    // =====================================

    const init = () =>{  
/** 
 * initial state:
 * - loader div is 100vw. tabs are 30px
 * - no transition style for tabs
 * - 
 * animate loader div width to 0 to show tabs
 * check which tab is active in hash
 * - if there is active tab in hash:
 *   set active hash into 100% width
 *   other tabs are still 30px
 *   add transition for all tabs
 *     - width, min-width, flex-grow
 *   this will animate active tab into flex-grow:1
 *   
 *   
 * - else: no active tab in hash:
 *   - default to home
 *   - set all tabs to 100vw: add .loading
 *   - add transition to animate
*/
console.log('initt')
        setTimeout(() => {
            console.log('remove nav-item-hidden')
            $(".nav-item").removeClass("nav-item-hidden")
        }, 1000);
        $('#loader').removeClass('loading')

        let hash = window.location.hash
        if(hash !== '' && hash !== '#home'){
            $(hash).addClass('block-active')
            $('#home').addClass('home-transition')
            $('#info').addClass('info-transition')
            $('#projects').addClass('projects-transition')
            $('#connect').addClass('connect-transition')
            console.log('hash add transition')
        }else{
            $('.block').addClass('loading')
    
            setTimeout(() => {
                $('#home').addClass('home-transition')
                $('#info').addClass('info-transition')
                $('#projects').addClass('projects-transition')
                $('#connect').addClass('connect-transition')
                $('.block').removeClass('loading')
                $('#home').addClass('block-active')
                animateName('if else settimeout init')
            }, 500);
        }
        
    }

    $.fn.isInProjectViewport = function() {


        let paddingTop = $(".projects-content").offset().top;
        let paddingBottom = $(window).height()- $(".projects-content").outerHeight() - paddingTop

        let viewportTop = $(window).scrollTop() ;
        let viewportBottom = viewportTop + $(window).height();
        
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
    
        // console.log("pt", paddingTop,"pb", paddingBottom, "vtop", viewportTop, 'eltop', elementTop, 'elbot', elementBottom, 'vtbot', viewportBottom)
        // console.log("w",$(window).height() , 'eloh', $(".projects-content").outerHeight()  , "offset :", ($(window).height() - $(".projects-content").outerHeight() ) )
        return elementBottom > (viewportTop + paddingTop) && elementTop < (viewportBottom - paddingBottom);
    };
    
    const removeActive = (tab)=>{
        console.log('active tab to remove', tab)
        $("#" + tab).removeClass("block-active").delay(500).removeClass('scrollable')

    }

    const showActiveContent = (oldtab, newtab)=>{

        setTimeout(() => {
            $("." + oldtab + "-content").addClass('content-hidden').removeClass('scrollable')
            $("." + newtab + "-content").removeClass('content-hidden').addClass('scrollable')
        }, 500);

    }

    const homeButtonListener = (e)=>{
        console.log('eeee', e)
        console.log('fucking active ', activeTab)
        // console.log('t', e.target)
        // console.log('stop prop', e.target.stopPropagation)
        // e.target.stopPropagation()
        if(e == undefined){
            console.log('e is undefined fucking undefind')
            return
        }
        if(activeTab === "home"){
            return
        }
        if(activeTab === "projects"){
            $(".project").removeClass("project-show")
            $(".project-description").addClass("project-description-hide")
        }
        window.location.hash = "#home"
        removeActive(activeTab)
        $("#home").addClass("block-active")
        showActiveContent(activeTab, 'home')
        animateName('homebutton listener')

        activeTab = "home"

    }

    const infoButtonListener = ()=>{
        if(activeTab === "info"){
            return
        }
        if(activeTab === "projects"){
            $(".project").removeClass("project-show")
            $(".project-description").addClass("project-description-hide")
        }
        window.location.hash = "#info"
        removeActive(activeTab)
        $("#info").addClass("block-active")
        showActiveContent(activeTab, 'info')
        activeTab = "info"

        $(".info-content").animate({scrollTop : 0}, 500)


    }

    const projectsButtonListener = ()=>{
        if(activeTab === "projects"){
            return
        }
        window.location.hash = "#projects"
        removeActive(activeTab)
        $(".project").removeClass("project-show")
        $(".project-description").removeClass("project-description-hide")
        $("#projects").addClass("block-active")
        showActiveContent(activeTab, 'projects')

        activeTab = "projects"

        // ==============================================
        
        // console.log($(".projects-content"))

        $(".projects-content").animate({scrollTop : 0})
        // $(".project1").addClass("project-show")

        let projs = $(".project")
        let first = true

        for(p of projs){

            if(first || $(p).isInProjectViewport()){
                if(!$(p).hasClass("project-show")){
                    $(p).addClass("project-show")
                    first = false
                }
            }else{
                if($(p).hasClass("project-show")){
                    $(p).removeClass("project-show")
                }
            }
            // break
            
        }

    }

    const connectButtonListener = ()=>{
        if(activeTab === "connect"){
            return
        }
        if(activeTab === "projects"){
            $(".project").removeClass("project-show")
            $(".project-description").addClass("project-description-hide")
        }
        window.location.hash = "#connect"
        removeActive(activeTab)
        $("#connect").addClass("block-active")
        showActiveContent(activeTab, 'connect')

        activeTab = "connect"

    }

    const hashChecker = () => {
        
        switch(document.location.hash){
            case '#home':
                homeButtonListener()
                break
            case '#info':
                infoButtonListener()
                break
            case '#projects':
                projectsButtonListener()
                break
            case '#connect':
                connectButtonListener()
                break
            default:
                homeButtonListener()
        }
    }


    // ===================================================

    $("#home").click(function (event) { event.stopPropagation(); homeButtonListener(event )} )
    $("#info").on("click", infoButtonListener)
    $("#projects").on("click", projectsButtonListener)
    $("#connect").on("click", connectButtonListener)
    window.addEventListener("popstate", hashChecker);

    // ===================================================
    init() 
    hashChecker()
    // ===================================================
})