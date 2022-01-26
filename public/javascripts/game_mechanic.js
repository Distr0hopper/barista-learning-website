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
var wrongDrinksCounter = 0;

drinks["americano"] = new Array("espresso", "hotWater");
drinks["latte"] = new Array("espresso", "milk", "milkfoam");
drinks["mocha"] = new Array("espresso","chocolateSyrup","milk","milkfoam");
drinks["cappuccino"] = new Array("espresso", "milk","milkfoam") ;
drinks["breve"] = new Array("espresso","milk");
drinks["macchiato"] = new Array("espresso","milkfoam");
//drinks["irish"] = new Array("brewedCoffee","whiskey","cream")
drinks["caffe au lait"] = new Array("brewedCoffee","milk");
drinks["mocha breve"] = new Array("espresso","chocolateSyrup","milk","milkFoam");
var activeDrink = 'americano';
var money = Number($('#money').text());

/**
 * Function is called when submit button is pressed.
 * If the button is next, display the next drink to make.
 * If the button is submit, check if the dropped ingredients are the same as the correct ingredients and snap them to it's original position.
 * When they are correct, look how many attempts the user needed to make the coffee right.
 * Depending on the number of attempts, the user gets a different number of beans.
 * Fetch the rewards to the server to store them in a session.
 * When they are wrong, count an attempt + 1.
 * If the user cannot make the coffee in 3 attempts, display the correct answer.
 * Empty arrays at the end.
 *
 * @param submitButtonText:  get the current text of the submit button. Can be "Next" or "Submit".
 * @param moneyObject: JSON object containing the key moneyKey and the Value
 */
function submitGame(){
    $('#plusForMoneyCounter').show();
    $('#money-counter').show();

    var submitButtonText = $('#submitGame').text();

    if (submitButtonText === 'next') {

        $('#submitGame').html('submit')
        // Get Drinks from the Database
        if (activeDrink == 'americano') {
            $('#order').text("2. Please make a LATTE!");
            activeDrink = 'latte';
        } else if (activeDrink == 'latte') {
            $('#order').text("3. Please make a MOCHA!");
            activeDrink = 'mocha';

        } else if (activeDrink == 'mocha') {
            $('#order').text("4. Please make a CAPPUCCINO!");
            activeDrink = 'cappuccino';

        } else if (activeDrink == 'cappuccino') {
            $('#order').text("5. Please make a BREVE!");
            activeDrink = 'breve';

        } else if (activeDrink == 'breve') {
            $('#order').text("6. Please make a MACCHIATO!");
            activeDrink = 'macchiato';

        } else if (activeDrink == 'macchiato') {
            $('#order').text("7. Please make an IRISH COFFEE!");
            activeDrink = 'irish';

        } else if (activeDrink == 'irish') {
            $('#order').text("8. Please make a CAFFE AU LAIT!");
            activeDrink = 'caffe au lait';

        } else if (activeDrink == 'caffe au lait') {
            $('#order').text("9. Please make an ESPRESSO CON PANNA!");
            activeDrink = 'espresso con panna';

        } else if (activeDrink == 'espresso con panna') {
            $('#order').text("10. Please make a MOCHA BREVE!");
            activeDrink = 'mocha breve';

        }
    } else {


        for (i = 0; i < arrayDraggedImages.length; i++){
            let currentImage = arrayDraggedImages[i];
            arrayImagesID.push(currentImage.id);

            currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
            currentImage.setAttribute('data-x', 0)
            currentImage.setAttribute('data-y', 0)
        }
        correctIngredients = drinks[activeDrink];

        if (correctIngredients.sort().join() === arrayImagesID.sort().join()) {

            $('#submitGame').html('next')
           checkWrongDrinks(wrongDrinksCounter);
            $('#money').text(money);

            const moneyObjekt = {
                "moneyKey" : money,
            }
             fetch("/getMoney",{
                 method: 'POST',
                 body: JSON.stringify(moneyObjekt),
                 headers: {
                     'Content-Type' : 'application/json'
                 },
             })

            correctDrinksCounter++;
            wrongDrinksCounter = 0;
        } else {
            wrongDrinksCounter++;
            if (wrongDrinksCounter < 3){
                $('#order').text("Wrong! Please make a " + activeDrink + " again!");
                window.alert("You have " + (3 - wrongDrinksCounter) + " tries left");
            } else {
                $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));
                $('#submitGame').html('next');
                wrongDrinksCounter = 0;
            }

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
function checkCorrectDrinks(correctDrinksCounter) {
    if (correctDrinksCounter < 2){
        $('#order').text("You made it right on the first try! +15 beans!");
        money += 15;
        $('#money-counter').text("15")
    }
    else if (correctDrinksCounter >= 2){
        money += 30;
        $('#money-counter').text("30")
        $('#order').text("You are on a " + (correctDrinksCounter + 1) + " streak! +30 beans!")
    }
}

/**
 * Checks on which try the coffee is made correct.
 * If you made it on the first try, call checkCorrectDrinks to look if you are on a streak.
 * Give 15 Points on first try, 10 on second try and 5 on third try.
 * @param wrongDrinksCounter on which attempt you made it right
 */
function checkWrongDrinks(wrongDrinksCounter){
    if (wrongDrinksCounter === 0){
        checkCorrectDrinks(correctDrinksCounter);
    } else if (wrongDrinksCounter === 1){
        money += 10;
        $('#money-counter').text("10");
        $('#order').text("You made it right on the " + (wrongDrinksCounter + 1) + " try! +10 beans!");
    } else if (wrongDrinksCounter === 2){
        money += 5;
        $('#money-counter').text("5");
        $('#order').text("You made it right on the " + (wrongDrinksCounter + 1)+ " try! +5 beans!");
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
function checkIngredientArray(event){
    var currentImage = event.target;

    if(arrayDraggedImages.indexOf(currentImage) === alreadyInside){
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

        if (arrayDraggedImages.indexOf(droppedIngredient) === alreadyInside){
            arrayDraggedImages.push(droppedIngredient);
        } else {
            console.log("Ingredient already inside!");
        }
    },
    ondragleave: function (event) {

        let droppedIngredient = event.relatedTarget;
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        const index =arrayDraggedImages.indexOf(droppedIngredient);

        if (index > -1 ) {
            arrayDraggedImages.splice(index, 1);
        }
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})







