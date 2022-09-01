const ORDER_BY_PROD_COUNT_DESC = "Max.";
const ORDER_BY_PROD_COUNT_ASC = "Min.";
const ORDER_BY_RELE = "Relev.";
const SEARCH = "Search. "
let minCount = undefined;
let maxCount = undefined;
let container = document.getElementById("content");
let FETCH_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
let title = document.getElementById("prodTitle");



fetch(FETCH_URL.concat(localStorage.getItem('catID')+ ".json"))
.then(response => response.json())
.then (data =>{
    console.log(data)
    title.innerHTML =`
        <h1>Productos<h1>
        <h4>Veras aqui todos los productos de la categoria ${data.catName}</h4>
    `   
    let productsList = data.products
    console.log(productsList)
    show(productsList)
    document.getElementById("sortAsc").addEventListener("click", function(){
        let orderedList = sortCategories(ORDER_BY_PROD_COUNT_ASC, productsList)
        show(orderedList);
    })
    document.getElementById("sortDesc").addEventListener("click", function(){
        let orderedList = sortCategories(ORDER_BY_PROD_COUNT_DESC, productsList)
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
});
function show(array){
    container.innerHTML = " "
    for(let i = 0; i < array.length; i++){
        let products = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
            container.innerHTML += `
                <div class="products">
                    <img src="${products.image}" alt="Imagen de auto">
                    <div class="description">
                        <h3>${products.name} - ${products.currency} ${products.cost}</h3>
                        <h6>${products.description}</h6>
                    </div>
                    <h5>${products.soldCount}  vendidos</h5>
                </div>`;
        }
    }
}
function sortCategories(criteria, array, value){
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT_DESC){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT_ASC){
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
            let lowerCaseName =  name.name.toLowerCase();
            let upperCaseName =  name.name.toUpperCase();
            let lowerCaseDescription =  name.description.toLowerCase();
            let upperCaseDescription =  name.description.toUpperCase();
            return lowerCaseName.includes(value) || upperCaseName.includes(value) || lowerCaseDescription.includes(value) ||  upperCaseDescription.includes(value)
        }
    }
    return result;
}
if (localStorage.getItem("img") != null){
document.getElementsByClassName("nav-item")[3].innerHTML += `
        <a class="nav-link" href="my-profile.html"><img src="${localStorage.getItem("img")}" class="google-img"> ${localStorage.getItem("user")}</a>
    `
} else{
    document.getElementsByClassName("nav-item")[3].innerHTML += `
        <a class="nav-link" href="my-profile.html"><i class="fa fa-user"></i> ${localStorage.getItem("user")}</a>
    `
}