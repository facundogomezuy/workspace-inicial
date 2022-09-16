const ORDER_BY_PROD_COST_DESC = "Max.";
const ORDER_BY_PROD_COST_ASC = "Min.";
const ORDER_BY_RELE = "Relev.";
const SEARCH = "Search. "
let minCount = undefined;
let maxCount = undefined;
let container = document.getElementById("content");
let FETCH_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
let title = document.getElementById("prodTitle");
let productList =[]




fetch(FETCH_URL.concat(localStorage.getItem('catID')+ ".json"))
.then(response => response.json())
.then (data =>{
    title.innerHTML =`
        <h1>Productos<h1>
        <h4>Veras aqui todos los productos de la categoria ${data.catName}</h4>
    `   
    productsList = data.products
    console.log(productsList)
    show(productsList)

    //Redireccionamiento a product-info
    document.querySelectorAll('.products').forEach((clicked, i) =>{
        clicked.addEventListener('click', ()=>{
            localStorage.setItem("prodID", document.getElementsByClassName('products')[i].id)
            window.location.href ="./product-info.html"
        })
    })
});



//Funcion para mostrar los productos
function show(array){
    container.innerHTML = " "
    for(let i = 0; i < array.length; i++){
        let products = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
            container.innerHTML += `
                <div class="products" id="${products.id}">
                    <img src="${products.image}" alt="Imagen del producto">
                    <div class="description">
                        <h3>${products.name} - ${products.currency} ${products.cost}</h3>
                        <h6>${products.description}</h6>
                    </div>
                    <h5>${products.soldCount} vendidos</h5>
                </div>`;
        }
    }
}


//Funcion para ordenar el array que se le pase dependiendo del criterio que se ingrese
function sortCategories(criteria, array, value){
    let result = [];
    if (criteria === ORDER_BY_PROD_COST_DESC){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST_ASC){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELE){
        result = array.sort(function(a, b) {
            if (parseInt(a.soldCount) > parseInt(b.soldCount)){ return -1; }
            if (parseInt(a.soldCount) < parseInt(b.soldCount)){ return 1; }
            return 0;
        }); 
    }else if (criteria === SEARCH){
        result = array.filter(check)  
        function check(name){
            return name.name.toLowerCase().includes(value.toLowerCase()) || name.description.toLowerCase().includes(value.toLowerCase())
        }
    }
    return result;
}
 // AddEventListener para cada uno de los botones
 document.getElementById("sortAsc").addEventListener("click", function(){
    let orderedList = sortCategories(ORDER_BY_PROD_COST_ASC, productsList)
    show(orderedList);
})
document.getElementById("sortDesc").addEventListener("click", function(){
    let orderedList = sortCategories(ORDER_BY_PROD_COST_DESC, productsList)
    show(orderedList);
})
document.getElementById("sortByRele").addEventListener("click", function(){
    let orderedList = sortCategories(ORDER_BY_RELE, productsList)
    show(orderedList);
})

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }
    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }
    show(productsList);
})
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    show(productsList);
});
document.getElementById("searchBtn").addEventListener('keyup', function(){
    let value =  document.getElementById("searchBtn").value;
    let orderedList = sortCategories(SEARCH, productsList, value)
    show(orderedList);
    
});


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