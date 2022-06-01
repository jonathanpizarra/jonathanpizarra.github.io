$(function(){

    $(".info-text").css({minWidth : $(".info-container").width() + "px"})

    $.fn.isInInfoViewport = function() {

        let paddingTop = $(".info-content").offset().top;
        let paddingBottom = $(window).height()- $(".info-content").outerHeight() - paddingTop

        let viewportTop = $(window).scrollTop() ;
        let viewportBottom = viewportTop + $(window).height();
        
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
    
        //  console.log("pt", paddingTop,"pb", paddingBottom, "vtop", viewportTop, 'eltop', elementTop, 'elbot', elementBottom, 'vtbot', viewportBottom)
        // console.log("w",$(window).height() , 'eloh', $(".projects-content").outerHeight()  , "offset :", ($(window).height() - $(".projects-content").outerHeight() ) )
        return elementBottom > (viewportTop + paddingTop) && elementTop < (viewportBottom - paddingBottom);
    };


    $(".info-content").scroll(function(){
        let skills = $(".skill")

        for(let s of skills){
            if($(s).isInInfoViewport()){
                if(!$(s).hasClass('skill-show')){
                    $(s).addClass("skill-show")
                    // console.log("class addded...")
                }
            }else{
                if($(s).hasClass('skill-show')){
                    $(s).removeClass("skill-show")
                    // console.log("class removed..")
                }
            }
        }
    })


})