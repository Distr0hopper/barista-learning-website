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
    console.log("Test");
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
    var img = '';
    setTimeout(function () {
        if ($('#inlineRadio1').is(':checked')) {
            document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/3462/3462124.png";
            closeModal();
        } else if ($('#inlineRadio2').is(':checked')) {
            img = $('#avatar2');
            document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2317/2317940.png";
            closeModal();
        } else if ($('#inlineRadio3').is(':checked')) {
            img = $('#avatar3');
            document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2007/2007804.png";
            closeModal();
        } else if ($('#inlineRadio4').is(':checked')) {
            img = $('#avatar4');
            document.getElementById('profileimage').src = "../assets/profile-icon.png";
            closeModal();
        } else {
            document.getElementById('error-message').textContent = "You need to select a picture."
        }
    }, 100)

}