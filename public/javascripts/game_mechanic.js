/**
 * @param arrayDraggedImages: Contains the images of the ingredient
 * @param arrayImagesID: Contains the ID's of the images
 * @param drinks: Stores drinks and their ingredients
 * @param correctDrinksCounter: Counts how many drinks are made in a row
 * @param money: Get the money from the Menuebar and display it as text
 */

var arrayDraggedImages = [];
var arrayImagesID = [];
var drinks = new Array();
var correctDrinksCounter = 0;
//
// drinks["americano"] = new Array("espresso", "hotWater");
// drinks["latte"] = new Array("espresso", "milk", "milkfoam");
// drinks["mocha"] = new Array("espresso","chocolateSyrup","milk","milkfoam");
// drinks["cappuccino"] = new Array("espresso", "milk","milkfoam") ;
// drinks["breve"] = new Array("espresso","milk");
// drinks["macchiato"] = new Array("espresso","milkfoam");
// //drinks["irish"] = new Array("brewedCoffee","whiskey","cream")
// drinks["caffe au lait"] = new Array("brewedCoffee","milk");
// drinks["mocha breve"] = new Array("espresso","chocolateSyrup","milk","milkFoam");
// var activeDrink = 'americano';
// var money = Number($('#money').text());


/**
 * Function is called when submit button is pressed.
 * If the button is next, display the next drink to make.
 * If the button is submit, check if the dropped ingredients are the same as the correct ingredients and snap them to it's original position.
 * When they are correct, receive rewards and fetch them to the server.
 * When they are wrong, display the correct ingredients.
 * Empty arrays.
 *
 * @param submitButtonText:  get the current text of the submit button. Can be "Next" or "Submit".
 * @param moneyObject: JSON object containing the key moneyKey and the Value
 */
