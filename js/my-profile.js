if (localStorage.getItem("img") != null){
    document.getElementsByClassName("nav-item")[3].innerHTML += `
            <a class="nav-link" href="my-profile.html"><img src="${localStorage.getItem("img")}" class="google-img"> ${localStorage.getItem("user")}</a>
        `
    } else{
        document.getElementsByClassName("nav-item")[3].innerHTML += `
            <a class="nav-link" href="my-profile.html"><i class="fa fa-user"></i> ${localStorage.getItem("user")}</a>
        `
    }