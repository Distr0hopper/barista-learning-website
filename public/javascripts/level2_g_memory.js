const cardArray = []
const grid = document.querySelector('.grid')
const gridShow = document.querySelector('.gridShow')
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenID = []
var cardsWon = []
var correctMatches = 0;
let money = Number($('#money').text());
/**
 * prevents modal from being able to clicked away if you click somewhere else in the screen
 * you have to watch the content of the modal for the 5 sec and only afterwards are shown the memory*/
$(window).on('load', function () {
    $('#gameModal2').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,

    })
})
/**important so popover shows up
 * has to be done in js bc of very nested HTML code, doesnt work without it for some reason*/
$(function () {
    $('.example-popover').popover({
        container: 'body'
    })
})

/**
 * asynchronous function that fetches the coffees and customers from the sessionStorage and displays them in a modal with a countdown*/
async function loadModalMemory() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');
    var timeleft = 5;
    var currentHTMLText = document.querySelector("#modal-title").textContent;
    var downloadTimer = setInterval(function () {
        if (timeleft > 0) {
            gameModal.find('.modal-title').text(currentHTMLText + " " + timeleft + ' seconds remaining');
        } else if (timeleft < 0) {
            // gameModal.modal("hide");
            gameModal.modal('hide');
        } else {
            clearInterval(downloadTimer);
            gameModal.find('.modal-title').text(currentHTMLText + ' Finished');
            gameModal.modal('hide');
        }
        timeleft -= 1;
    }, 1000);

    /**
     * put Coffeetitles in modal*/
    var modalInput = JSON.parse(sessionStorage.getItem("modalInput"));
    console.log(modalInput)
    const coffeeOrderCards = $('.card-title');
    const coffeeOrderCustomers = $('.card-img-top');
    const orderHeader = $('#order');
    for (let i = 0; i < modalInput.length; i++) {
        coffeeOrderCards[i].innerText = modalInput[i].title
        coffeeOrderCustomers[i].src = modalInput[i].img
    }
    orderHeader.innerText = modalInput[0].title
}

/**
 * loadModal() gets Info about customers and coffees for the memory game from sessionStorage calls showBoard()
 */
async function loadMemory() {

    /**
     * fetch Sessionstorage*/
    var storedCustomers = JSON.parse(sessionStorage.getItem("sixCustomerImg"));
    var storedCoffeeNames = JSON.parse(sessionStorage.getItem("allCoffees"));
    var coffeeNameArray = []
    /**
     * Goal here: convert fetched storage to arrays
     * Firs we Create Array only Containing CoffeeNames and Images*/
    storedCoffeeNames.forEach((coffee, j) => {
        coffeeNameArray[j] =
            {
                title: coffee.title,
                img: "../coffee/" + coffee.coffeeImgPath
            }
    })
    /**
     * Then an Array called createArray of Customers*/
    /**
     * Goal here: match CoffeeNames to images and create new array for matched images
     * nameorder is there to match the coffeeCustomers with the same name as the Drinks they ordered*/
    var nameOrder = "coffeeOrder";
    /**This loop
     * First: checks if Index is even, if so add a customer
     * Second: if index is odd, add a drink
     * Third: Adda a 1 to distinguish the names of the orders (a little bit of a tacky solution) */
    for (let i = 0; i < coffeeNameArray.length * 2; i++) {
        //check if index is even, then add customer
        if (i % 2 === 0) {
            /**depending on index, need to still get next item in array of customer*/
            if (i === 0) {
                var index = i
            } else {
                var index = i - (i / 2)
            }
            //create memorycard with customer name and img src
            var memorycard = {
                name: nameOrder,
                img: storedCustomers[index]
            }
            cardArray[i] = memorycard
        } else {
            //check if index is odd, then add drink
            /**depending on index, need to still get next item in array of customer*/
            if (i === 1) {
                var index = i - i
            } else {
                var index = i - (i / 2 + 0.5)
            }
            //create memorycard with customer name and img src
            var memorycard = {
                name: nameOrder,
                img: coffeeNameArray[index].img
            }
            cardArray[i] = memorycard
            //add something to distinguish the names of the orders (tacky I know)
            nameOrder += "1"
        }
    }
    /**Randomize orders and customers in array*/
    cardArray.sort(() => 0.5 - Math.random())
    showBoard()
}

