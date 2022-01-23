function openChat(name, username, source){
    document.getElementById("header-name").innerHTML = name;
    document.getElementById("header-username").innerHTML = username;
    document.getElementById("header-avatar").src = source;
    document.getElementById("select-friend").style.display = "none";
    document.getElementById("chat-history").style.display = "block";
}

function openModal(){
    document.getElementById("friendsAvatar").src = document.getElementById("header-avatar").src;
    document.getElementById("friendsName").innerHTML = document.getElementById("header-name").innerHTML;
    document.getElementById("profilename").value = document.getElementById("header-username").innerHTML;
    $('#friendModal').modal('show');
}

function closeModal(){
    $('#friendModal').modal('hide');
}


