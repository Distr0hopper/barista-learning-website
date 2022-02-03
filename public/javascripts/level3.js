
async function addCoffee(){
    $('#firstCoffee .coffePickerdiv').clone().appendTo('#moreCoffee');
}
async function removeCoffee(){
    $('#moreCoffee .coffePickerdiv').last().remove();
}





async function loadModal() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');

    /**
     * CoffeesForGame is a class, that has sixCoffees in the Constructor
     * it first generates a random Number
     * then it creates randomSixCoffees and Titles*/
    class CoffeesForGame {
        constructor() {
            this.sixCoffees = ['Hallo']
            // this.getRandomSixCoffees().then(r => {});
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
            window.sessionStorage.setItem("coffees", JSON.stringify(this.sixCoffees))
        }

        /**getCoffeeTitles() returns a map with the titles from sixCoffees*/
        getCoffeeTitles() {
            console.log(this.sixCoffees)
            return this.sixCoffees.map(coffee => {
                console.log(coffee);
                console.log(coffee.title);
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
            CustomerArray[0] = '../assets/images/Customers/black-woman.png'
            CustomerArray[1] = '../assets/images/Customers/karen.png';
            CustomerArray[2] = '../assets/images/Customers/old-woman.png';
            CustomerArray[3] = '../assets/images/Customers/young-man.png';
            CustomerArray[4] = '../assets/images/Customers/samurai-man.png';
            CustomerArray[5] = '../assets/images/Customers/red-head-man.png';
            CustomerArray[6] = '../assets/images/Customers/old-black-man.png';
            CustomerArray[7] = '../assets/images/Customers/indian-woman.png';
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
    class CoffeeToBePayed {
        constructor() {
            this.getRandomCoffeeAmountNumber();

        }
        getRandomCoffeeAmountNumber() {
            const randomNumber = Math.floor(Math.random() * 5);
            return randomNumber
        }

    }

    const payedCoffeeNumber = new CoffeeToBePayed();
    const numberOfPayedCoffeeByOneCostumer = payedCoffeeNumber.getRandomCoffeeAmountNumber();
    console.log(payedCoffeeNumber);
    document.getElementById("label").innerText= numberOfPayedCoffeeByOneCostumer.toString();

    for (let i = 1; i <= numberOfPayedCoffeeByOneCostumer; ++i) {
        if(numberOfPayedCoffeeByOneCostumer !== 1) {

            $('.addingCostumer').clone().appendTo('#addingMoreCostumers');
            i++;
        }


    }



    /**
     * put Coffeetitles in modal*/
    const coffeesForGame = new CoffeesForGame();
    await coffeesForGame.getRandomSixCoffees();
    const coffeeOrderCards = $('.card-text');
    const coffeeTitles = coffeesForGame.getCoffeeTitles();
    console.log(coffeeTitles)
    for (let i = 0; i < coffeeOrderCards.length; i++) {
        coffeeOrderCards[i].innerText = coffeeTitles[i];
    }
    // putting the coffees in the options of the input group Select 01

    const coffeeOptionsForInputGroup = $('.options');
    for (let i = 0; i < coffeeOptionsForInputGroup.length; i++){
        coffeeOptionsForInputGroup[i].innerText = coffeeTitles[i];
    }

    /**put CustomerImages in to the tiles */
    const customerForGame = new Customers();
    await customerForGame.getRandomSixCustomers();

    const coffeeOrderCustomers = $('.card-img-top');
    const customerImages = customerForGame.getCustomerImages();
    console.log(customerImages);
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customerImages[i];
    }
   /** put CustomerImages of the Payer in the correct modal position and the CustomerImages of the customers who are beeing payed for*/
    const coffeeOrderCustomersPayer = $('.card-img-Person-paying');
    const payerForGame = customerForGame.getCustomerImages();
    console.log(payerForGame)
    for (let i = 0; i < coffeeOrderCustomersPayer.length; i++) {
        coffeeOrderCustomersPayer[i].src = payerForGame[i]
    }

    const customerBeingPayed = $('.card-img-Person-getting-payed')
    const beingPayedFor = customerForGame.getCustomerImages();
    for( let i = 0; i < customerBeingPayed.length; i++){
        customerBeingPayed[i].src = beingPayedFor[i+1];
    }








}
window.addEventListener('load', loadModal)
