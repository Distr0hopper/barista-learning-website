/*function createAccount(){
    let name = false;
    let email = false;
    let password = false;
    if (document.getElementById("email").value.length !== 0 &&
        document.getElementById("username").value.length !== 0 &&
        document.getElementById("password").value.length !== 0 &&
        document.getElementById("password2").value.length !== 0){
        name = true;
        email = true;
        if(document.getElementById("password").value === document.getElementById("password2").value){
            password = true;
            location.href = '/home';
        }
        else{
            document.getElementById("fehler").innerHTML = "Passwörter stimmen nicht überein";
        }
    }
    else{
        document.getElementById("fehler").innerHTML = "Bitte fülle alle Felder aus";
    }
}*/

function checkCreateAccount() {
    // e.preventDefault();
    let emailInput = document.getElementById("email");
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let password2Input = document.getElementById("password2");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        email: emailInput.value,
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value,
        password2: password2Input.value
    }

    fetch("/auth1", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.ok) {
            return window.location = response.url;
        } else {
            return response.json()
        }}).then(userData => {
        alert(userData.message);
        emailInput.value = "";
        nameInput.value = "";
        passwordInput.value = "";
        password2Input.value = "";
        emailInput.focus();
    })
}
