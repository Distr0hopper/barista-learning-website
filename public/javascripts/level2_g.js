// /**loadModal() loads modal and shows it
//  * then it sets the timer until the modal disappears with a countdown
//  * while theres at elast 1 second remaining it counts down, at 0 it shows finished and afterwards closes the modal
//   */
// async function loadModal() {
//     var gameModal = $('#gameModal2')
//     gameModal.modal('show');
//     $('#myModal').modal({backdrop: 'static', keyboard: false})
//     var timeleft = 10;
//     var currentHTMLText = document.querySelector("#modal-title").textContent;
//     var downloadTimer = setInterval(function () {
//         if (timeleft > 0) {
//             gameModal.find('.modal-title').text(currentHTMLText + " " + timeleft + ' seconds remaining');
//         } else if (timeleft < 0) {
//             // gameModal.modal("hide");
//             gameModal.modal('hide');
//         } else {
//             clearInterval(downloadTimer);
//             gameModal.find('.modal-title').text(currentHTMLText + ' Finished');
//             gameModal.modal('hide');
//         }
//         timeleft -= 1;
//     }, 1000);
//
//     /**
//      * put Coffeetitles in modal*/
//     const coffeesForGame = new CoffeesForGame();
//     await coffeesForGame.getRandomSixCoffees();
//     const coffeeOrderCards = $('.card-text');
//     const coffeeTitles = coffeesForGame.getCoffeeTitles();
//     for (let i = 0; i < coffeeOrderCards.length; i++) {
//         coffeeOrderCards[i].innerText = coffeeTitles[i];
//     }
//     /**Put Coffee To Make Into Game*/
//     const orderHeader = $('#order');
//     orderHeader.innerText = coffeeTitles[0]
//
//     /**put CustomerImages in modal*/
//     const customerForGame = new Customers();
//     await customerForGame.getRandomSixCustomers();
//     const coffeeOrderCustomers = $('.card-img-top');
//     const customerImages = customerForGame.getCustomerImages();
//     for (let i = 0; i < coffeeOrderCustomers.length; i++) {
//         coffeeOrderCustomers[i].src = customerImages[i];
//     }
// }
window.addEventListener('load', loadModal)
