document.addEventListener('DOMContentLoaded', () => {
//    card options
//    TODO: How to change CoffeeID to be matching to customer id (=name) so that they match
//    TODO: current matching: checks if name = name1 then match, so something similar should happen from the database names

    const cardArray = [
        {
            name: 'indian-woman',
            img: 'assets/images/Customers/indian-woman.png'
        },
        {
            name: 'indian-woman',
            img: 'https://cdn-icons-png.flaticon.com/512/1778/1778134.png'
        },
        {
            name: 'karen',
            img: 'assets/images/Customers/karen.png'
        },
        {
            name: 'karen',
            img: 'https://cdn-icons-png.flaticon.com/512/3790/3790742.png'
        },
        {
            name: 'old-black-man',
            img: 'assets/images/Customers/old-black-man.png'
        },
        {
            name: 'old-black-man',
            img: 'https://cdn-icons-png.flaticon.com/512/5158/5158490.png'
        },
        {
            name: 'red-head-man',
            img: 'assets/images/Customers/red-head-man.png'
        },
        {
            name: 'red-head-man',
            img: 'https://cdn-icons.flaticon.com/png/512/3010/premium/3010061.png?token=exp=1639307162~hmac=5e97df7095089bc1122c1ab0b08632a7'
        },
        {
            name: 'samurai-man',
            img: 'assets/images/Customers/samurai-man.png'
        },
        {
            name: 'samurai-man',
            img: 'https://cdn-icons-png.flaticon.com/512/1448/1448432.png'
        },
        {
            name: 'black-woman',
            img: 'assets/images/Customers/black-woman.png'
        },
        {
            name: 'black-woman',
            img: 'https://cdn-icons.flaticon.com/png/512/1079/premium/1079087.png?token=exp=1639307228~hmac=c2dfb64ef512d350e352313a122e3b04'
        }
    ]
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', "assets/images/Memory-Backdrop.png")
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

    //check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll('#memory-img')
        console.log(cards)
        const optionOneId = cardsChosenID[0]
        console.log(optionOneId)
        const optionTwoId = cardsChosenID[1]
        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            alert('You found a match');
            // cards[optionOneId].setAttribute('src', '../../../../assets/tackyBackroundColor.png')
            // console.log(cards[optionOneId])
            // cards[optionTwoId].setAttribute('src', '../../../../assets/tackyBackroundColor.png')
            // console.log(cards[optionTwoId])
            cardsWon.push(cardsChosen)
            console.log(cardsWon)
        } else if(cardsChosen[0] === cardsChosen[0] && optionOneId === optionTwoId){
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            alert('You need to pick two different cards!')
        }
        else {
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            console.log(cards[optionOneId])
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            console.log(cards[optionTwoId])
            alert('Sorry try again')

        }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations you won!'
        }
    }

    //flip card
    function flipcard() {
        var cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenID.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }


    createBoard()

})