function checklogin() {
    // e.preventDefault();
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value
    }

    fetch("/auth", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.ok) {
            window.location = response.url;
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