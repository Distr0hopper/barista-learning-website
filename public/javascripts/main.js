var gameModal = $('#ModalLearnCoffees')

async function loadModal() {
    // var currentCustomer = JSON.parse(sessionStorage.getItem("connected"))
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);
    console.log(currentUser);

    if (currentUser.points === 0){
        gameModal.modal('show');
    }
}
window.addEventListener('load', loadModal)
