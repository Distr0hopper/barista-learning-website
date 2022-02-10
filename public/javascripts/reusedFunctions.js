



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

function checkMoneyForRanking(money){
    console.log(money);
    if (money >= 60 && money <=85){
        window.alert("Congratulations! You are now Sergeant of the Milk Foam! +100 Beans")
        return 100;
    }
    if (money >= 200 && money <= 225){
        window.alert("Congratulations! You are now Commander of the Coffeebeans! +200 Beans")
        return 200;
    }
    if (money >= 460 && money <= 485){
        window.alert("Congratulations! You are now Barista-Colonel! +300 Beans")
        return 300;
    }
    if (money >= 600 && money <= 625){
        window.alert("WOW! You are now the General of Baristas! +1000 Beans")
        return 1000;
    }
    return 0;

}

