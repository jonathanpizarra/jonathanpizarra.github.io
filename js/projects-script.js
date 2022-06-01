$(function(){

    // let paddingTop = null
    // let paddingBottom = null
    // let viewportTop = null
    // let viewportBottom = null
    
    $.fn.isInViewport = function() {


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

    $(".projects-content").scroll(function(){
        // console.log('scrolling...')

        let projs = $(".project")

        for(p of projs){

            if($(p).isInViewport()){
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
    })
})