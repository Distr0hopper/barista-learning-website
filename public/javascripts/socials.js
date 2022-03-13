/**
 * fetches all of the friends of the logged in user and displays them on the left side of the socials page
 * every username and their profile pic are stored in a button
 * when you click on that button the chat with said user opens
 * @param myId
 * @returns {Promise<void>}
 */
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
        let removeFriend = document.createElement("span");
        removeFriend.className = "text-white float-right square p-0"
        removeFriend.innerHTML = "&times;";
        removeFriend.setAttribute('id', friend.username);
        removeFriend.setAttribute("onclick","openUnfriendModal(this.id)");

        // removeFriend.onclick = openModal();

        button.appendChild(spanAvatar);
        button.appendChild(removeFriend);
        button.appendChild(nameSpan);
        button.appendChild(document.createElement("br"));
        button.appendChild(rankingSpan);
        button.onclick = function openChatNew(){
            document.getElementById("header-name").innerHTML = friend.username;
            document.getElementById("friends-name").innerHTML = friend.username;
            document.getElementById("header-username").innerHTML = friend.reward;
            document.getElementById("header-avatar").src = friend.profilePic;
            document.getElementById("level").innerHTML = "Level " + friend.level;
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

/**
 * creates a new friendship between two users and stores it in the database
 * is only called from the function search() to make sure that the user input is valid
 * after the friendship has been successfully saved the user is alerted that it worked and
 * the page is reloaded
 */
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
            // alert("You added a new friend!");
        document.getElementById("search-friends").innerHTML = "You added a new friend!";
    })
}

/**
 * searches for other users to become friends with. Only shows users, the logged in user is not already friends with
 * @returns {Promise<void>}
 */
async function search(){
    // fetches the user input from the html and fetches all of the users the logged in user is not friends with from the
    // database
    document.getElementById("search-friends").innerHTML = '';
    console.time("users");
    let response = await fetch("http://localhost:9000/social/getEveryone");
    console.timeEnd("users")
    let userlist = await response.json();

    // checks if the user input equals a real user
    let searchUser = document.getElementById("search-user").value;
    let userExists;
    userlist.forEach((user, i) => {
        if (user === searchUser){
            userExists = true;
        }
    })
    // if the user exists the username is displayed and a button to create a friendship is added
    if (userExists){
        let userbutton = document.createElement("button");
        userbutton.type = "button";
        userbutton.className = "btn btn-secondary rounded-pill px-3 ml-2 btn-sm py-0 px-2 ml-2";
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
        document.getElementById("search-friends").appendChild(div).className = "input-group";
        document.getElementById("search-friends").style.display = "block";
    }
    // otherwise an error message is displayed
    else{
        document.getElementById("search-friends").innerHTML = "This user does not exist";
    }
}


// here the messages will be stored later on
let messages = '';


/**
 * fetches the messages from the database via the SocialPageController
 * @returns {Promise<void>}
 */
async function getMessages(){
    messages = '';
    console.time("messages")
    let response = await fetch("http://localhost:9000/social/getMessages");
    console.timeEnd("messages")
    messages = await response.json();
}

/**
 * Displays the messages between the logged in user and one friend in the chat by first sorting them via senderId and then giving them
 * to createMessage() with the right sender
 * @param myId - id of the logged in user
 * @param friendId - friend the user wants to chat with
 */
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

/**
 * makes sure you can't send empty messages
 * @returns true when the user input is not empty.
 */
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

/**
 * sends the message to the SocialPage Controller via a JSON object
 */
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

/**
 * creates a new visual representation of the message
 * @param klasse - either 'my-message' or 'their-message'. Determines where the message is shown (on the left or the right side of the chat)
 * @param message - the text in the message
 */
function createMessage(klasse, message){
    let ul = document.getElementById("chat-list");
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.className = "clearfix my-2";
    div.className = klasse;
    div.appendChild((document.createTextNode(message)));
    li.appendChild(div);
    ul.appendChild(li);
    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight; // scroll down when there are more messages
}

/**
 * opens the warning modal "Are you sure you want to unfriend this user?"
 */
function openUnfriendModal(id){
    document.getElementById("delete-friend").innerHTML = id;
    $('#ModalUnfriendUser').modal('show');
}

/**
 * deletes the friendship between the logged in user and the chosen friend
 */
function deleteFriendship(){
    let friend = document.getElementById("delete-friend").innerHTML;
    const data = {
        friendName: friend
    }
    fetch("/social/deleteFriend", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if(response.ok) {
            window.location = response.url;
        } else {
            response.json()
        }})
}






