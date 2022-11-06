let FETCH_URL = 'https://japceibal.github.io/emercado-api/products/';
let FETCH_COMM_URL = 'https://japceibal.github.io/emercado-api/products_comments/';
let title = document.getElementsByClassName("title")[0]
let container = document.getElementsByClassName("containers")[0]
let imgAll = document.getElementsByClassName("imgAll")[0]
let imgSpec = document.getElementsByClassName("imgSpec")[0]
let allData = document.getElementsByClassName("allData")[0]
let comments = document.getElementsByClassName("comments")[0]
let rating = document.getElementsByClassName("rating")[0]
let relatedBox = document.getElementsByClassName('relatedProduct')[0]
let carouselinner = document.getElementsByClassName('carousel-inner')[0]
let productData = []
let commentData = []

fetch(FETCH_URL.concat(localStorage.getItem("prodID"))+ ".json")
.then(response => response.json())
.then (data =>{
    productData = data
    showProd();
    click();
    related();
    refresh();
    cartSend();
    console.log(data)
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
            <p>${productData.description}</p>
            <button type="button" class="btn btn-success">Comprar</button>
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
    let varArray = [0,0,0,0,0];
    //Valoracion
    for(let i=0; i<commentData.length; i++){
        switch (commentData[i].score) {
            case 5:
                varArray[0] += 1;
                break;
            case 4:
                varArray[1] += 1;
                break;
            case 3:
                varArray[2] += 1;
                break;
            case 2:
                varArray[3] += 1;
                break;
            case 1:
                varArray[4] += 1;
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
    //Agregar la valoracion
    if(criterio == true && commentData.length >0){
        for(let i=0; i<5; i++){
            rating.innerHTML +=`
                <div style="display:flex;">
                    <div class="w3-light-grey w3-round" style="width: 30%; margin-bottom:20px;">
                        <div class="w3-container w3-round bg-dark" style="width:${100/commentData.length*varArray[i]}%; color:white; height:100%;">${Math.round(100/commentData.length*varArray[i])}%</div>
                    </div>  
                    <p style="margin-left:10px;">${5-i} estrellas</p>
                </div>
            `
        }
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
    commentData = []
    commentData.push(object)
    commentShow()
    document.getElementById("description").value = " "
})

//Productos relacionados
function related(){
    for(let i=0; i<productData.relatedProducts.length; i++){
        relatedBox.innerHTML += `
            <div class="relatedSpec" id="${productData.relatedProducts[i].id}">
                <img src="${productData.relatedProducts[i].image}" style="width:100%;">
                <h4>${productData.relatedProducts[i].name}</h4>
            </div>
        `
    }
    
}
//Recargamos la pagina con el producto relacionado seleccionado
function refresh(){
    document.querySelectorAll('.relatedSpec').forEach((clicked, i) =>{
        clicked.addEventListener('click', ()=>{
            localStorage.setItem("prodID", document.getElementsByClassName('relatedSpec')[i].id)
            window.location.href ="./product-info.html"
        })
    })
}

//Agregamos el producto al localstorage y vamos al carrito
function cartSend(){
    document.getElementsByClassName('btn-success')[0].addEventListener('click', ()=>{
        let prodArrayIni = []
        let isInside = false
        let productObject = {
            name: productData.name,
            count: 1,
            currency:productData.currency,
            unitCost: productData.cost,
            image: productData.images[0]    
        }
        prodArrayIni = JSON.parse(localStorage.getItem('arrayProd'))
        if(JSON.parse(localStorage.getItem('arrayProd')) !== null){
            for(i=0;i<prodArrayIni.length; i++){
                if(prodArrayIni[i].name ==productObject.name){
                    prodArrayIni[i].count +=1
                    isInside = true
                }
            }
            if(isInside == false){
                prodArrayIni.push(productObject)
            }   
        }else{
            prodArrayIni = []
            prodArrayIni[0] = productObject
        }
        localStorage.setItem('arrayProd', JSON.stringify(prodArrayIni))
        window.location.href = 'cart.html'
    })
}