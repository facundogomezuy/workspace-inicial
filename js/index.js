document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    if (localStorage.getItem("img") != null){
        document.getElementsByClassName("nav-item")[3].innerHTML += `
                <a class="nav-link" href="my-profile.html"><img src="${localStorage.getItem("img")}" class="google-img"> ${localStorage.getItem("user")}</a>
            `
    } else{
            document.getElementsByClassName("nav-item")[3].innerHTML += `
                <a class="nav-link" href="my-profile.html"><i class="fa fa-user"></i> ${localStorage.getItem("user")}</a>
            `
    }
});