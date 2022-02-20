async function createFriends(myId){
    console.time("friends")
    let response = await fetch("http://localhost:9000/social/friends");
    console.timeEnd("friends")
    let friendlist = await response.json();


    let ul = document.getElementById("friend-list");
    friendlist.forEach((friend, i) => {
        let button = document.createElement("button");
        button.className = "btn btn-friend";
        button.type = "button";
        let spanAvatar = document.createElement("span");
        spanAvatar.className = "btn avatar-background";
        let imgAvatar = document.createElement("img");
        imgAvatar.src = friend.profilePic;
        imgAvatar.style.height = '40px';
        spanAvatar.appendChild(imgAvatar);
        let nameSpan = document.createElement("span");
        nameSpan.className = "socialsName";
        nameSpan.innerHTML = friend.username;
        let rankingSpan = document.createElement("span");
        rankingSpan.className = "friendsRanking";
        rankingSpan.innerHTML = friend.reward;

        button.appendChild(spanAvatar);
        button.appendChild(nameSpan);
        button.appendChild(document.createElement("br"));
        button.appendChild(rankingSpan);
        button.onclick = function openChatNew(){
            document.getElementById("header-name").innerHTML = friend.username;
            document.getElementById("friends-name").value = friend.username;
            document.getElementById("header-username").innerHTML = friend.reward;
            document.getElementById("header-avatar").src = friend.profilePic;
            document.getElementById("points").innerHTML = friend.points;
            document.getElementById("friends-avatar").src = friend.profilePic;
            document.getElementById("friends-ranking").innerHTML = friend.reward;
            document.getElementById("timestamp").innerHTML = friend.timestamp.toString();
            document.getElementById("select-friend").style.display = "none";
            document.getElementById("search-friends").style.display = "none";
            document.getElementById("chat-history").style.display = "block";
            openMessages(myId, friend.id);
        };

        let li = document.createElement("li");
        li.className = "clearfix";
        li.appendChild(button);

        ul.appendChild(li);
    })
}

function openModal(){
    $('#friendModal').modal('show');
}

function closeModal(){
    $('#friendModal').modal('hide');
}

function createFriendship() {
    let friend = document.getElementById("search-user");
    const friendData = {        //JSON objekt mit Keys und values nach Stringify
        username: friend.value,
    }

    fetch("/social/createFriendship", {
        method: 'POST',
        body: JSON.stringify(friendData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.ok) {
            return window.location = response.url;
        } else {
            return response.json()
        }}).then(friend => {
            alert("You added a new friend!");
    })
}

async function search(){
    document.getElementById("search-friends").innerHTML = '';
    console.time("users");
    let response = await fetch("http://localhost:9000/social/getEveryone");
    console.timeEnd("users")
    let userlist = await response.json();


    let searchUser = document.getElementById("search-user").value;
    let userExists;
    userlist.forEach((user, i) => {
        if (user === searchUser){
            userExists = true;
        }
    })
    if (userExists){
        let userbutton = document.createElement("button");
        userbutton.type = "button";
        userbutton.className = "btn btn-search";
        userbutton.id = "add-friend"
        userbutton.textContent = "Add as friend";
        userbutton.onclick = createFriendship;

        let userFound = document.createElement("input");
        userFound.className = "form-control rounded";
        userFound.id = "user-found";
        userFound.disabled = true;
        userFound.value = searchUser;
        let div = document.createElement("div");
        div.appendChild(userFound);
        div.appendChild(userbutton);
        document.getElementById("search-friends").appendChild(div);
        document.getElementById("search-friends").style.display = "block";
    }
    else{
        document.getElementById("search-friends").innerHTML = "This user does not exist";
        document.getElementById("search-friends").style.color = "white";
        document.getElementById("search-friends").style.display = "block";
    }
}

let messages = '';

async function getMessages(){
    messages = '';
    console.time("messages")
    let response = await fetch("http://localhost:9000/social/getMessages");
    console.timeEnd("messages")
    messages = await response.json();
}

function openMessages(myId, friendId){
    $('#chat-list').empty();
    messages.forEach((message, i) => {
        if (message.senderId === friendId){
            createMessage("their-message", message.text);
        }
        else if(message.senderId === myId && (message.idUser1 === friendId || message.idUser2 === friendId)){
            createMessage("my-message", message.text);
        }
    })
}

function validateForm() {
    let message = document.getElementById("message").value;
    if (message == null || message == "") {
        // alert("You cannot send an empty message!");
        return false;
    } else {
        return true;
    }
}

// send message by pressing enter
$('html').keydown(function(e){
    if(e.which==13 && validateForm()){
        sendMessage();
    }
});

function sendMessage(){
    if (validateForm()) {
        let message = document.getElementById("message").value;
        createMessage("my-message", message);
        let friend = document.getElementById("header-name").innerHTML;
        const messageData = {        //JSON objekt mit Keys und values nach Stringify
            message: message,
            friend: friend
        }
        document.getElementById("message").value = '';
        fetch("/social/sendMessage", {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.ok) {
                console.log(response);
            } else {
                response.json()
            }})
    }
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






