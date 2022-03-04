var gameModal = $('#ModalLearnCoffees')

async function loadModalMain() {
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);

    if (currentUser.points === 0){
        gameModal.modal('show');
    }
}
window.addEventListener('load', loadModalMain)
