let canEdit = false;
/**editUsername checks weather the variable canEdit is false
 * if so the profileName id from the inputField in the HTML is changed from readOnly to being able to be edited
 * And the button of the editButton is changed to "Save"
 * can Edit is now true
 * If canEdit is already true when editUsername() is called it calls saveUsername()*/
function editUsername() {
    if (canEdit === false) {
        $("#profilename").toggleClass('d-none d-block');
        $("#cancel").toggleClass('d-none d-block');
        document.querySelector('#profilename').readOnly = false;
        document.querySelector('#edit_button').textContent = "Save";
        canEdit = true;
    } else {
        saveUsername()
    }
}

function cancelEdit(){
    $("#profilename").toggleClass('d-none d-block');
    $("#cancel").toggleClass('d-none d-block');
    document.querySelector('#profilename').readOnly = true;
    document.querySelector('#edit_button').textContent = "Edit Username";
    canEdit = false;
}

function changeRanking(){
    // let money = Number($('#money').text());
    // if (money >= 60 && money < 200){
    //     $('#level').text("Sergeant of the Milk Foam")
    // } else if (money >= 200 && money < 460){
    //     $('#level').text("Commander of the Coffeebeans");
    // } else if (money >= 460 && money < 600){
    //     $('#level').text("Barista-Colonel")
    // } else if (money >= 600){
    //     $('#level').text("General of Baristas")
    // }

}
window.onload(changeRanking());

/**
 * saves the new username to the database and reloads the profile page to display the new username
 */

function saveUsername() {
    if (canEdit === true) {
        let nameInput = document.getElementById('profilename')
        let profilename = nameInput.value;
        const data = {
            name : profilename
        }

        fetch("/user/updateName", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.ok) {
                return window.location = response.url;
            } else {
                return response.json()
            }}).then(data => {
            document.getElementById("name-error").innerHTML = data.message;
            nameInput.value = '';
            nameInput.focus();
        });
    } else {
        editUsername()
    }
}

function openModal() {
    $('#myModal').modal('show');
}

function closeModal() {
    $('#myModal').modal('hide');
}

/**
 * saves the new avatar chosen by the user to the database and displays it in the profile page
 */
function chooseAvatar() {
    let img = '';
    setTimeout(function () {
        if ($('#inlineRadio1').is(':checked')) {
            img = "../assets/images/avatar.png";
            document.getElementById('profileimage').src = "../assets/images/avatar.png";
            closeModal();
        } else if ($('#inlineRadio2').is(':checked')) {
            img = "../assets/images/waitress.png";
            document.getElementById('profileimage').src = "../assets/images/waitress.png";
            closeModal();
        } else if ($('#inlineRadio3').is(':checked')) {
            img = "../assets/images/waiter.png";
            document.getElementById('profileimage').src = "../assets/images/waiter.png";
            closeModal();
        } else {
            document.getElementById('error-message').textContent = "You need to select a picture."
        }
        const image = {
            source: img,
        }
        fetch("/user/updatePic", {
            method: 'POST',
            body: JSON.stringify(image),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response);
            })
    }, 100)

}