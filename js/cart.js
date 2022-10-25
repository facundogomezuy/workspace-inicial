const URL = "https://japceibal.github.io/emercado-api/user_cart/";
const container = document.getElementsByClassName("container")[0];
const addProduct = document.getElementsByClassName("addProduct")[0];
var productArray = [];
let subTotalAdd = 0;

fetch(URL + "25801.json")
  .then((response) => response.json())
  .then((data) => {
    productArray = [];
    if (JSON.parse(localStorage.getItem("arrayProd")) !== null) {
      console.log("no ta");
      if (
        JSON.parse(localStorage.getItem("arrayProd"))[0].name !== "Peugeot 208"
      ) {
        productArray[0] = data.articles[0];
      }
      for (
        let i = 0;
        i < JSON.parse(localStorage.getItem("arrayProd")).length;
        i++
      ) {
        productArray.push(JSON.parse(localStorage.getItem("arrayProd"))[i]);
      }
    } else {
      productArray[0] = data.articles[0];
    }
    show(productArray);
    changeCount();
    payMethod();
    cost(productArray);
    deleteItem();
  });

function show(productList) {
  console.log(productList);
  for (let product of productList) {
    addProduct.innerHTML += `
        <tr class="productSp">
            <td><img src="${product.image}" style="width:50px;"></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" value="${
              product.count
            }" class="countRange" min="1"></td>
            <td class="subTotal">${product.currency} ${
      product.unitCost * product.count
    }</td>
            <td class="fa fa-trash"></td>
        </tr>
    `;
  }
}

function changeCount() {
  document.querySelectorAll(".countRange").forEach((element, index) => {
    element.addEventListener("input", () => {
      let subTotal = document.getElementsByClassName("subTotal")[index];
      productArray[index].count =
        document.getElementsByClassName("countRange")[index].value;
      subTotal.innerHTML =
        productArray[index].currency +
        " " +
        document.getElementsByClassName("countRange")[index].value *
          productArray[index].unitCost;
      cost(productArray);
    });
  });
}

function cost(productArray) {
  let total = 0;
  for (let i = 0; i < productArray.length; i++) {
    total += productArray[i].count * productArray[i].unitCost;
  }
  document.getElementById("subTotalCost").innerHTML = `
        <p>
            USD ${total}
        </p>
    `;
  if (document.getElementsByClassName("radioSend")[0].checked) {
    document.getElementById("shippingCost").innerHTML = `
            <p>
                USD ${(total / 100) * 15}
            </p>
        `;
    document.getElementById("Total").innerHTML = `
            <p>
                USD ${(total / 100) * 15 + total}
            </p>
        `;
  } else if (document.getElementsByClassName("radioSend")[1].checked) {
    document.getElementById("shippingCost").innerHTML = `
            <p>
                USD ${(total / 100) * 7}
            </p>
        `;
    document.getElementById("Total").innerHTML = `
            <p>
                USD ${(total / 100) * 7 + total}
            </p>
        `;
  } else if (document.getElementsByClassName("radioSend")[2].checked) {
    document.getElementById("shippingCost").innerHTML = `
            <p>
                USD ${(total / 100) * 5}
            </p>
        `;
    document.getElementById("Total").innerHTML = `
            <p>
                USD ${(total / 100) * 5 + total}
            </p>
        `;
  } else {
    document.getElementById("shippingCost").innerHTML = `
            <p>
                USD ${0}
            </p>
        `;
    document.getElementById("Total").innerHTML = `
            <p>
                USD ${total}
            </p>
        `;
  }
}

document.querySelectorAll(".radioSend").forEach((element, index) => {
  element.addEventListener("input", () => {
    cost(productArray);
  });
});

function payMethod() {
  console.log(document.getElementById("radioBank").checked);
  if (document.getElementById("radioCard").checked) {
    document.getElementById("selectedONo").style.color = "black"
    document.getElementById("selectedONo").innerHTML =
      "Ha seleccionado Tarjeta de credito";
    document.getElementsByClassName("inputBank")[0].disabled = true;
    document.getElementsByClassName("inputCredit")[0].disabled = false;
    document.getElementsByClassName("inputCredit")[1].disabled = false;
    document.getElementsByClassName("inputCredit")[2].disabled = false;
  } else if (document.getElementById("radioBank").checked) {
    document.getElementById("selectedONo").style.color = "black"
    document.getElementById("selectedONo").innerHTML =
      "Ha seleccionado Cuenta Bancaria";
    document.getElementsByClassName("inputBank")[0].disabled = false;
    document.getElementsByClassName("inputCredit")[0].disabled = true;
    document.getElementsByClassName("inputCredit")[1].disabled = true;
    document.getElementsByClassName("inputCredit")[2].disabled = true;
  } else {
    document.getElementById("selectedONo").innerHTML = "No ha seleccionado";
  }
}

function checkData(e) {
  let inputs = document.getElementsByClassName("form-control");
  let boolCheck = false;
  let i = 0;
  if(inputs[0].value == ""){
    inputs.checkValidity()
  }
  if(inputs[1].value == ""){
    inputs.checkValidity()
  }
  if(inputs[2].value == ""){
    inputs.checkValidity()
  }
  if (document.getElementById("radioCard").checked) {
    boolCheck =
      inputs[0].value !== "" &&
      inputs[1].value !== "" &&
      inputs[2].value !== "" &&
      inputs[3].value !== "" &&
      inputs[4].value !== "" &&
      inputs[5].value !== "";
      if(inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == ""){
        document.getElementById("selectedONo").innerHTML =
            "Ha seleccionado Tarjeta de credito";
        document.getElementById("selectedONo").innerHTML += ` <p class="alertData">Faltan datos</p>`
        }
  } else if (document.getElementById("radioBank").checked) {
    if(inputs[6].value == ""){
        document.getElementById("selectedONo").innerHTML += ` <p class="alertData">Faltan datos</p>`
    }
    boolCheck =
      inputs[0].value !== "" &&
      inputs[1].value !== "" &&
      inputs[2].value !== "" &&
      inputs[6].value !== "";
      document.getElementById("selectedONo").style.color = "black"
  } else {
    document.getElementById("selectedONo").style.color = "red";
    document.getElementById("selectedONo").innerHTML =
      "No ha seleccionado metodo de pago";
  }
  if (boolCheck) {
    document.getElementById("alertResult").classList.add("show");
    document.getElementById("selectedONo").innerHTML =
    "Listo" 
  }
  e.preventDefault();
}
function deleteItem() {
  document.querySelectorAll(".fa-trash").forEach((element, index) => {
    element.addEventListener("click", () => {
      document.getElementsByClassName("productSp")[index].remove();
      productArray.splice(index, 1);
      console.log(productArray);
      localStorage.setItem("arrayProd", JSON.stringify(productArray));
      cost(productArray);
      if (productArray.length == 0) {
        localStorage.removeItem("arrayProd");
      }
    });
  });
}