// coffees  and customer stored in session
var coffeesForLevel3 = JSON.parse(sessionStorage.getItem("allCoffees"));
var coffeestored = [];
var customersLevel3 = JSON.parse(sessionStorage.getItem("sixCustomers"));

// coffee to be payed class variables
let randomCoffeeNumberOf5 = null ;
let nextCostumerWhoHasToPay = null;
let randomCostumerAmount = null;
let total = null;
let totalInput = null;
let numberOfWrongInputPrices = null;

async  function submitTotalPrice() {

    var submitModal = $('#costumerAnswerAfterSubmit');


    let submitTotalInputText = document.getElementById('submitPriceInput');
    totalInput = numFormttCommaRep(submitTotalInputText.value);




    if ( numberOfWrongInputPrices <= 0) {
        for (let i = 0; i <= randomCoffeeNumberOf5; i++) {
            total += coffeestored[i].price
        }
        total.toFixed(2);
        total = numberFormatter(total)

    }

    if (submitTotalInputText.value.length === 0){
        $('#message-error').text(' You have to add a price');

    }else{
        $('#message-error').text("Total input "+ totalInput +  "  Total price :"+ total);
        submitModal.modal('show');
    }


    if(totalInput.toString() === total.toString()){
        if (numberOfWrongInputPrices <= 3) {
            let tip = tipReceiver().toString();
        $('#message-error').text(' You added the correct price! Your costumer wants to give you a  '+ tip+ "% tip.");

        document.getElementById('TileHeaderAfterSubmit').innerHTML = "Yeahy you calculated correctly!!";
        document.getElementById('AfterSubmitCardBody').innerHTML= " I would love to give you a Tip: " + tip + "%";

        document.getElementById('tipInput').style.display= "block";
        document.getElementById('submitTip').style.display = "block";
        }
    }else {
        numberOfWrongInputPrices ++;
        if (numberOfWrongInputPrices >= 3) {
            document.getElementById('TileHeaderAfterSubmit').innerHTML = "That's wrong!!!! I would like to talk to your manager!!"
            document.getElementById('AfterSubmitCardBody').innerHTML= "The correct amount would be: "+ total.toString()+ " you will not receive a tip ";
            document.getElementById('submitPriceInput').value = "";

        }
        document.getElementById('TileHeaderAfterSubmit').innerHTML = "Uhh that does not seem wright !"
        document.getElementById('AfterSubmitCardBody').innerHTML= "try again"
        document.getElementById('submitPriceInput').value = "";

    }



}

function tipReceiver(){
    let tipPercentage = null;
    switch (numberOfWrongInputPrices){
        case null: tipPercentage = 20.00 ; break;
        case 1:  tipPercentage = 15.00; break;
        case 2:  tipPercentage =10.00; break;
        case 3:  tipPercentage =7.00; break;
    }
    return tipPercentage;


}
function  numberFormatter(input){
  // input = numFormttCommaRep(input);

   return  Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(input );
}

function numFormttCommaRep(value){
    value  = parseFloat(value.replace(/,/g,'.'));
    return  Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value);
}
function submitTip(){

    var submitModal = $('#costumerAnswerAfterSubmit')
    let tipInput = document.getElementById('tipInput');
    let tip = tipReceiver().toString();
    let totalWithTip = total;
    let numberOfWrongTipInputs = null;

    tip = Math.round((total * tip))/100;
    tip.toFixed(2);
    totalWithTip += tip;


    $ ('#message-error').text(" tip Input  amount : " + tipInput.value.toString() + "tip amount: " + tip + "total amount with tip " + totalWithTip);

    if( tipInput.value.toString() === totalWithTip.toString()){
        $('#message-error').text("Total wit tip: " + tip);
        document.getElementById('TileHeaderAfterSubmit').innerHTML = "Yeahy you calculated the Tip correctly!!";
        document.getElementById('AfterSubmitCardBody').innerHTML= "Thank you very much :) ";
        document. getElementById('btnsubmit').innerText = "Next costumer ";
        document.getElementById('submitPriceInput').value = "";

    } else if( numberOfWrongTipInputs <= 3){
        numberOfWrongTipInputs ++;
        document.getElementById('TileHeaderAfterSubmit').innerHTML= "Hmm not quite";
        document.getElementById('AfterSubmitCardBody').innerHTML= "try again you have " +(3- numberOfWrongTipInputs) + " tries left";


    }else {
        document.getElementById('TileHeaderAfterSubmit').innerHTML= "That's not wright";
        document.getElementById('AfterSubmitCardBody').innerHTML= " It is "+ totalWithTip.toString() +" next time you'll do better";
    }
    submitModal.modal('show');
    document.getElementById('tipInput').value = "";



}

