// ===============================
let activeTab = "home"
// ===============================

$(function(){
    console.log("asf")

    const init = () =>{
        $(".block").removeClass("loading")
        $(".nav-item").removeClass("nav-item-hidden")
        setTimeout(() => {
            $("#home").addClass("block-active").removeClass("home-show")
        }, 750);
        
    }

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
        $(".project1").addClass("project-show")

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