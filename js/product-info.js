let FETCH_URL = 'https://japceibal.github.io/emercado-api/products/';
let FETCH_COMM_URL = 'https://japceibal.github.io/emercado-api/products_comments/';
let title = document.getElementsByClassName("title")[0]
let container = document.getElementsByClassName("containers")[0]
let imgAll = document.getElementsByClassName("imgAll")[0]
let imgSpec = document.getElementsByClassName("imgSpec")[0]
let allData = document.getElementsByClassName("allData")[0]
let comments = document.getElementsByClassName("comments")[0]
let rating = document.getElementsByClassName("rating")[0]
let productData = []
let commentData = []

fetch(FETCH_URL.concat(localStorage.getItem("prodID"))+ ".json")
.then(response => response.json())
.then (data =>{
    productData = data
    showProd()
    click()
});


function showProd(){
    for(let i=0; i<productData.images.length; i++){
        imgAll.innerHTML += `
            <img class="productImgList" src="${productData.images[i]}" alt="" style =" width:5vw; margin: 5px;">
        `
        imgSpec.innerHTML += `
            <img class="productImg" src="${productData.images[i]}" alt="" style =" width:30vw; ">
        ` 
    }
    //
    allData.innerHTML += `
            <h3>${productData.name}</h3>
            <h4>$ ${productData.cost}</h4>
            <h6>Más de ${productData.soldCount} productos vendidos </h6>
            <h6>Categoria: ${productData.category}</h6>
            <br>
            <br>
            <h6>Descripción </h6>
            <p>${productData.description}
        `
}

function click(){
    //cambiar de imagen al clickear
    let list = document.getElementsByClassName("productImgList")
    let spec = document.getElementsByClassName("productImg")

    list[0].className  = "productImgList active"
    spec[0].className  = "productImg active"
    document.querySelectorAll(".productImgList").forEach((event, index) => {
        event.addEventListener('click', ()=>{
            for(let i=0; i<productData.images.length; i++){
                list[i].className  = "productImgList"
                spec[i].className  = "productImg"
            }
            spec[index].className += " active"
            list[index].className += " active"
        })
    });
}


fetch(FETCH_COMM_URL.concat(localStorage.getItem("prodID"))+ ".json")
.then(response => response.json())
.then (data =>{
    commentData = data
    commentShow(true)
});

function commentShow(criterio){
    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;
    //Valoracion
    for(let i=0; i<commentData.length; i++){
        switch (commentData[i].score) {
            case 5:
                five += 1;
                break;
            case 4:
                four += 1;
                break;
            case 3:
                three += 1;
                break;
            case 2:
                two += 1;
                break;
            case 1:
                one += 1;
                break;
        }
        let appendHTML = ""
        for(let j=0; j<commentData[i].score; j++){
            appendHTML += `
                <i class="fa fa-star checked" aria-hidden="true"></i>           
            `
        }
        for(let y=0; y<5-commentData[i].score; y++){
            appendHTML += `
                <i class="fa fa-star" aria-hidden="true"></i>           
            `
        }
        
        comments.innerHTML += `
            <div style="margin: 30px 10%">
                <h8><i class="fa fa-user" aria-hidden="true"></i> <b>${commentData[i].user}</b></h8> <br>
                ${appendHTML}
                <p style="padding:0px; margin:0px;">${commentData[i].description}</p>
                <p style="padding:0px; margin:0px;">${commentData[i].dateTime}</p>
            </div>
        `
    }

    if(criterio == true && commentData.length >0){
        rating.innerHTML +=`
            <div style="display:flex;">
                <div class="w3-light-grey w3-round" style="width: 200px; margin-bottom:20px;">
                    <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*five}%; color:white; height:100%;">${100/commentData.length*five}%</div>
                </div>  
                <p style="margin-left:10px;">5 estrellas</p>
            </div>
            <div style="display:flex;">
                <div class="w3-light-grey w3-round" style="width: 200px; margin-bottom:20px;">
                    <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*four}%; color:white; height:100%;">${100/commentData.length*four}%</div>
                </div> 
                <p style="margin-left:10px;">4 estrellas</p>
            </div>
            <div style="display:flex;"> 
                <div class="w3-light-grey w3-round" style="width: 200px; margin-bottom:20px;">
                    <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*three}%; color:white; height:100%;">${100/commentData.length*three}%</div>
                </div> 
                <p style="margin-left:10px;">3 estrellas</p>
            </div>
            <div style="display:flex;">
                <div class="w3-light-grey w3-round" style="width: 200px; margin-bottom:20px;">
                    <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*two}%; color:white; height:100%;">${100/commentData.length*two}%</div>
                </div> 
                <p style="margin-left:10px;">2 estrellas</p>
            </div>
            <div style="display:flex;">
                <div class="w3-light-grey w3-round" style="width: 200px; margin-bottom:20px;">
                    <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*one}%; color:white; height:100%;">${100/commentData.length*one}%</div>
                </div> 
                <p style="margin-left:10px;">1 estrellas</p>
            </div>
        `
    }
}
//Poner comentarios al pulsar el boton
document.getElementById("btnComment").addEventListener('click', ()=>{
    let object = []
    let selected = JSON.parse(document.getElementById("starSelect").value)
    let user = localStorage.getItem('user');
    let day = new Date();
    //Completamos este objecto con la informacion del usuario
    object =
        {
            dateTime:day.toLocaleString(),
            description: document.getElementById("description").value,
            product: productData.id,
            score: selected,
            user
        }
    //Vaciamos y agregamos al array original de comentarios
    commentData.push(object)
    commentShow()
    document.getElementById("description").value = " "
})

//Mostrar la imagen del usuario dependiendo del tipo de logueo
if (localStorage.getItem("img") != null){
    document.getElementsByClassName("nav-item")[3].innerHTML += `
            <a class="nav-link" href="my-profile.html"><img src="${localStorage.getItem("img")}" class="google-img"> ${localStorage.getItem("user")}</a>
        `
    } else{
        document.getElementsByClassName("nav-item")[3].innerHTML += `
            <a class="nav-link" href="my-profile.html"><i class="fa fa-user"></i> ${localStorage.getItem("user")}</a>
        `
    }