/**
 * adds Coffees in to the table underneath and adds its price within by taking the coffees from the session
 * storage.
 * @returns {Promise<void>}
 */
 async function addCoffeeToPay() {

     coffeesForLevel3.forEach((coffee, j) => {
         coffeestored[j] = {
             title: coffee.title,
             price: coffee.price
         }

     })
    let selectedCoffee = $('.coffeePickerdiv :selected').text();

    let price = 0; // take it later from database
    let total = price;


    if (selectedCoffee !== 'Choose the correct Coffee...') {
        // if coffee exists in the table add a message
        if ($('#' + selectedCoffee).length) {
            $('#message-error').text('This coffee has already been selected');
        } else {
            $('#message-error').text('');

            coffeestored.forEach((coffee, i) => {
                if (selectedCoffee === coffee.title) {
                    price = coffee.price;
                }
            });

            $('#invoice-table').append('<tr><td id="' + selectedCoffee + '">' + selectedCoffee + '</td><td id="' + selectedCoffee + 'Price">' + price + '</td><td id="' + selectedCoffee + 'Total">' + total + '</td></tr>');
            $('#inputGroupSelect01').val('None')
        }
        console.log("pressed");
    } else {
        $('#message-error').text('You have to select a coffee!');
    }
}


/**
 * removes the coffee just added
 */
function removeCoffeeForPay() {
    let selectedCoffee = $('.coffePickerdiv :selected').text();
    let price = parseFloat($('#' + selectedCoffee + 'Price').text());

    $('#invoice-table').closest("tr").remove();

    // solve the error
  /*  if ($('#' + selectedCoffee).length >= 1 ) {
            $('#' + selectedCoffee).closest("tr").remove();
        } else {
        $('#' + selectedCoffee).closest("tr").remove();
        $('#message-error').text('You cannot delete this element!');
    }*/
}

