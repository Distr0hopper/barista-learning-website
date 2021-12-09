// function checklogin() {
//     let name = false;
//     let password = false;
//     if (document.getElementById("username").value === "admin" &&
//         document.getElementById("password").value === "admin") {
//         name = true;
//         password = true;
//         location.href = '/main';
//     } else {
//         document.getElementById("fehler").innerHTML = "Falsches Password";
//     }
// }
// function checklogin() {
//     // e.preventDefault();
//     let nameInput = document.getElementById("username");
//     let passwordInput = document.getElementById("password");
//
//     const userData = {        //JSON objekt mit Keys und values nach Stringify
//         username: nameInput.value,   //werte auslesen in Objektnotion
//         password: passwordInput.value
//     }
//
//     fetch("/auth", {
//         method: 'POST',
//         body: JSON.stringify(userData),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }).then(response => {
//         if(response.ok) {
//             return window.location = response.url;
//         } else {
//             return response.json()
//         }}).then(userData => {
//         alert(userData.message);
//         nameInput.value = "";
//         passwordInput.value = "";
//         nameInput.focus();
//     })
// }
// document.querySelector('.login_btn').onclick = checklogin()
// let canEdit = false;
//
// function editUsername() {
//     if (canEdit === false) {
//         document.querySelector('#profilename').readOnly = false;
//         document.querySelector('#edit_button').textContent = "Save";
//         // document.querySelector('#edit_button').style.borderColor = 'visible';
//         canEdit = true;
//     } else {
//         saveUsername()
//     }
// }
//
// function saveUsername() {
//     if (canEdit === true) {
//         document.querySelector('#profilename').readOnly = true;
//         document.querySelector('#edit_button').textContent = "Edit Username";
//         canEdit = false;
//     } else {
//         editUsername()
//     }
// }
//
// function openModal() {
//     $('#myModal').modal('show');
// }
//
// function closeModal() {
//     $('#myModal').modal('hide');
// }
//
// function chooseAvatar() {
//     var img = '';
//     setTimeout(function () {
//         if ($('#inlineRadio1').is(':checked')) {
//             document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/3462/3462124.png";
//             closeModal();
//         } else if ($('#inlineRadio2').is(':checked')) {
//             img = $('#avatar2');
//             document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2317/2317940.png";
//             closeModal();
//         } else if ($('#inlineRadio3').is(':checked')) {
//             img = $('#avatar3');
//             document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2007/2007804.png";
//             closeModal();
//         } else if ($('#inlineRadio4').is(':checked')) {
//             img = $('#avatar4');
//             document.getElementById('profileimage').src = "../assets/profile-icon.png";
//             closeModal();
//         } else {
//             document.getElementById('error-message').textContent = "You need to select a picture."
//         }
//     }, 100)
//
// }
//
// function createScoreArray() {
//     let list = []
//     let scores = Array.from({length: 150}, () => Math.floor(Math.random() * 200));
//     scores.sort((a, b) => {
//         return a - b;
//     });
//     let names = ["coffelover1",
//         "arrivewindlass",
//         "advisoruniverse",
//         "hosttax",
//         "assistancerwandan",
//         "deepratio",
//         "telephonefreezing",
//         "sugarginger",
//         "wildcatextraneous",
//         "habitattreasured",
//         "folkexpand",
//         "supposeits",
//         "constituteribbit",
//         "automaticinvent",
//         "tensebonnet",
//         "lumberingrespond",
//         "sovietgymnasium",
//         "asleepcathead",
//         "optionyearly",
//         "evilmaster",
//         "observerdanger",
//         "wornoutlumbar",
//         "photographfrail",
//         "jitterytermite",
//         "certainflushed",
//         "serpentinewham",
//         "gassatisfying",
//
//     ]
//     names.forEach(name => {
//         const highscore_name = {
//             name: name,
//             score: scores.pop()
//         }
//         list.push(highscore_name)
//     });
//     list.forEach(item => {
//         let listRowDiv = document.createElement("div");
//         listRowDiv.classList.add("listrow");
//         let nameSpan = document.createElement("span");
//         nameSpan.innerText = item.name;
//         nameSpan.classList.add("nameSpan");
//         let pointSpan = document.createElement("span");
//         pointSpan.innerText = item.score;
//         pointSpan.classList.add("pointSpan");
//         listRowDiv.appendChild(nameSpan);
//         listRowDiv.appendChild(pointSpan);
//         document.querySelector(".list").appendChild(listRowDiv)
//     });
// }
// //Level 2 Modal
//
// //generate Coffees For Levels
//
// //hide modal after timeout
// $(window).on('load', async function () {
//     var gameModal = $('#gameModal2')
//     gameModal.modal('show');
//     var timeleft = 10;
//     var currentHTMLText = document.querySelector("#modal-title").textContent;
//     var downloadTimer = setInterval(function () {
//         if (timeleft > 0) {
//             gameModal.find('.modal-title').text(currentHTMLText + " " + timeleft + ' seconds remaining');
//         } else if (timeleft < 0) {
//             // gameModal.modal("hide");
//             console.log('Vor Methodenaufruf')
//             closeGameModal();
//         } else {
//             clearInterval(downloadTimer);
//             gameModal.find('.modal-title').text(currentHTMLText + ' Finished');
//             closeGameModal();
//         }
//         timeleft -= 1;
//     }, 1000);
//
//     function closeGameModal() {
//         gameModal.modal("hide");
//         console.log('Ende');
//     }
//
//     class CoffeesForGame {
//         constructor() {
//             this.sixCoffees = ['GHallo']
//             // this.getRandomSixCoffees().then(r => {});
//         }
//
//         getRandomNumber(lengthArray) {
//             const randomNumber = Math.floor(Math.random() * lengthArray);
//             return randomNumber
//         }
//
//         //fetch random coffees from API
//         async getRandomSixCoffees() {
//             const coffeeAPI = 'https://api.sampleapis.com/coffee/hot';
//             const res = await fetch(coffeeAPI);
//             const data = await res.json(); //array kommt raus aus Kaffees
//             // //is nur da um spezielle Einträge der Coffees zu kriegen und restliches JSON objekt wegzuwerfen
//             // const allCoffees = data.map((entry, index) => {
//             //     return {
//             //         title: entry.title,
//             //         id: index+1
//             //     }
//             // });
//             // console.log(allCoffees)
//             const sixCoffees = []
//             for (let i = 0; i < 6; i++) {
//                 const randomNumber = this.getRandomNumber(data.length)
//                 sixCoffees.push(data.splice(randomNumber, 1)[0]);
//             }
//             console.log("Hallo wir sind GottCoffees");
//             this.sixCoffees = sixCoffees; //instanzvariable für sixcoffees
//         }
//
//         getCoffeeTitles() {
//             console.log(this.sixCoffees)
//             return this.sixCoffees.map(coffee => {
//                 console.log(coffee);
//                 console.log(coffee.title);
//                 return coffee.title
//             });
//         }
//     }
//
//     class Customers {
//         constructor() {
//             this.sixCustomers = []
//             this.getRandomSixCustomers()
//         }
//
//         getRandomNumber(lengthArray) {
//             const randomNumber = Math.floor(Math.random() * lengthArray);
//             return randomNumber
//         }
//
//         getRandomSixCustomers() {
//             const CustomerArray = []
//             const sixCustomers = []
//
//             CustomerArray[0] = '/assets/images/Customers/black-woman.png'
//             CustomerArray[1] = '/assets/images/Customers/karen.png';
//             CustomerArray[2] = '/assets/images/Customers/old-woman.png';
//             CustomerArray[3] = '/assets/images/Customers/young-man.png';
//             CustomerArray[4] = '/assets/images/Customers/samurai-man.png';
//             CustomerArray[5] = '/assets/images/Customers/red-head-man.png';
//             CustomerArray[6] = '/assets/images/Customers/old-black-man.png';
//             CustomerArray[7] = '/assets/images/Customers/indian-woman.png';
//             // console.log(CustomerArray);
//             for (let i = 0; i < 6; i++) {
//                 const randomNumber = this.getRandomNumber(CustomerArray.length);
//                 sixCustomers.push(CustomerArray.splice(randomNumber, 1)[0]);
//             }
//             console.log(sixCustomers)
//             this.sixCustomers = sixCustomers;
//         }
//
//         getCustomerImages() {
//             return this.sixCustomers.map(customer => customer);
//         }
//     }
//
//     //put names in modal
//     const coffeesForGame = new CoffeesForGame();
//     await coffeesForGame.getRandomSixCoffees();
//     const coffeeOrderCards = $('.card-text');
//     const coffeeTitles = coffeesForGame.getCoffeeTitles();
//     console.log(coffeeTitles)
//     for (let i = 0; i < coffeeOrderCards.length; i++) {
//         coffeeOrderCards[i].innerText = coffeeTitles[i];
//     }
//
//     // add Pictures
//     const customerForGame = new Customers();
//     await customerForGame.getRandomSixCustomers();
//     const coffeeOrderCustomers = $('.card-img-top');
//     const customerImages = customerForGame.getCustomerImages();
//     console.log(customerImages);
//     for (let i = 0; i < coffeeOrderCustomers.length; i++) {
//         coffeeOrderCustomers[i].src = customerImages[i];
//     }
// })
//
// /* Function for the gamemechanic*/
//
//
// function submitGame() {
//     var submitButtonText = $('#submitGame').text();
//
//     if (submitButtonText === 'next') {
//         $('#submitGame').html('submit')
//         for (i = 0; i < ingredients.length; i++) {
//
//             ingredient_id = '#' + ingredients[i];
//
//             $(ingredient_id).css({
//                 'left': $(ingredient_id).data('originalLeft'),
//                 'top': $(ingredient_id).data('originalTop')
//             });
//         }
//
//
//         if (activeDrink == 'americano') {
//             $('#order').text("2. Please make a LATTE!");
//             activeDrink = 'latte';
//         } else if (activeDrink == 'latte') {
//             $('#order').text("3. Please make a MOCHA!");
//             activeDrink = 'mocha';
//
//         } else if (activeDrink == 'mocha') {
//             $('#order').text("4. Please make a CAPPUCCINO!");
//             activeDrink = 'cappuccino';
//
//         } else if (activeDrink == 'cappuccino') {
//             $('#order').text("5. Please make a BREVE!");
//             activeDrink = 'breve';
//
//         } else if (activeDrink == 'breve') {
//             $('#order').text("6. Please make a MACCHIATO!");
//             activeDrink = 'macchiato';
//
//         } else if (activeDrink == 'macchiato') {
//             $('#order').text("7. Please make an IRISH COFFEE!");
//             activeDrink = 'irish';
//
//         } else if (activeDrink == 'irish') {
//             $('#order').text("8. Please make a CAFFE AU LAIT!");
//             activeDrink = 'caffe au lait';
//
//         } else if (activeDrink == 'caffe au lait') {
//             $('#order').text("9. Please make an ESPRESSO CON PANNA!");
//             activeDrink = 'espresso con panna';
//
//         } else if (activeDrink == 'espresso con panna') {
//             $('#order').text("10. Please make a MOCHA BREVE!");
//             activeDrink = 'mocha breve';
//
//         }
//     } else {
//         $('#submitGame').html('next')
//         // get an array of correct ingredients using the activeDrink name
//         // so for example, if activeDrink was americano this would return an array of ['espresso','water']
//         correctIngredients = drinks[activeDrink];
//         // this code takes two arrays: correctIngredients and droppedIngredients
//         // it first sorts them alphabetically, so the user doesn't have to match then order of ingredients
//         // then, it collapses the arrays into strings
//         // so an array with a value of ['water','espresso'] turns into a string 'espressowater'
//         // then, i use the comparison operator to see if the values are the same
//         // if they are, then they inputted the ingredients correctly
//         if (correctIngredients.sort().join() == droppedIngredients.sort().join()) {
//             $('#order').text("You got it right!");
//         } else {
//             $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));
//
//         }
//
//         droppedIngredients = [];
//
//
//     }
// }
//
//
// /*  Store Code to show description, Store */
// function openModal() {
//     $('#myModal').modal('show');
// }
//
// function closeModal() {
//     $('#myModal').modal('hide');
// }
//
// function openManFilModal(){
//     $('#manual-filter-modal').modal('show');
// }
//
// function closeManFilModal(){
//     $('#manual-filter-modal').modal('hide');
// }
//
// function openAutFilModal(){
//     $('#automatic-filter-modal').modal('show');
// }
//
// function closeAutFilModal(){
//     $('#automatic-filter-modal').modal('hide');
// }
//
// function openItalianModal(){
//     $('#italian-modal').modal('show');
// }
//
// function closeItalianModal(){
//     $('#italian-modal').modal('hide');
// }
//
// function openSiebModal(){
//     $('#sieb-modal').modal('show');
// }
//
// function closeSiebModal(){
//     $('#sieb-modal').modal('hide');
// }
//
// function openAutModal(){
//     $('#automatic-modal').modal('show');
// }
//
// function closeAutModal(){
//     $('#automatic-modal').modal('hide');
// }

