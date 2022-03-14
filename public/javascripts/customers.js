/**
 * Customers is a class which contains in its Constructor the sixCustomer Array
 * it first contains the method to generate a random Number
 * then it fetches all Customers from the database and maps their imagepaths
 * afterwards six Customers are picked at the index of a randomly generated numbers and saved into sixCustomers
 * these sixCustomers are also then saved into the sessionStorage */
class Customers {
    constructor() {
        this.sixCustomers = []
    }

    async getRandomSixCustomers() {
        let response = await fetch("http://localhost:9000/games/getAllCustomers");
        let customerList = await response.json();
        customerList = customerList.map(customer=>{
            customer.customerImgPath = "../assets/images/Customers/"+ customer.customerImgPath;
            return customer
        })
        const sixCustomers = []
        for (let i = 0; i < 6; i++) {
            const randomNumber = getRandomNumber(customerList.length);
            sixCustomers.push(customerList.splice(randomNumber, 1)[0]);
        }
        this.sixCustomers = sixCustomers;
        window.sessionStorage.setItem("customers", JSON.stringify(this.sixCustomers))
    }
}