async function loadModal() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');

    document.getElementById('tipInput').style.display = "none"
    document.getElementById('submitTip').style.display= "none"

    class CoffeeToBePayed {
        constructor() {
            this.getRandomCoffeeAmountNumber()
            this.getNextPayingCostumer()
            this.getNextRandomCoffeeOrders()
        }

        getRandomCoffeeAmountNumber() {
            randomCoffeeNumberOf5 = Math.floor(Math.random() * 5)
            return randomCoffeeNumberOf5

        }

        getNextPayingCostumer() {

            randomCostumerAmount = this.getRandomCoffeeAmountNumber();
            if (randomCostumerAmount < 5) {
                nextCostumerWhoHasToPay = randomCostumerAmount + 1;
            }
            return nextCostumerWhoHasToPay;
        }

        getNextRandomCoffeeOrders() {
            return Math.floor(Math.random() * randomCoffeeNumberOf5);
        }

    }
    class SubmitPrice {

    }



    /***
     * gets the RandomCoffeeAmountNumber from the CoffeeToBePayed class and uses  them to define how many coffees one costumer has to pay.
     * Costumers who are payed for are shown in the model Costumer ( adding costumer)
     * @type {CoffeeToBePayed}
     */


    const payedCoffeeNumber = new CoffeeToBePayed();
    const numberOfPayedCoffeeByOneCostumer = payedCoffeeNumber.getRandomCoffeeAmountNumber();
    let costumerNumber = numberOfPayedCoffeeByOneCostumer;
    console.log(payedCoffeeNumber);

    document.getElementById("label").innerText = numberOfPayedCoffeeByOneCostumer.toString();
    if (numberOfPayedCoffeeByOneCostumer <= 0) {

        document.getElementById('card-text-body-modal1').innerHTML = "I would just like to pay for my coffee";

    } if(numberOfPayedCoffeeByOneCostumer >= 2){
        document.getElementById('card-text-body-modal1').innerHTML = " Hi I would like to pay for ME and my FRIENDS shown below "
    }
    for (let i = 0; i <= numberOfPayedCoffeeByOneCostumer - 1; i++) {

        if (numberOfPayedCoffeeByOneCostumer >= 1) {
            $('#addingMoreCostumers').append( '<div class="col-4 addingCostumer" id="moreCostumers"'+ i+'>\n' +
                '                            <div class="card w-100 h-auto cursor-normal mx-2" style="width: 18rem;">\n' +
                '                                <img class="p-3 card-img-Person-getting-payed" src="@assetsFinder.path("/images/waiter.png")" alt="Card image cap">\n' +
                '                            </div>')

        //    $('.addingCostumer').clone().appendTo('#addingMoreCostumers');
          //  i++;
        }


    }

    /*** put Coffeetitles in modal*/

   // var coffeesForLevel3 = JSON.parse(sessionStorage.getItem("allCoffees"))
    console.log(coffeesForLevel3)
    const coffeeOrderCardsLevel3 = $('.card-text');
    const coffeeTitles = coffeesForLevel3.map(coffee => {
        return coffee.title
    });
    for (let i = 0; i < coffeeOrderCardsLevel3.length; i++) {
        coffeeOrderCardsLevel3[i].innerText = coffeeTitles[i];
    }

    const coffeeOptionsForInputGroup = $('.options');
    const coffeePrices = coffeesForLevel3.map(coffee => {
        return coffee.prices;
    });
    console.log(coffeePrices)
    for (let i = 0; i < coffeeOptionsForInputGroup.length; i++) {
        coffeeOptionsForInputGroup[i].innerText = coffeeTitles[i]

    }


    /**put CustomerImages in to the tiles */
   // var customersLevel3 = JSON.parse(sessionStorage.getItem("sixCustomers"))
    console.log(customersLevel3)
    const coffeeOrderCustomers = $('.card-img-top');

    var customersLevel3Img = []
    for (let i = 0; i < customersLevel3.length; i++) {
        customersLevel3Img[i] = customersLevel3[i].customerImgPath
    }
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customersLevel3Img[i];
    }

    /** put CustomerImages of the Payer in the correct modal position in Model 1*/
    const coffeeOrderCustomersPayer = $('.card-img-Person-paying');
    for (let i = 0; i < coffeeOrderCustomersPayer.length; i++) {
        coffeeOrderCustomersPayer[i].src = customersLevel3Img[i]
    }

    /**
     * puts CustomerImages of the Customer invited for in to the model.
     * @type {*|jQuery|HTMLElement}
     */
    const customerBeingPayed = $('.card-img-Person-getting-payed')
    for (let i = 1; i <= customerBeingPayed.length ; i++) {

            customerBeingPayed[i - 1].src = customersLevel3Img[i];

    }

    function submitTotal() {

    }

    if (costumerNumber < 5) {
        let leftCostumers = 5 - costumerNumber;
        let nextRandomNumber = Math.floor(Math.random() * leftCostumers);

        for (let j = 0; j <= nextRandomNumber; j++) {
            $('.addingInvitedCostumer2').clone().appendTo('#addingMoreCostumers2');
            j++;
        }
        document.getElementById("label2").innerText = "invited: " + nextRandomNumber + "\n random " + numberOfPayedCoffeeByOneCostumer.toString();

    }


}



window.addEventListener('load', loadModal)
