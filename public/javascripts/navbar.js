/**
 * Clears the session storage on logout
 * */
function clearSessionStorage() {
    sessionStorage.clear()
    window.location = '\\logout';
}

