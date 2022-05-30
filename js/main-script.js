
let activeTab = "info"

$(function(){
    console.log("asf")

    const init = () =>{
        $(".block").removeClass("loading")
        $(".nav-item").removeClass("nav-item-hidden")
        
    }

    const removeActive = (tab)=>{
        
        $("#" + tab).removeClass("block-active")


        // if(tab === 'home'){
        //     $("#home").removeClass("block-active")
        // }else if(tab === 'projects'){
        //     $("#projects").removeClass("block-active")
        // }else if(tab === 'info'){
        //     $("#info").removeClass("block-active")
        // }else if(tab === 'connect'){
        //     $("#connect").removeClass("block-active")
        // }
        
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
    }

    const infoButtonListener = ()=>{
        if(activeTab === "info"){
            return
        }

        removeActive(activeTab)
        $("#info").addClass("block-active")
        showActiveContent(activeTab, 'info')
        activeTab = "info"
    }

    const projectsButtonListener = ()=>{
        if(activeTab === "projects"){
            return
        }

        removeActive(activeTab)
        $("#projects").addClass("block-active")
        showActiveContent(activeTab, 'projects')

        activeTab = "projects"

    }

    const connectButtonListener = ()=>{
        if(activeTab === "connect"){
            return
        }

        removeActive(activeTab)
        $("#connect").addClass("block-active")
        showActiveContent(activeTab, 'connect')

        activeTab = "connect"
    }



    // ===================================================

    $("#home").on("click", homeButtonListener)
    $("#info").on("click", infoButtonListener)
    $("#projects").on("click", projectsButtonListener)
    $("#connect").on("click", connectButtonListener)



    init()
})