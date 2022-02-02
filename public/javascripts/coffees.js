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
}