let arrayDraggedImages = [];
let arrayImagesID = [];
let correctDrinksCounter = 0;
let wrongDrinksCounter = 0;
let correctIngredients = [];
let activeDrink = "";
let levelUpBonus = 0;
let navbarMoney = Number($('#money').text());
let drinksMixedSoFar = 0;
let earnedMoneyAddedUp = 0;


let allCoffees
/**
 * Set all coffees which has to be done in the entire game.
 * Store them in the session, so they are the same in the next levels.
 * Get the current coffee which hast to be done.
 */
getCoffees().then(function (result) {
    allCoffees = result;
    sessionStorage.setItem("allCoffees", JSON.stringify(allCoffees))
    getNextDrink(allCoffees);
});

/**
 * returns all Coffees
 * important for Level 2+3 also, because these will be stored in the sessionStorage (->see getCoffees().then())*/
async function getCoffees() {
    const fetchedCoffees = new CoffeesForGame();
    await fetchedCoffees.getRandomSixCoffees();
    let allCoffees = fetchedCoffees.sixCoffees;
    $('#order').text("Please make a " + fetchedCoffees.getCoffeeTitles()[0] + "!");
    return allCoffees;
}

//important here for level 2
/**
 * returns six Customers
 * important for Level 2 and so on, because these will be stored in the sessionStorage (->see getRandomSixCustomers().then())*/
async function getRandomSixCustomers() {
    const customerForGame = new Customers();
    await customerForGame.getRandomSixCustomers();
    let sixCustomers = customerForGame.sixCustomers
    return sixCustomers
}

/**
 * Set all customers.
 * Store them into the session, so they are the same in the next levels.
 */
let sixCustomers
getRandomSixCustomers().then(function (result) {
    sixCustomers = result;
    sessionStorage.setItem("sixCustomers", JSON.stringify(sixCustomers))
})

/**
 * Get next coffee which has to be done.
 * @param allCoffees Array which includes all six coffees for the entire game.
 * @return {Coffee} Coffee object.
 */
function getNextDrink(allCoffees) {
    activeDrink = allCoffees.shift();
    return activeDrink;
}

/**
 * Get the ingredients as array from the current coffee.
 * @param activeCoffee Current coffee which has to be done.
 * @return Ingredients in an array.
 */
function getIngredientArray(activeCoffee) {
    let ingredientArray = []
    for (let i = 0; i < activeCoffee.ingredientList.length; i++) {
        ingredientArray.push(activeCoffee.ingredientList[i]);
    }
    return ingredientArray;
}

/**
 * Get the title from the active coffee.
 * @param activeDrink Current coffee which has to be done.
 * @return {String} Title from the coffee.
 */
function getTitle(activeDrink) {
    return activeDrink.title;
}


/**
 * Function is called when submit button is pressed.
 * If the button is next, display the next drink to make.
 * If the button is submit, check if the dropped ingredients are the same as the correct ingredients and snap them to it's original position.
 * When they are correct, look how many attempts the user needed to make the coffee right.
 * Depending on the number of attempts, the user gets a different number of beans.
 * Also checking if the user looked in the dictionary to make the coffee.
 * Depending on how often he looked up there, the user gets less beans.
 * When the coffee is wrong, count an attempt + 1.
 * If the user cannot make the coffee in 3 attempts, display the correct answer.
 * Fetch the rewards to the server to store them in a session if the last coffee is made.
 */
function submitGame() {

    const submitButtonText = $('#submitGame').text();

    if (submitButtonText === 'next') {
        $('#submitGame').html('submit')
        $('#remainingAttempts').text("You have " + 3 + " attempts left")
        activeDrink = getNextDrink(allCoffees);

        try {
            $('#order').text("Please make a " + getTitle(activeDrink) + "!");
        } catch (e) {
            finishGame();
        }
        levelUpBonus = 0;
    } else {
        snapIngredientsBack();
        correctIngredients = getIngredientArray(activeDrink);
        if (correctIngredients.sort().join() === arrayImagesID.sort().join()) {
            $('#submitGame').html('next')
            calculateMoney();

        } else {
            wrongDrinksCounter++;
            if (wrongDrinksCounter < 3) {
                $('#order').text("Wrong! Please make a " + getTitle(activeDrink) + " again!");
                $('#remainingAttempts').text("You have " + (3 - wrongDrinksCounter) + " attempts left")
            } else {
                $('#order').text("Wrong! " + getTitle(activeDrink) + " = " + correctIngredients.join(" + "));
                $('#submitGame').html('next');
                $('#remainingAttempts').text("You have " + 0 + " attempts left")
                $('#remainingCoffeesTillFinished').text((allCoffees.length) + " coffees left to mix until points are saved")
                wrongDrinksCounter = 0;
                drinksMixedSoFar++;
            }
            correctDrinksCounter = 0;
        }
        arrayImagesID = [];
        arrayDraggedImages = [];
    }
}

/**
 * Snap the ingredients back to its position.
 * Called when the submit button is clicked.
 */
function snapIngredientsBack(){
    for (let i = 0; i < arrayDraggedImages.length; i++) {
        let currentImage = arrayDraggedImages[i];
        arrayImagesID.push(currentImage.id);
        currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
        currentImage.setAttribute('data-x', 0)
        currentImage.setAttribute('data-y', 0)
    }
}

/**
 * Calculates how much money you receive by mixing a coffee.
 * Checking on which attempt the coffee is made correct.
 * Checking if you received helps, so you receive less.
 * Checking if you level-up, so you receive a bonus.
 * Update the message and the sessionstorage.
 */
