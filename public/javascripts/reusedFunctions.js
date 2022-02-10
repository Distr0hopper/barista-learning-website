/**loadModal() loads modal and shows it
 * then it sets the timer until the modal disappears with a countdown
 * while theres at elast 1 second remaining it counts down, at 0 it shows finished and afterwards closes the modal
 */


async function loadMemory() {
    const cardArray = []
    const grid = document.querySelector('.grid')
    const gridShow = document.querySelector('.gridShow')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []
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

    /**
     * createBoard() creates an array of images, with src set to coffeemug and set height, width and id
     * calls flipcard on click*/
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', "../assets/images/Memory-Backdrop.png")
            card.setAttribute('data-id', i)
            card.setAttribute('height', '200px')
            card.setAttribute('width', '200px')
            card.setAttribute('id', 'memory-img')
            card.style.padding = '5px 5px 5px 5px'
            card.style.transformStyle = 'preserve-3d'
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }

    /**
     * checkForMatch() checks for matches
     * 1. gets the clicked cards and compares their names to see if they are even
     * 2. checks if cards match and if cards clicked are not the same card, alerts if match and pushes cards to cardsWon
     * 3. if no match, checks if if cards clicked were the same card, and alerts if true
     * 4. else cards don't match and alert
     * Puts won cards into score after each round and checks if still cards left or game is over*/
    function checkForMatch() {
        let money = Number($('#money').text());
        const cards = document.querySelectorAll('#memory-img')
        const optionOneId = cardsChosenID[0]
        const optionTwoId = cardsChosenID[1]
        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            money += 10;
            $('#money').text(money);
            //if no cards left display you won

            /* Fetch the money to the server so it can be stored in the session
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
             */
            // alert('You found a match');
            cardsWon.push(cardsChosen)
        } //checks if card was clicked twice
        else if (cardsChosen[0] === cardsChosen[0] && optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
            cards[optionTwoId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
            alert('You need to pick two different cards!')
        } else {
            cards[optionOneId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
            cards[optionTwoId].setAttribute('src', '../assets/images/Memory-Backdrop.png')
            // alert('Sorry try again')

        }
        cardsChosen = []
        cardsChosenID = []
        //puts amount of cards won into score
        resultDisplay.textContent = cardsWon.length*10;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations you won!'
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

    // createBoard()

    function showboard() {
        let timeleft = 4;
        for (let i = 0; i < cardArray.length; i++) {
            var cardAllShown = document.createElement('img')
            cardAllShown.setAttribute('src', cardArray[i].img)
            cardAllShown.setAttribute('data-id', i)
            cardAllShown.setAttribute('height', '200px')
            cardAllShown.setAttribute('width', '200px')
            cardAllShown.setAttribute('id', 'memory-img')
            cardAllShown.style.padding = '5px 5px 5px 5px'
            cardAllShown.style.transformStyle = 'preserve-3d'
            gridShow.appendChild(cardAllShown);
            gridShow.id = "allShownGrid";
        }
        setTimeout(function () {
            $('.gridShow').remove();
            createBoard()
        }, 9000)


    }
    showboard()

}

function checkMoneyForRanking(money){
    if (money >= 60 && money <=80){

    }
}