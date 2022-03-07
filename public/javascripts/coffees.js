/**
 * CoffeesForGame is a class which contains in its Constructor the sixCoffees Array
 * it first contains the method to generate a random Number
 * then it fetches all Coffees from the database and maps their imagepaths
 * afterwards six Coffees are picked at the index of a randomly generated numbers and saved into sixCustomers
 * these sixCustomers are also then saved into the sessionStorage
 * the class also contains a method to receive just the titles of the sixCoffees*/

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
        let response = await fetch("http://localhost:9000/coffees/getCoffees");
        let coffeelist = await response.json();

        coffeelist = coffeelist.map(coffee=>{
            coffee.coffeeImgPath = "../assets/images/coffee/"+ coffee.coffeeImgPath;
            return coffee
        })
        const sixCoffees = []
        for (let i = 0; i < 6; i++) {
            const randomNumber = this.getRandomNumber(coffeelist.length)
            sixCoffees.push(coffeelist.splice(randomNumber, 1)[0])
        }
        this.sixCoffees = sixCoffees; //instanzvariable für sixcoffees
        window.sessionStorage.setItem("coffees", JSON.stringify(this.sixCoffees))
    }
    /**getCoffeeTitles() returns a map with the titles from sixCoffees*/
    getCoffeeTitles() {
        return this.sixCoffees.map(coffee => {
            return coffee.title
        });
    }

    // getIngredientList() {
    //     for (let i = 0; i < this.sixCoffees.length; i++){
    //         let currentCoffee = this.sixCoffees[i];
    //        return currentCoffee.ingredientList;
    //     }
    // }
}