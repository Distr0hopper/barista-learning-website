/**
 * Customers is a class with the Instructor sixCustomer Array and this.getRandomSixCustomers()
 * it first generates a random Number
 * then it creates randomSixCustomers and Images*/
class Customers {
    constructor() {
        this.sixCustomers = []
        // this.getRandomSixCustomers()
    }

    getRandomNumber(lengthArray) {
        const randomNumber = Math.floor(Math.random() * lengthArray);
        return randomNumber
    }
    /**gets Customers (later) and puts them into array*/
    async getRandomSixCustomers() {
        // const CustomerArray = []
        // const sixCustomers = []
        // CustomerArray[0] = '../assets/images/Customers/black-woman.png'
        // CustomerArray[1] = '../assets/images/Customers/karen.png';
        // CustomerArray[2] = '../assets/images/Customers/old-woman.png';
        // CustomerArray[3] = '../assets/images/Customers/young-man.png';
        // CustomerArray[4] = '../assets/images/Customers/samurai-man.png';
        // CustomerArray[5] = '../assets/images/Customers/red-head-man.png';
        // CustomerArray[6] = '../assets/images/Customers/old-black-man.png';
        // CustomerArray[7] = '../assets/images/Customers/indian-woman.png';
        // console.log(CustomerArray);
        console.time("response")
        let response = await fetch("http://localhost:9000/games/getAllCustomers");
        console.timeEnd("response")
        let customerList = await response.json();
        console.log(customerList)

        customerList = customerList.map(customer=>{
            customer.customerImgPath = "../assets/images/Customers/"+ customer.customerImgPath;
            return customer
        })
        const sixCustomers = []
        for (let i = 0; i < 6; i++) {
            const randomNumber = this.getRandomNumber(customerList.length);
            sixCustomers.push(customerList.splice(randomNumber, 1)[0]);
        }
        this.sixCustomers = sixCustomers;
        window.sessionStorage.setItem("customers", JSON.stringify(this.sixCustomers))
    }
    /**Saves the Customer Images into map*/
    getCustomerImages() {
        return this.sixCustomers.map(customer => {
            return customer.customerImgPath;
        });
    }
}