let canEdit = false;

function editUsername() {
    if (canEdit === false) {
        document.querySelector('#profilename').readOnly = false;
        document.querySelector('#edit_button').textContent = "Save";
        // document.querySelector('#edit_button').style.borderColor = 'visible';
        canEdit = true;
    } else {
        saveUsername()
    }
}

function changeRanking(){
    let money = Number($('#money').text());
    if (money >= 60 && money < 200){
        $('#level').text("Sergeant of the Milk Foam")
    } else if (money >= 200 && money < 460){
        $('#level').text("Commander of the Coffeebeans");
    } else if (money >= 460 && money < 600){
        $('#level').text("Barista-Colonel")
    } else if (money >= 600){
        $('#level').text("General of Baristas")
    }

}
window.onload(changeRanking());

function saveUsername() {
    if (canEdit === true) {
        let profilename = document.getElementById('profilename').value;
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
            console.log(response);
        });
        document.getElementById('name').innerHTML = profilename;
        document.querySelector('#profilename').readOnly = true;
        document.querySelector('#edit_button').textContent = "Edit Username";
        canEdit = false;
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