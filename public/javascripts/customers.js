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
        this.sixCustomers = sixCustomers;
        window.sessionStorage.setItem("customers", JSON.stringify(this.sixCustomers))
    }
    /**Saves the Customer Images into map*/
    getCustomerImages() {
        return this.sixCustomers.map(customer => customer);
    }
}