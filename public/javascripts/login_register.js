function checklogin() {
    // e.preventDefault();
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value
    }

    fetch("/user/auth", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        console.log(response);
        if(response.ok) {
            response.text().then(res => sessionStorage.setItem("currentUser", res))
            window.location = response.headers.get("Location");
        } else {
            return response.json()
        }}).then(userData => {
        alert(userData.message);
        nameInput.value = "";
        passwordInput.value = "";
        nameInput.focus();
    })
}
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

    fetch("/user/checkCreateAccount", {
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
                passwordInput.focus();
    })
}