function calculateMoney(){
    // Check how much coffee beans you receive by making the drink right
    earnedMoneyAddedUp = checkWrongDrinks(wrongDrinksCounter);
    // Check if you received any help
    earnedMoneyAddedUp -= countHelpsAndReturnDeduction();
    // Check if you receive a lvl-up bonus
    levelUpBonus += checkMoneyForRanking(navbarMoney + earnedMoneyAddedUp);
    earnedMoneyAddedUp += levelUpBonus;
    // Add the amount of beans you received to the money
    navbarMoney += earnedMoneyAddedUp;
    // Update the Message
    updateMessage(earnedMoneyAddedUp, correctDrinksCounter, wrongDrinksCounter);
    // Update session storage user so the modals only show up with 0 points
    updateSessionStorage();

    correctDrinksCounter++;
    drinksMixedSoFar++;
    //countdown for drinks to still need to do until points are saved to db
    $('#remainingCoffeesTillFinished').text((allCoffees.length) + " coffees left to mix until points are saved")
    wrongDrinksCounter = 0;
}

/**
 * Update the points from the user in the session, so the introduction dont show up again.
 */
function updateSessionStorage(){
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);
    currentUser.points += navbarMoney;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
}

/**
 * Called when the array is empty.
 * So no coffee has to be done and the points are fetched to the server, where they are saved in the database.
 * Display redo-, and next-Button.
 */
function finishGame() {
    $('#remainingAttempts').text("")
    const moneyObjekt = {
        "moneyKey": navbarMoney,
    }
    fetch("/games/getMoney", {
        method: 'POST',
        body: JSON.stringify(moneyObjekt),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    $('#money').text(navbarMoney);
    updateMoneyCounter(earnedMoneyAddedUp)
    $('#submitGame').hide();
    $('#redoGame').show();
    if (navbarMoney >= 60) {
        $('#playNextGame').show();
        $('#order').text("Well done, you made all coffees! You can play the next game if you want!");
    } else if (navbarMoney < 60) {
        $('#playNextGame').show().prop("disabled", true).css("background-color", "grey");
        $('#order').text("Well done, you made all coffees! You just need " + (60 - navbarMoney) + " more points to play the next level!");
    }
}

/**
 * Checks how often you clicked the help button. Depending on that you receive less coffee beans.
 * since countHelps is false at beginning it counts the amount of clicks, when true stops
 * @returns {number} Returns the deduction you receive by getting help
 */
function countHelpsAndReturnDeduction() {
    let helpClicks = countHelps(false);
    console.log("Help Button Clicks " + helpClicks)
    if (helpClicks === 1) {
        correctDrinksCounter = 0;
        countHelps(true);
        return 3;
    }
    if (helpClicks > 1) {
        correctDrinksCounter = 0;
        countHelps(true);
        return 6;
    }
    countHelps(true);
    return 0;
}

/**
 * Updated the message when you made a coffee right
 * @param earnedMoney the amount of beans you receive for the coffee
 * @param correctDrinksCounter How many drinks you made right in a row
 * @param wrongDrinksCounter In which try you made the drink
 */
function updateMessage(earnedMoney, correctDrinksCounter, wrongDrinksCounter) {
    if (correctDrinksCounter < 2) {
        $('#order').text("You made it right on the first try! +" + earnedMoney + "  beans!");
    }
    if (correctDrinksCounter >= 2) {
        $('#order').text("You are on a " + (correctDrinksCounter + 1) + " streak! +" + earnedMoney + " beans!")
    }
    if (wrongDrinksCounter === 1) {
        $('#order').text("You made it right on the " + (wrongDrinksCounter + 1) + " try! +" + earnedMoney + " beans!");
    }
    if (wrongDrinksCounter === 2) {
        $('#order').text("You made it right on the " + (wrongDrinksCounter + 1) + " try! +" + earnedMoney + " beans!");
    }
}


/**
 * Checks how many coffees are made correctly in a row.
 * If you are on a 3 streak or more, you gain +30 beans instead of 15.
 * @param correctDrinksCounter the amount of correct coffees made in a row
 * @returns {number} The number of earned beans you receive for this round.
 */
function checkCorrectDrinks(correctDrinksCounter) {
    if (correctDrinksCounter < 2) {
        return 15;
    } else if (correctDrinksCounter >= 2) {
        return 30;
    }
}

/**
 * Checks on which try the coffee is made correct.
 * If you made it on the first try, call checkCorrectDrinks to look if you are on a streak.
 * Give 15 Points on first try, 12 on second plaand 9 on third try.
 * @param wrongDrinksCounter on which attempt you made it right
 * @returns {number} The number of earned beans you receive for this round.
 */
function checkWrongDrinks(wrongDrinksCounter) {
    if (wrongDrinksCounter === 0) {
        return checkCorrectDrinks(correctDrinksCounter);
    } else if (wrongDrinksCounter === 1) {
        return 12;
    } else if (wrongDrinksCounter === 2) {
        return 7;
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
    },
    onstart: function (event) {
        var target = event.target;

        // Bring element in front of its siblings
        target.parentNode.appendChild(target);
    }
})
//tip

$("[data-toggle=tooltip]").tooltip({
    html: true,
    content: function () {
        return $('.tooltipCoffee').html();
    }
});

$(function () {
    $('.example-popover').popover({
        container: 'body'
    })
})

var explainModal = $('#ModalExplainGame');

async function loadModalExplain() {
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);
    // console.log(currentUser);

    if (currentUser.points === 0) {
        explainModal.modal('show');
    }
}

window.addEventListener('load', async () => {
    await loadModalExplain();
})

var tipModal = $('#exampleModalCenter')
tipModal.on('shown.bs.modal', function () {
    $('.card-group').innerText = createDictionary()
})




