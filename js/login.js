document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-button").addEventListener('click', (event) => {
        event.preventDefault(); 
        
        //Variables
        let email = document.getElementById("email");
        let password = document.getElementById("contra");
        let alert_email = document.getElementById('emap');
        let alert_pass = document.getElementById('contrap');
        const svg = document.querySelectorAll('.svg');

        //Reseteamos las alertas de error
        alert_email.style.display = "none"
        alert_pass.style.display = "none"
        svg[0].setAttribute('id', '');
        svg[1].setAttribute('id', '');

        //Validamos las condiciones del login
        if(email.value.length > 0 && password.value.length > 0){
            window.location.href = "home.html";
        }else{  
            if(email.value.length > 0 && password.value.length <= 0){
                svg[1].setAttribute('id', 'none');
                alert_pass.style.display = "block"
            }
            else if (email.value.length <= 0 && password.value.length > 0){
                svg[0].setAttribute('id', 'none');
                alert_email.style.display = "block"
            }
            else{
                svg[0].setAttribute('id', 'none');
                svg[1].setAttribute('id', 'none');
                alert_email.style.display = "block"
                alert_pass.style.display = "block"
            }
        }
    })
  });