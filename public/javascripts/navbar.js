
/**
 * Clears the sessionstorage on logout
 * */
function clearSessionStorage() {
    sessionStorage.clear()
    window.location = '\\logout';
}

