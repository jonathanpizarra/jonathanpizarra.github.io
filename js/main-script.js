// ===============================
let activeTab = "home"
// ===============================

$(function(){
    console.log("asf")

    const init = () =>{
        // trigger intro animation
        $(".block").removeClass("loading")
        $(".nav-item").removeClass("nav-item-hidden")
        setTimeout(() => {
            $("#home").addClass("block-active").removeClass("home-show")
        }, 750);
        
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
        
        $("#" + tab).removeClass("block-active")

    }

    const showActiveContent = (oldtab, newtab)=>{

        setTimeout(() => {
            $("." + oldtab + "-content").addClass('content-hidden')
            $("." + newtab + "-content").removeClass('content-hidden')
        }, 500);

    }

    const homeButtonListener = ()=>{
        if(activeTab === "home"){
            return
        }

        removeActive(activeTab)
        $("#home").addClass("block-active")
        showActiveContent(activeTab, 'home')

        activeTab = "home"
        $(".project").removeClass("project-show")

    }

    const infoButtonListener = ()=>{
        if(activeTab === "info"){
            return
        }

        removeActive(activeTab)
        $("#info").addClass("block-active")
        showActiveContent(activeTab, 'info')
        activeTab = "info"

        $(".project").removeClass("project-show")

        $(".info-content").animate({scrollTop : 0}, 500)


    }

    const projectsButtonListener = ()=>{
        if(activeTab === "projects"){
            return
        }

        removeActive(activeTab)
        $("#projects").addClass("block-active")
        showActiveContent(activeTab, 'projects')

        activeTab = "projects"

        // ==============================================
        $(".project").removeClass("project-show")
        // console.log($(".projects-content"))

        $(".projects-content").animate({scrollTop : 0})
        // $(".project1").addClass("project-show")

        let projs = $(".project")

        for(p of projs){

            if($(p).isInProjectViewport()){
                // console.log('is in vp', p)
                if(!$(p).hasClass("project-show")){
                    $(p).addClass("project-show")
                    // console.log("has class now", p)
                }
            }else{
                if($(p).hasClass("project-show")){
                    $(p).removeClass("project-show")
                    // console.log("removed class now", p)
                }
            }
            // break
            
        }

    }

    const connectButtonListener = ()=>{
        if(activeTab === "connect"){
            return
        }

        removeActive(activeTab)
        $("#connect").addClass("block-active")
        showActiveContent(activeTab, 'connect')

        activeTab = "connect"
        $(".project").removeClass("project-show")

    }



    // ===================================================

    $("#home").on("click", homeButtonListener)
    $("#info").on("click", infoButtonListener)
    $("#projects").on("click", projectsButtonListener)
    $("#connect").on("click", connectButtonListener)



    init()
})