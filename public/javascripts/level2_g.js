// import {dragMoveListener, submitGame} from "../../../../../html-bootstrap/src/JS_Seiten/Game/game_mechanic.mjs";

async function loadModal() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');
    var timeleft = 10;
    var currentHTMLText = document.querySelector("#modal-title").textContent;
    var downloadTimer = setInterval(function () {
        if (timeleft > 0) {
            gameModal.find('.modal-title').text(currentHTMLText + " " + timeleft + ' seconds remaining');
        } else if (timeleft < 0) {
            // gameModal.modal("hide");
            console.log('Vor Methodenaufruf')
            closeGameModal();
        } else {
            clearInterval(downloadTimer);
            gameModal.find('.modal-title').text(currentHTMLText + ' Finished');
            closeGameModal();
        }
        timeleft -= 1;
    }, 1000);

    function closeGameModal() {
        gameModal.modal("hide");
        console.log('Ende');
    }

    class CoffeesForGame {
        constructor() {
            this.sixCoffees = ['Hallo']
            // this.getRandomSixCoffees().then(r => {});
        }

        getRandomNumber(lengthArray) {
            const randomNumber = Math.floor(Math.random() * lengthArray);
            return randomNumber
        }

        //fetch random coffees from API
        async getRandomSixCoffees() {
            const coffeeAPI = 'https://api.sampleapis.com/coffee/hot';
            const res = await fetch(coffeeAPI);
            const data = await res.json(); //array kommt raus aus Kaffees
            // //is nur da um spezielle Einträge der Coffees zu kriegen und restliches JSON objekt wegzuwerfen
            // const allCoffees = data.map((entry, index) => {
            //     return {
            //         title: entry.title,
            //         id: index+1
            //     }
            // });
            // console.log(allCoffees)
            const sixCoffees = []
            for (let i = 0; i < 6; i++) {
                const randomNumber = this.getRandomNumber(data.length)
                sixCoffees.push(data.splice(randomNumber, 1)[0]);
            }
            console.log("Hallo wir sind GottCoffees");
            this.sixCoffees = sixCoffees; //instanzvariable für sixcoffees
        }

        getCoffeeTitles() {
            console.log(this.sixCoffees)
            return this.sixCoffees.map(coffee => {
                console.log(coffee);
                console.log(coffee.title);
                return coffee.title
            });
        }
    }

    class Customers {
        constructor() {
            this.sixCustomers = []
            this.getRandomSixCustomers()
        }

        getRandomNumber(lengthArray) {
            const randomNumber = Math.floor(Math.random() * lengthArray);
            return randomNumber
        }

        getRandomSixCustomers() {
            const CustomerArray = []
            const sixCustomers = []
            //TODO: Change path images
            CustomerArray[0] = 'assets/images/Customers/black-woman.png'
            CustomerArray[1] = 'assets/images/Customers/karen.png';
            CustomerArray[2] = 'assets/images/Customers/old-woman.png';
            CustomerArray[3] = 'assets/images/Customers/young-man.png';
            CustomerArray[4] = 'assets/images/Customers/samurai-man.png';
            CustomerArray[5] = 'assets/images/Customers/red-head-man.png';
            CustomerArray[6] = 'assets/images/Customers/old-black-man.png';
            CustomerArray[7] = 'assets/images/Customers/indian-woman.png';
            // console.log(CustomerArray);
            for (let i = 0; i < 6; i++) {
                const randomNumber = this.getRandomNumber(CustomerArray.length);
                sixCustomers.push(CustomerArray.splice(randomNumber, 1)[0]);
            }
            console.log(sixCustomers)
            this.sixCustomers = sixCustomers;
        }

        getCustomerImages() {
            return this.sixCustomers.map(customer => customer);
        }
    }

    //put names in modal
    const coffeesForGame = new CoffeesForGame();
    await coffeesForGame.getRandomSixCoffees();
    const coffeeOrderCards = $('.card-text');
    const coffeeTitles = coffeesForGame.getCoffeeTitles();
    console.log(coffeeTitles)
    for (let i = 0; i < coffeeOrderCards.length; i++) {
        coffeeOrderCards[i].innerText = coffeeTitles[i];
    }

    // add Pictures
    const customerForGame = new Customers();
    await customerForGame.getRandomSixCustomers();
    const coffeeOrderCustomers = $('.card-img-top');
    const customerImages = customerForGame.getCustomerImages();
    console.log(customerImages);
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customerImages[i];
    }
}
window.addEventListener('load', loadModal)
