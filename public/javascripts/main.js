var gameModal = $('#ModalLearnCoffees')

/**loadModalMain gets the currentUser from the sessionStorage and checks wheather his points are still 0
 * if so the modal is displayed, else not*/
async function loadModalMain() {
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);

    if (currentUser.points === 0){
        gameModal.modal('show');
    }
}
window.addEventListener('load', loadModalMain)
