document.addEventListener('DOMContentLoaded', () => {
//    card options
//    TODO: How to change CoffeeID to be matching to customer id (=name) so that they match
//    TODO: current matching: checks if name = name1 then match, so something similar should happen from the database names

    const cardArray = [
        /*   {
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
           }*/
    ]
    const coffeeImages = [{
        name: "Café au Lait",
        img: "assets/images/Ingredients/Brown_Sugar.png"
    },
        {
            name: "Irish",
            img: "assets/images/Ingredients/Brewed_Coffee.png"
        },
        {
            name: "Galão",
            img: "assets/images/Ingredients/Coffee_Cup.png"
        },
        {
            name: "Irish",
            img: "assets/images/Ingredients/heisser-kaffee.png"
        },
        {
            name: "Guayoyo",
            img: "assets/images/Ingredients/Milk.png"
        },
        {
            name: "Americano",
            img: "assets/images/Ingredients/Hot_Water.png"
        },
        {
            name: "Latte",
            img: "assets/images/Ingredients/Espresso.png"
        }
    ]

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []
    //fetch Sessionstorage
    var storedCustomers = JSON.parse(sessionStorage.getItem("customers"))
    var storedCoffeeNames = JSON.parse(sessionStorage.getItem("coffees"));
    var coffeeNameArray = []
    var customerArray = []
    //convert storage to arrays
    console.log(storedCoffeeNames)
    storedCoffeeNames.forEach((coffee, j) => {
        coffeeNameArray[j] =
            // coffee.title
            {
                title: coffee.title,
                img: ''
            }
        for (let l = 0; l < coffeeImages.length; l++) {
            if (coffee.title === coffeeImages[l].name){
                coffeeNameArray[j].img = coffeeImages[l].img
            }
        }

    })
    console.log(coffeeNameArray)
    storedCustomers.forEach((customer, k) => {
        customerArray[k] = customer
    })
    console.log(storedCustomers)
    console.log(customerArray)
    var nameOrder = "coffeeOrder";
    //match CoffeeNames to images and create new array for matched images
    let coffeeImageName = []
    var hochzaehlen = 0;
    console.log(coffeeNameArray)
    console.log(coffeeImageName)
    //create Array with id to match later and img
    for (let i = 0; i < coffeeNameArray.length * 2; i++) {
        if (i % 2 === 0) {
            if (i === 0){
                var index = i
            } else {
                var index = i-(i/2)
            }
            var memorycard = {
                name: nameOrder,
                img: customerArray[index]
            }
            cardArray[i] = memorycard
            console.log(memorycard.name)
            console.log(memorycard.img)
        } else {
            if (i === 1){
                var index = i-i
            } else {
                var index = i-(i/2 +0.5)
            }
            console.log(index)
            var memorycard = {
                name: nameOrder,
                img: coffeeNameArray[index].img
            }
            cardArray[i] = memorycard
            console.log(memorycard.name)
            console.log(memorycard.img)
            nameOrder += "1"
            console.log(nameOrder)
        }
        console.log(memorycard)
    }

    console.log(cardArray);
    cardArray.sort(() => 0.5 - Math.random())

    // for (let j = 0; j < cardArray.length; j++) {
    //     const randomNumber = Math.floor(Math.random() * cardArray.length)
    //     randomCardArray.push(cardArray.splice(randomNumber, 1)[0]);
    // }


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
        } else if (cardsChosen[0] === cardsChosen[0] && optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            alert('You need to pick two different cards!')
        } else {
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            console.log(cards[optionOneId])
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            console.log(cards[optionTwoId])
            alert('Sorry try again')

        }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = cardsWon.length;
        // if (cardsWon.length === cardArray.length / 2) {
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations you won!'
        }
    }

    //flip card
    function flipcard() {
        var cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenID.push(cardID)
        // this.setAttribute('src', cardArray[cardID].img)
        console.log(cardArray[cardID])
        this.setAttribute('src', cardArray[cardID].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()

})