async function submitGame() {

    let response = await fetch("http://localhost:9000/api/coffees");
    let coffeelist = await response.json();
    console.log(coffeelist);

    coffeelist = coffeelist.map(coffee => {
        coffee.coffeeImgPath = "assets/images/CoffeeTexts/" + coffee.coffeeImgPath;
        return coffee
    })

    class Coffees {
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
        async getRandomSixCoffeesDefault() {
            //alter Code ohne Datenbank, direkt mit API
            // const coffeeAPI = 'https://api.sampleapis.com/coffee/hot';
            // const res = await fetch(coffeeAPI);
            // const data = await res.json(); //array kommt raus aus Kaffees
            let response = await fetch("http://localhost:9000/api/coffees");
            let coffeelist = await response.json();
            console.log(coffeelist);

            coffeelist = coffeelist.map(coffee => {
                coffee.coffeeImgPath = "assets/images/CoffeeTexts/" + coffee.coffeeImgPath;
                return coffee
            })
            const sixCoffees = []
            for (let i = 0; i < 6; i++) {
                const randomNumber = this.getRandomNumber(coffeelist.length)
                // sixCoffees.push(data.splice(randomNumber, 1)[0]);
                sixCoffees.push(coffeelist.splice(randomNumber, 1)[0])
            }
            console.log("Hallo wir sind GottCoffees");
            console.log(sixCoffees);
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

        getCoffeeIngredients() {
            return this.sixCoffees.map(coffee => {
                return coffee.ingredientList
            })
        }
    }

    const coffeesForGame = new Coffees();
    let randomSixCoffees = await coffeesForGame.getRandomSixCoffeesDefault();
    coffeesForGame.getCoffeeIngredients();
    // const coffeeOrderCards = $('.card-text');
    // const coffeeTitles = coffeesForGame.getCoffeeTitles();
    // console.log(coffeeTitles)
    // for (let i = 0; i < coffeeOrderCards.length; i++) {
    //     coffeeOrderCards[i].innerText = coffeeTitles[i];
    // }
    // /**Put Coffee To Make Into Game*/
    // const orderHeader = $('#order');
    // orderHeader.innerText = coffeeTitles[0]

    $('#plusForMoneyCounter').show();
    $('#money-counter').show();

    var submitButtonText = $('#submitGame').text();

    if (submitButtonText === 'next') {

        $('#submitGame').html('submit')
        let countDrink = 1;
        let activeDrink = "";
        for (let listDrink = 0; listDrink < coffeelist.length; listDrink++) {
            for (let sixCoffeeDrink = 0; sixCoffeeDrink < randomSixCoffees.length; sixCoffeeDrink++) {
                if (coffeelist[listDrink] === randomSixCoffees[sixCoffeeDrink]) {
                    activeDrink = randomSixCoffees[sixCoffeeDrink];
                    $('#order').text( countDrink + "Please make a" + activeDrink + "!");
                }
            }
        }

        // if (activeDrink == 'americano') {
        //     $('#order').text("2. Please make a LATTE!");
        //     activeDrink = 'latte';
        // } else if (activeDrink == 'latte') {
        //     $('#order').text("3. Please make a MOCHA!");
        //     activeDrink = 'mocha';
        //
        // } else if (activeDrink == 'mocha') {
        //     $('#order').text("4. Please make a CAPPUCCINO!");
        //     activeDrink = 'cappuccino';
        //
        // } else if (activeDrink == 'cappuccino') {
        //     $('#order').text("5. Please make a BREVE!");
        //     activeDrink = 'breve';
        //
        // } else if (activeDrink == 'breve') {
        //     $('#order').text("6. Please make a MACCHIATO!");
        //     activeDrink = 'macchiato';
        //
        // } else if (activeDrink == 'macchiato') {
        //     $('#order').text("7. Please make an IRISH COFFEE!");
        //     activeDrink = 'irish';
        //
        // } else if (activeDrink == 'irish') {
        //     $('#order').text("8. Please make a CAFFE AU LAIT!");
        //     activeDrink = 'caffe au lait';
        //
        // } else if (activeDrink == 'caffe au lait') {
        //     $('#order').text("9. Please make an ESPRESSO CON PANNA!");
        //     activeDrink = 'espresso con panna';
        //
        // } else if (activeDrink == 'espresso con panna') {
        //     $('#order').text("10. Please make a MOCHA BREVE!");
        //     activeDrink = 'mocha breve';
        //
        // }
    } else {
        $('#submitGame').html('next')

        for (i = 0; i < arrayDraggedImages.length; i++) {
            let currentImage = arrayDraggedImages[i];
            arrayImagesID.push(currentImage.id);

            currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
            currentImage.setAttribute('data-x', 0)
            currentImage.setAttribute('data-y', 0)
        }
        correctIngredients = drinks[activeDrink];
        if (correctIngredients.sort().join() === arrayImagesID.sort().join()) {
            money += 15;
            counterChecker(correctDrinksCounter);
            $('#money').text(money)

            const moneyObjekt = {
                "moneyKey": money,
            }
            fetch("/getMoney", {
                method: 'POST',
                body: JSON.stringify(moneyObjekt),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            correctDrinksCounter++;
        } else {
            $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));
            correctDrinksCounter = 0;
            $('#money-counter').text("0")
        }
        arrayImagesID = [];
        arrayDraggedImages = [];
    }

}

/**
 * Checks how much coffees are made correct, then print information how many coffees you made correctly.
 * @param correctDrinksCounter the amount of correct coffees made in a row
 */
function counterChecker(correctDrinksCounter) {
    if (correctDrinksCounter === 0) {
        $('#order').text("You made " + (correctDrinksCounter + 1) + " coffee right! +15 beans!");
    }
    if (correctDrinksCounter < 3 && correctDrinksCounter > 0) {
        $('#order').text("You made " + (correctDrinksCounter + 1) + " coffees right! +15 beans!");
    }
    $('#money-counter').text("15")
    if (correctDrinksCounter >= 3) {
        money += 15;
        $('#money-counter').text("30")
        $('#order').text("You are on a " + correctDrinksCounter + " streak! +30 beans!")
    }
}

/* ********** DRAGGING CODE *********** */

/**
 * Make objects from drag-drop class draggable.
 * Move: If object is moved
 * End: At the end of the drag
 * @type {number} -1 checks if ingredient is already inside
 */

const alreadyInside = -1;
interact('.drag-drop')
    .draggable({
        listeners: {
            move: dragMoveListener,
            end: checkIngredientArray
        }
    })

/**
 * Get the coordinates from the target (drag object) and translate them.
 * Then update the position attributes from the object.
 *
 * @param event The drag event
 */
function dragMoveListener(event) {
    var currentImage = event.target

    var x = (parseFloat(currentImage.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(currentImage.getAttribute('data-y')) || 0) + event.dy

    currentImage.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    currentImage.setAttribute('data-x', x)
    currentImage.setAttribute('data-y', y)
}

/**
 * Checks if on the dragend the ingredient is inside the array (the coffee mug).
 * If not, the position will snap back to the initial position.
 *
 * @param event The drag event
 */
function checkIngredientArray(event) {
    var currentImage = event.target;

    if (arrayDraggedImages.indexOf(currentImage) === alreadyInside) {
        currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
        currentImage.setAttribute('data-x', 0)
        currentImage.setAttribute('data-y', 0)
    }
}

/* ********** DROPPING CODE *********** */

/**
 * Make an object the dropzone.
 * Ondropactive: Listen for drop related events.
 * Ondragenter: If object is dragged inside the dropzone, add it into the array, but only if it is not inside.
 * Ondragleave: If object is dragged out of the dropzone, remove the object from the array.
 * Ondropdeactivate: Remove drop related events.
 */

interact('.dropzone').dropzone({
    overlap: 1,

    ondropactivate: function (event) {
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {

        var droppedIngredient = event.relatedTarget;
        var dropzoneElement = event.target;

        dropzoneElement.classList.add('drop-target')
        droppedIngredient.classList.add('can-drop')

        if (arrayDraggedImages.indexOf(droppedIngredient) === alreadyInside) {
            arrayDraggedImages.push(droppedIngredient);
        } else {
            console.log("Ingredient already inside!");
        }
    },
    ondragleave: function (event) {

        let droppedIngredient = event.relatedTarget;
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        const index = arrayDraggedImages.indexOf(droppedIngredient);

        if (index > -1) {
            arrayDraggedImages.splice(index, 1);
        }
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})







