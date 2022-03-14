/**
 * Check the input values from the login page.
 * Fetch the data to the server so it can be validated there.
 */
function checkLogin() {
    let nameInput = $('#username')
    let passwordInput =  $('#password');

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
        // console.log(response);
        if (response.ok) {
            response.text().then(res => sessionStorage.setItem("currentUser", res))
            window.location = response.headers.get("Location");
        } else {
            // window.alert("Wrong Username or Password");
            document.getElementById("alert-login").classList.add("alert", "alert-light");
            document.getElementById("alert-message").innerHTML = "Wrong username or password!";
            nameInput.value = "";
            passwordInput.value = "";
            nameInput.focus();
            return response.json();
        }
    })
}

// https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
// regexper.com - to understand the regex expression
/**
 * Checks if the email meets the requirements
 * @param email Email which the user typed in
 * @return {boolean} true if valid, else false
 */
function checkEmail(email) {
    let validEmail = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
    let emailError = document.getElementById("email-error");

    if (validEmail.test(email)) {
        emailError.innerHTML = '';
        return true;
    }

    emailError.innerHTML = "Email format should be like example@domain.com";
    return false;
}

/**
 * Checks if the username meets the requirements.
 * @param username Username which the user typed in
 * @return {boolean} true if valid, else false
 */
function checkUsername(username) {
    let nameError = document.getElementById("name-error");

    if (username.length >= 3 && username.length <= 25) {
        nameError.innerHTML = '';
        return true;
    }

    nameError.innerHTML = "Username should be between 3 and 25 characters";
    return false;
}

/**
 * Checks if the password meets the requirements.
 * @param password password which the user typed in
 * @return {boolean} true if valid, else false
 */
// https://www.section.io/engineering-education/password-strength-checker-javascript/
function checkPasswordStrength(password) {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let passwordStrengthError = document.getElementById("password-strength-error");

    if (strongPassword.test(password)) {
        passwordStrengthError.innerHTML = '';
        return true;
    }

    passwordStrengthError.innerHTML = "The password is not strong";
    return false;

}

/**
 * Checks if the two password fields have the same text.
 * @param password password which the user typed in
 * @param repeatedPassword repeated password thich the user typed in
 * @return {boolean} true if valid, else false
 */
function checkPasswords(password, repeatedPassword) {
    let passwordError = document.getElementById("password-error");

    if (checkPasswordStrength(password) && password === repeatedPassword) {
        passwordError.innerHTML = "";
        return true;
    }

    passwordError.innerHTML = "Passwords don't match";
    return false;
}

/**
 * Read the input values.
 * Check if they meets the requirements for valid inputs.
 * If yes, fetch them to the server so a user can be created there.
 * Else return specific error message.
 */
function checkCreateAccount() {

    let emailInput = $('#email');
    let nameInput = $('#username');
    let passwordInput = $('#password');
    let password2Input = $('#password2');

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        email: emailInput.value,
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value,
        password2: password2Input.value
    }

    if (checkEmail(userData.email) && checkUsername(userData.username) && checkPasswords(userData.password, userData.password2)) {
        fetch("/user/checkCreateAccount", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                window.alert("User created successfully")
                return window.location = response.url;
            } else {
                return response.json()
            }
        }).then(userData => {
            // alert(userData.message);
            document.getElementById("alert-auth").classList.add("alert", "alert-light");
            document.getElementById("alert-auth-message").innerHTML = userData.message;
            emailInput.value = "";
            nameInput.value = "";
            passwordInput.value = "";
            password2Input.value = "";
            passwordInput.focus();
        })
    } else {
        checkEmail(userData.email);
        checkUsername(userData.username);
        checkPasswords(userData.password, userData.password2);
        document.getElementById("alert-auth").classList.add("alert", "alert-light");
        document.getElementById("alert-auth-message").innerHTML = "The form couldn't be submitted. Check the errors!";
    }
}

/**
 * can press enter to trigger the login button
 */
$('html').keydown(function (e) {
    if (e.which === 13) {
        checkLogin();
        checkCreateAccount();
    }
});