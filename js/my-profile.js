document.getElementById('emailValue').value = localStorage.getItem('user')
document.querySelector("#display-image").style.backgroundImage = `url(${localStorage.getItem('imageProfile')})`
let userInfoParsed = JSON.parse(localStorage.getItem('userInfo'))
if(localStorage.getItem('userInfo') !== null){
    document.getElementById('firstName').value = userInfoParsed.firstName
    document.getElementById('secondName').value = userInfoParsed.secondName
    document.getElementById('lastName').value = userInfoParsed.lastName
    document.getElementById('secondLastName').value = userInfoParsed.secondLastName
    document.getElementById('emailValue').value = userInfoParsed.email
    document.getElementById('phoneNumber').value = userInfoParsed.phoneNumber
}

function loadLocal(){
    let userInfo = 
    {
        firstName: document.getElementById('firstName').value, 
        secondName: document.getElementById('secondName').value,
        lastName: document.getElementById('lastName').value, 
        secondLastName: document.getElementById('secondLastName').value,
        email: document.getElementById('emailValue').value, 
        phoneNumber: document.getElementById('phoneNumber').value
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}


const image_input = document.querySelector("#image-input");
image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    localStorage.setItem('imageProfile', uploaded_image)
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});
if(localStorage.getItem('user') == null){
    window.location.href = 'index.html'
}