/**
 * @param arrayDraggedImages: Contains the images of the ingredient
 * @param arrayImagesID: Contains the ID's of the images
 * @param drinks: Stores drinks and their ingredients
 * @param correctDrinksCounter: Counts how many drinks are made in a row
 * @param money: Get the money from the Menuebar and display it as text
 */
let arrayDraggedImages = [];
let arrayImagesID = [];
// const drinks = new Array();
let correctDrinksCounter = 0;
let wrongDrinksCounter = 0;
let correctIngredients = [];
let activeDrink = "Test";

let money = Number($('#money').text());

let allCoffees
getCoffees().then(function (result){
    allCoffees = result;
    sessionStorage.setItem("allCoffees", JSON.stringify(allCoffees))
    getActiveDrink(allCoffees);
});


async function getCoffees(){
    const test = new CoffeesForGame();
    await test.getRandomSixCoffees();
    let allCoffees = test.sixCoffees;
    $('#order').text("Please make a " + test.getCoffeeTitles()[0] + "!");
    return allCoffees;
}

//important here for level 2
async function getRandomSixCustomers(){
    const customerForGame = new Customers();
    await customerForGame.getRandomSixCustomers();
    let sixCustomers = customerForGame.sixCustomers
    return sixCustomers
}

let sixCustomers
getRandomSixCustomers().then(function (result) {
    sixCustomers = result;
    sessionStorage.setItem("sixCustomers", JSON.stringify(sixCustomers))
})

function getNextDrink(allCoffees){
    activeDrink = allCoffees.shift();
    return activeDrink;
}

function getActiveDrink(allCoffees){
    activeDrink = allCoffees.shift();
    // console.log(activeDrink);
    // console.log(getTitle(activeDrink))
    // console.log(getIngredientList(activeDrink));
    return activeDrink;
}


function getIngredientList(activeCoffee) {
    let ingredientArray = []
    for (let i = 0; i < activeCoffee.ingredientList.length; i++){
        ingredientArray.push(activeCoffee.ingredientList[i]);
    }
    return ingredientArray;
}

function getTitle(activeDrink){
    //console.log(activeDrink.title);
    return activeDrink.title;
}


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
    // console.log(allCoffees.shift());
    // console.log(allCoffees);
    // getActiveDrink(allCoffees);
    $('#plusForMoneyCounter').show();
    $('#money-counter').show();
    console.log(activeDrink)
    var submitButtonText = $('#submitGame').text();


    if (submitButtonText === 'next') {

        $('#submitGame').html('submit')
        activeDrink = getNextDrink(allCoffees);
        $('#order').text("Please make a " + getTitle(activeDrink) + "!");
    } else {
        for (let i = 0; i < arrayDraggedImages.length; i++){
            let currentImage = arrayDraggedImages[i];
            arrayImagesID.push(currentImage.id);
            console.log(currentImage.id)

            currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
            currentImage.setAttribute('data-x', 0)
            currentImage.setAttribute('data-y', 0)
        }
        correctIngredients = getIngredientList(activeDrink);
        console.log(correctIngredients);


        if (correctIngredients.sort().join() === arrayImagesID.sort().join()) {

            $('#submitGame').html('next')
           checkWrongDrinks(wrongDrinksCounter);
            $('#money').text(money);

            const moneyObjekt = {
                "moneyKey" : money,
            }
              fetch("/games/getMoney", {
                 method: 'POST',
                 body: JSON.stringify(moneyObjekt),
                 headers: {
                     'Content-Type': 'application/json'
                 },
             })

            correctDrinksCounter++;
            wrongDrinksCounter = 0;
        } else {
            wrongDrinksCounter++;
            if (wrongDrinksCounter < 3){
                $('#order').text("Wrong! Please make a " + getTitle(activeDrink) + " again!");
                window.alert("You have " + (3 - wrongDrinksCounter) + " tries left");
            } else {
                $('#order').text("Wrong! " + getTitle(activeDrink) + " = " + correctIngredients.join(" + "));
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
 * Checks how many coffees are made correctly in a row.
 * If you are on a 3 streak or more, you gain +30 beans instead of 15.
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
//tip

$("[data-toggle=tooltip]").tooltip({
    html: true,
    content: function() {
        return $('.tooltipCoffee').html();
    }
});

$(function () {
    $('.example-popover').popover({
        container: 'body'
    })
})

window.addEventListener('load', loadModalMain)
var tipModal = $('#exampleModalCenter')
tipModal.on('shown.bs.modal', function (){
    $('.card-group').innerText = createDictionary()
})






