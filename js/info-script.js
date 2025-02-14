$(function(){

    // $(".info-text").css({minWidth : $(".info-container").width() + "px"})
    // $(".info-text").css({width : $(".info-container").width() + "px"})


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

    // Nothing to see here.....
    let interval
    let panicState = false
    $(".skill-springboot").each((i, e) => {
        console.log(panicState)
        $(e).on("click", ()=>{
            // if(panicState) return
            panicState = true
            console.log('entereedd')
            $(".skills-title-backend")[0].innerText = "What have you done!?"
            const r = Math.floor(Math.random() * (255 - 100 + 1)) + 100;
            const g = Math.floor(Math.random() * (255 - 100 + 1)) + 100;
            const b = Math.floor(Math.random() * (255 - 100 + 1)) + 100;
            const color = `rgb(${r}, ${g}, ${b})`
            document.documentElement.style.setProperty("--light", color)
            $(".skills-title-backend").addClass('skills-title-light')
            // interval = setInterval(()=>{
            //     const r = Math.floor(Math.random() * (255 - 100 + 1)) + 100;
            //     const color = `rgb(${r}, 200, 200)`
            //     document.documentElement.style.setProperty("--light", color)
            //     $(".skills-title-backend").addClass('skills-title-light')
            // }, 100)
        })
        
    })

    $(".skill-sonarqube").each((i, e) => {
        console.log(panicState)
        $(e).on("click", ()=>{
            if(!panicState) return
            panicState = false
            console.log('sonar cube entereed')
            $(".skills-title-backend")[0].innerText = "BACKEND"
            document.documentElement.style.setProperty("--light", "#f9f9f9")
            $(".skills-title-backend").removeClass('skills-title-light')
            clearInterval(interval)
        })        
        
    })

    $.fn.isInProjectViewport = function() {

        let paddingTop = $(".skills-content").offset().top;
        let paddingBottom = $(window).height()- $(".skills-content").outerHeight() - paddingTop

        let viewportTop = $(window).scrollTop() ;
        let viewportBottom = viewportTop + $(window).height();
        
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
    
        return elementBottom > (viewportTop + paddingTop) && elementTop < (viewportBottom - paddingBottom);
    };

    $(".skillss-content").scroll(function(){
        console.log('scrolling...')

        let skills = $(".skill")

        for(s of skills){

            if($(s).isInProjectViewport()){
                // console.log('is in vp', s)
                if(!$(s).hasClass("skill-show")){
                    $(s).addClass("skill-show")
                    // console.log("has class now", p)
                }
            }else{
                if($(s).hasClass("skill-show")){
                    $(s).removeClass("skill-show")
                    // console.log("removed class now", p)
                }
            }
            
        }
    })

})