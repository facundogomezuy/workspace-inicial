//Fetch a la pagina
fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
//Convertimos la promesa en un .json
.then(response => response.json())
.then (data =>{
    //Iteramos para cargar todo el array
    for(let i = 0; i < data.products.length; i++){
        //Agregamos la informacion con innerHTML
        document.getElementById("content").innerHTML += `
        <div class="products">
            <img src="${data.products[i].image}" alt="Imagen de auto">
            <div class="description">
                <h3>${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h3>
                <h6>${data.products[i].description}</h6>
            </div>
            <h5>${data.products[i].soldCount}  vendidos</h5>
        </div>`;
    }
});
