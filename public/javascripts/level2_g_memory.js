$(window).on('load', function (){
    $('#gameModal2').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,

    })
})

async function loadModalMemory() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');
    var timeleft = 5;
    var currentHTMLText = document.querySelector("#modal-title").textContent;
    var downloadTimer = setInterval(function () {
        if (timeleft > 0) {
            gameModal.find('.modal-title').text(currentHTMLText + " " + timeleft + ' seconds remaining');
        } else if (timeleft < 0) {
            // gameModal.modal("hide");
            gameModal.modal('hide');
        } else {
            clearInterval(downloadTimer);
            gameModal.find('.modal-title').text(currentHTMLText + ' Finished');
            gameModal.modal('hide');
        }
        timeleft -= 1;
    }, 1000);

    /**
     * put Coffeetitles in modal*/
    var modalInput = JSON.parse(sessionStorage.getItem("modalInput"));
    const coffeeOrderCards = $('.card-text');
    const coffeeOrderCustomers = $('.card-img-top');
    const orderHeader = $('#order');
    for (let i = 0; i < modalInput.length; i++) {
        coffeeOrderCards[i].innerText = modalInput[i].title
        coffeeOrderCustomers[i].src = modalInput[i].img
    }
    orderHeader.innerText = modalInput[0].title
}

window.addEventListener('load', loadModalMemory)
window.addEventListener('load', loadMemory)
