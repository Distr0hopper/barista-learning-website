function openPasswordModal(){
    if(document.getElementById("email").value.length !== 0 &&
        document.getElementById("password").value.length !== 0 &&
        document.getElementById("password2").value.length !== 0){
        if(document.getElementById("password").value === document.getElementById("password2").value){
            $('#passwordModal').modal('show');
        }
        else{
            document.getElementById("fehler").innerHTML = "Passwörter stimmen nicht überein";
        }
    }
    else{
        document.getElementById("fehler").innerHTML = "Bitte fülle alle Felder aus";
    }
}

function closePasswordModal(){
    $('#passwordModal').modal('hide');
}
