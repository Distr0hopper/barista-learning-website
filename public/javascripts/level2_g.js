/**loadModal() loads modal and shows it
 * then it sets the timer until the modal disappears with a countdown
 * while theres at elast 1 second remaining it counts down, at 0 it shows finished and afterwards closes the modal
  */
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
/**
 * CoffeesForGame is a class, that has sixCoffees in the Constructor
 * it first generates a random Number
 * then it creates randomSixCoffees and Titles*/
    class CoffeesForGame {
        constructor() {
            this.sixCoffees = ['Hallo']
        }

        getRandomNumber(lengthArray) {
            const randomNumber = Math.floor(Math.random() * lengthArray);
            return randomNumber
        }

        /**
         * fetch random coffees from API
         * then it searches with help of our randomnumber earlier a coffee in the API output and pushes that coffee to sixCoffees Array (line 60) and shortens the API output array at that index with splice
         * then it saves the coffe into sixCoffees from the constructor
         * save it to sessionstorage
         * */
        async getRandomSixCoffees() {
            let response = await fetch("http://localhost:9000/api/coffees");
            let coffeelist = await response.json();

            coffeelist = coffeelist.map(coffee=>{
                coffee.coffeeImgPath = "assets/images/CoffeeTexts/"+ coffee.coffeeImgPath;
                return coffee
            })
            const sixCoffees = []
            for (let i = 0; i < 6; i++) {
                const randomNumber = this.getRandomNumber(coffeelist.length)
                // sixCoffees.push(data.splice(randomNumber, 1)[0]);
                sixCoffees.push(coffeelist.splice(randomNumber, 1)[0])
            }
            this.sixCoffees = sixCoffees; //instanzvariable für sixcoffees
            window.sessionStorage.setItem("coffees", JSON.stringify(this.sixCoffees))
        }
/**getCoffeeTitles() returns a map with the titles from sixCoffees*/
        getCoffeeTitles() {
            console.log(this.sixCoffees)
            return this.sixCoffees.map(coffee => {
                return coffee.title
            });
        }
    }
/**
 * Customers is a class with the Instructor sixCustomer Array and this.getRandomSixCustomers()
 * it first generates a random Number
 * then it creates randomSixCustomers and Images*/
    class Customers {
        constructor() {
            this.sixCustomers = []
            this.getRandomSixCustomers()
        }

        getRandomNumber(lengthArray) {
            const randomNumber = Math.floor(Math.random() * lengthArray);
            return randomNumber
        }
/**gets Customers (later) and puts them into array*/
        getRandomSixCustomers() {
            const CustomerArray = []
            const sixCustomers = []
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
            window.sessionStorage.setItem("customers", JSON.stringify(this.sixCustomers))
        }
/**Saves the Customer Images into map*/
        getCustomerImages() {
            return this.sixCustomers.map(customer => customer);
        }
    }

    /**
     * put Coffeetitles in modal*/
    const coffeesForGame = new CoffeesForGame();
    await coffeesForGame.getRandomSixCoffees();
    const coffeeOrderCards = $('.card-text');
    const coffeeTitles = coffeesForGame.getCoffeeTitles();
    for (let i = 0; i < coffeeOrderCards.length; i++) {
        coffeeOrderCards[i].innerText = coffeeTitles[i];
    }
    /**Put Coffee To Make Into Game*/
    const orderHeader = $('#order');
    orderHeader.innerText = coffeeTitles[0]

    /**put CustomerImages in modal*/
    const customerForGame = new Customers();
    await customerForGame.getRandomSixCustomers();
    const coffeeOrderCustomers = $('.card-img-top');
    const customerImages = customerForGame.getCustomerImages();
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customerImages[i];
    }
}
window.addEventListener('load', loadModal)
