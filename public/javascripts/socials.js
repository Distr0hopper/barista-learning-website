function openChat(name, username, source){
    document.getElementById("header-name").innerHTML = name;
    document.getElementById("header-username").innerHTML = username;
    document.getElementById("header-avatar").src = source;
    document.getElementById("select-friend").style.display = "none";
    document.getElementById("chat-history").style.display = "block";
    getMessages();
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

function search(){

}

const messages = ["myself:Hi", "friend:Hello, how are you?"]

function getMessages(){
    $('#chat-list').empty();
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i].split(":");
        if(message[0]==="myself"){
            createMessage("my-message", message[1]);
        }else{
            createMessage("their-message", message[1]);
        }
    }
}

function sendMessage(){
    let message = document.getElementById("message");
    createMessage("my-message", message.value);
    message.value = '';
}

function createMessage(klasse, message){
    let ul = document.getElementById("chat-list");
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.className = "clearfix";
    div.className = klasse;
    div.appendChild((document.createTextNode(message)));
    li.appendChild(div);
    ul.appendChild(li);
}