//
//
// /* Interact JS Code
//
//
//
//
// // target elements with the "drag-drop" class
// interact('.drag-drop')
//     .draggable({
//         listeners: {
//             // call this function on every dragmove event
//             move: dragMoveListener,
//         }
//     })
//
// function dragMoveListener(event) {
//     var target = event.target
//
//     // keep the dragged position in the data-x/ data-y attributes
//     var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//     var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
//
//     // translate the element
//     target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
//
//     // update the position attributes
//     target.setAttribute('data-x', x)
//     target.setAttribute('data-y', y)
// }
//
// /* Dropping Code
//
// // enable draggables to be dropped into this
// interact('.dropzone').dropzone({
//     // Require a 75% element overlap for a drop to be possible
//     overlap: 0.75,
//
//     // listen for drop related events:
//
//     ondropactivate: function (event) {
//         // add active dropzone feedback
//         event.target.classList.add('drop-active')
//     },
//     ondragenter: function (event) {
//         var draggableElement = event.relatedTarget
//         var dropzoneElement = event.target
//
//         dropzoneElement.classList.add('drop-target')
//         draggableElement.classList.add('can-drop')
//     },
//     ondragleave: function (event) {
//         event.target.classList.remove('drop-target')
//         event.relatedTarget.classList.remove('can-drop')
//     },
//     ondropdeactivate: function (event) {
//         event.target.classList.remove('drop-active')
//         event.target.classList.remove('drop-target')
//     }
// })
//
// interact('drag-drop')
//     .draggable({
//         inertia: true,
//         modifiers: [
//             interact.modifiers.restrictRect({
//                 restriction: 'parent',
//                 endOnly: true
//             })
//         ],
//         autoScroll: true,
//
//         listeners: {move: dragMoveListener}
//     })
//
// */