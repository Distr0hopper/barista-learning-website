async function createFriends(myId){
    console.time("friends")
    let response = await fetch("http://localhost:9000/social/friends");
    console.timeEnd("friends")
    let friendlist = await response.json();
    friendlist = friendlist.map(friend=>{
        friend.profile_pic = "../assets/images/coffee/" + friend.profile_pic;
        return friend
    })


    let ul = document.getElementById("friend-list");
    friendlist.forEach((friend, i) => {
        let button = document.createElement("button");
        button.className = "btn btn-friend";
        button.type = "button";
        let spanAvatar = document.createElement("span");
        spanAvatar.className = "btn avatar-background";
        let imgAvatar = document.createElement("img");
        imgAvatar.src = friend.profile_pic;
        spanAvatar.appendChild(imgAvatar);
        let nameSpan = document.createElement("span");
        nameSpan.className = "socialsName";
        nameSpan.innerHTML = friend.username;
        let rankingSpan = document.createElement("span");
        rankingSpan.className = "friendsRanking";
        rankingSpan.innerHTML = friend.ranking;

        button.appendChild(spanAvatar);
        button.appendChild(nameSpan);
        button.appendChild(document.createElement("br"));
        button.appendChild(rankingSpan);
        button.onclick = function openChatNew(){
            document.getElementById("header-name").innerHTML = friend.username;
            document.getElementById("header-username").innerHTML = friend.ranking;
            document.getElementById("header-avatar").src = friend.profile_pic;
            document.getElementById("points").innerHTML = friend.points;
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
    document.getElementById("friendsAvatar").src = document.getElementById("header-avatar").src;
    document.getElementById("friendsName").innerHTML = document.getElementById("header-name").innerHTML;
    document.getElementById("profilename").value = document.getElementById("header-username").innerHTML;
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
    console.time("users")
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

        //document.getElementById("friend-list").style.display = "none";
        document.getElementById("search-friends").style.display = "block";
    }
    else{
        document.getElementById("search-friends").appendChild(document.createTextNode("This user does not exist"));
        //document.getElementById("friend-list").style.display = "none";
        document.getElementById("search-friends").style.display = "block";
    }
}

let messages = '';

async function getMessages(){
    messages = '';
    /*for (let i = 0; i < messages.length; i++) {
        let message = messages[i].split(":");
        if(message[0]==="myself"){
            createMessage("my-message", message[1]);
        }else{
            createMessage("their-message", message[1]);
        }
    }*/
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

function sendMessage(){
    let message = document.getElementById("message").value;
    createMessage("my-message", message);
    let friend = document.getElementById("header-name").innerHTML;
    const messageData = {        //JSON objekt mit Keys und values nach Stringify
        message: message,
        friend: friend
    }

    fetch("/social/sendMessage", {
        method: 'POST',
        body: JSON.stringify(messageData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.ok) {
            return window.location = response.url;
        } else {
            return response.json()
        }})
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






