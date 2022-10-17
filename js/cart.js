const URL = 'https://japceibal.github.io/emercado-api/user_cart/'
const container = document.getElementsByClassName('container')[0]
const addProduct = document.getElementsByClassName('addProduct')[0]
var productArray= [];


fetch(URL+'25801.json')
.then(response=>response.json())
.then(data=>{
    productArray = []
    productArray[0] = data.articles[0]
    if(JSON.parse(localStorage.getItem('arrayProd'))!== null){
        for(let i=0; i<JSON.parse(localStorage.getItem('arrayProd')).length;i++){
            productArray.push(JSON.parse(localStorage.getItem('arrayProd'))[i])
        }
    }
    show(productArray)
    changeCount()
})



function show(productList){
    console.log(productList)
    for(let product of productList){
        addProduct.innerHTML += `
        <tr>
            <td><img src="${product.image}" style="width:50px;"></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" value="${product.count}" class="countRange"></td>
            <td class="subTotal">${product.currency} ${product.unitCost*product.count}</td>
        </tr>
    `
    }
    
}

function changeCount(){
    document.querySelectorAll('.countRange').forEach((element,index) => {
        element.addEventListener('input', ()=>{
            let subTotal = document.getElementsByClassName('subTotal')[index]
            subTotal.innerHTML = productArray[index].currency + ' ' + document.getElementsByClassName('countRange')[index].value*productArray[index].unitCost
        })
    });
}