/**
 * createBoard() creates an array of images, with src set to coffeemug and set height, width and id
 * calls flipcard on click*/
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', "../assets/images/Memory-Backdrop.png")
        card.setAttribute('data-id', i)
        card.setAttribute('id', 'memory-img') // the id should be unique
        card.setAttribute('class', 'child')
        card.addEventListener('click', flipcard)
        grid.appendChild(card)
    }
    return grid
}

/**
 * checkForMatch() checks for matches
 * 1. gets the clicked cards and compares their names to see if they are even
 * 2. checks if cards match and if cards clicked are not the same card, alerts if match and pushes cards to cardsWon
 * 3. if no match, checks if if cards clicked were the same card, and alerts if true
 * 4. else cards don't match and alert
 * Puts won cards into score after each round and checks if still cards left or game is over*/
let bonusMoney = 0;
function checkForMatch() {
    const cards = document.querySelectorAll('#memory-img')
    const optionOneId = cardsChosenID[0]
    const optionTwoId = cardsChosenID[1]
    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
        correctMatches++;
        money += 10;
        // Check if you lvl up, if true, then display your bonus money in the navbar
        bonusMoney += checkMoneyForRanking(money);
        if (bonusMoney !== 0) {
            money += bonusMoney;
            $('#plusForMoneyCounter').show();
            $('#money-counter').show();
            $('#money-counter').text(bonusMoney);
        }

        if (correctMatches === 6) {
            const moneyObjekt = {
                "moneyKey": money,
            }
            fetch("/games/getMoney", {
                method: 'POST',
                body: JSON.stringify(moneyObjekt),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            bonusMoney += 60;
            $('#money').text(money);
            $('#money-counter').text(bonusMoney);
        }
        cardsWon.push(cardsChosen)
    } //checks if card was clicked twice
    else if (cardsChosen[0] === cardsChosen[0] && optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
        cards[optionTwoId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
        alert('You need to pick two different cards!')
    } else {
        cards[optionOneId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
        cards[optionTwoId].setAttribute('src', '../assets/images/Memory-Backdrop.png')

    }
    cardsChosen = []
    cardsChosenID = []
    //puts amount of cards won into score
    resultDisplay.textContent = cardsWon.length * 10;

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations you won! You can now play the last lvl!'
    }
}

/**
 * flipcard() flips card
 * gets id of clicked card and puts id and name into cardsChosen
 * sets img to new src and calls checkformatch as soon as to cards were flipped*/
function flipcard() {
    //gets id of clicked card and puts id and name into cardsChosen/cardsChosenID, sets img to new src and calls checkformatch
    var cardID = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardArray[cardID].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 800)
    }
}

/**
 * showBoard () sets the timer until the modal has disappeared with a countdown and shows the memory afterwards for a few seconds
 * it the calls createBoard which hides the modal again and calls upon the real game mechanic*/
function showBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var cardAllShown = document.createElement('img')
        cardAllShown.setAttribute('src', cardArray[i].img)
        cardAllShown.setAttribute('data-id', i)
        cardAllShown.setAttribute('id', 'memory-img')
        cardAllShown.setAttribute('class', 'child')
        gridShow.appendChild(cardAllShown);
        gridShow.id = "allShownGrid";
    }
    setTimeout(function () {
        $('.gridShow').remove();
        createBoard()
    }, 9000)

}
/**The Eventlistener loads on windowload the following three functions asynchronously so it actually waits for each function to execute their code before he calls the next
 * important so the same content is actually loaded from level2 in level2memory
 * and important so the modal is loaded after the content has laoded*/
window.addEventListener('load', async ()=>{
    await loadModalMemory();
    await loadMemory();
    await loadModal()
})
//
// window.addEventListener('load', loadModalMemory)
// window.addEventListener('load', loadMemory)
