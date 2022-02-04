
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

async function createFriends(){
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
            document.getElementById("chat-history").style.display = "block";
            getMessages();
        };

        let li = document.createElement("li");
        li.className = "clearfix";
        li.appendChild(button);

        ul.appendChild(li);
    })
}
