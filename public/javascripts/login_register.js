function checklogin() {
    // e.preventDefault();
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value
    }

    fetch("/verify/auth", {
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
// document.querySelector('.login_btn').onclick = checklogin()