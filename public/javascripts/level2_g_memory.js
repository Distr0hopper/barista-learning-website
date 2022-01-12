document.addEventListener('DOMContentLoaded', () => {
    const cardArray = []
    const coffeeImages = [
        {
        name: "Café au Lait",
        img: "assets/images/Ingredients/CafeAuLaitText.png"
    },
        {
            name: "Galão",
            img: "assets/images/Ingredients/GalaoText.png"
        },
        {
            name: "Irish",
            img: "assets/images/CoffeeTexts/IrishText.png"
        },
        {
            name: "Americano",
            img: "assets/images/Ingredients/AmericanoText.png"
        },
        {
            name: "Black",
            img: "assets/images/CoffeeTexts/BlackText.png"
        },{
            name: "Latte",
            img: "assets/images/CoffeeTexts/LatteText.png"
        },
        {
            name: "Cappuccino",
            img: "assets/images/CoffeeTexts/CappuccinoText.png"
        },{
            name: "Doppio",
            img: "assets/images/CoffeeTexts/DoppioText.png"
        }
        ,{
            name: "Espresso",
            img: "assets/images/CoffeeTexts/EspressoText.png"
        }
        ,{
            name: "Guayoyo",
            img: "assets/images/CoffeeTexts/GuayoyoText.png"
        }
        ,{
            name: "Lungo",
            img: "assets/images/CoffeeTexts/LungoText.png"
        }
        ,{
            name: "Macchiato",
            img: "assets/images/CoffeeTexts/MacchiatoText.png"
        }
        ,{
            name: "Cortado",
            img: "assets/images/CoffeeTexts/CortadoText.png"
        }
        ,{
            name: "Red Eye",
            img: "assets/images/CoffeeTexts/RedEyeText.png"
        }
        ,{
            name: "Mocha",
            img: "assets/images/CoffeeTexts/MochaText.png"
        },{
            name: "Ristretto",
            img: "assets/images/CoffeeTexts/RistrettoText.png"
        }
        ,{
            name: "Flat White",
            img: "assets/images/CoffeeTexts/FlatWhiteText.png"
        }
        ,{
            name: "Affogato",
            img: "assets/images/CoffeeTexts/AffogatoText.png"
        }
        ,{
            name: "Cortadito",
            img: "assets/images/CoffeeTexts/CortaditoText.png"
        }
        ,{
            name: "Aquapanela Coffee",
            img: "assets/images/CoffeeTexts/AquapanelaCoffeeText.png"
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
    //Create Array only Containing CoffeeNames and Images
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
    //createArray of Customers
    storedCustomers.forEach((customer, k) => {
        customerArray[k] = customer
    })
    console.log(storedCustomers)
    console.log(customerArray)
    //match CoffeeNames to images and create new array for matched images
    //nameorder is there to match the coffeeCustomers with the same name as the Drinks they ordered
    var nameOrder = "coffeeOrder";
    let coffeeImageName = []
    //console.log(coffeeNameArray)
    //console.log(coffeeImageName)
    for (let i = 0; i < coffeeNameArray.length * 2; i++) {
        //check if index is even, then add customer
        if (i % 2 === 0) {
            //depending on index, need to still get next item in array of customer
            if (i === 0){
                var index = i
            } else {
                var index = i-(i/2)
            }
            //create memorycard with customer name and img src
            var memorycard = {
                name: nameOrder,
                img: customerArray[index]
            }
            cardArray[i] = memorycard
            console.log(memorycard.name)
            console.log(memorycard.img)
        } else {
            //check if index is odd, then add drink
            //depending on index, need to still get next item in array of customer
            if (i === 1){
                var index = i-i
            } else {
                var index = i-(i/2 +0.5)
            }
            //create memorycard with customer name and img src
            var memorycard = {
                name: nameOrder,
                img: coffeeNameArray[index].img
            }
            cardArray[i] = memorycard
           // console.log(memorycard.name)
           // console.log(memorycard.img)

            //add something to distinguish the names of the orders (tacky I know)
            nameOrder += "1"
           // console.log(nameOrder)
        }
        console.log(memorycard)
    }
    console.log(cardArray);
    //Randomize orders and customers in array
    cardArray.sort(() => 0.5 - Math.random())

    function createBoard() {
        //creates array of images, with src set to coffeemug and set height, width and id
        //as soon as clicked, call flipcard
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
        //gets the clicked cards and compares their names to see if they are even
        const cards = document.querySelectorAll('#memory-img')
        //console.log(cards)
        const optionOneId = cardsChosenID[0]
        //console.log(optionOneId)
        const optionTwoId = cardsChosenID[1]
        //checks if same name and if they are different cards
        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            alert('You found a match');
            cardsWon.push(cardsChosen)
            //console.log(cardsWon)
        } //checks if card was clicked twice
        else if (cardsChosen[0] === cardsChosen[0] && optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            alert('You need to pick two different cards!')
        } else {
            cards[optionOneId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            //console.log(cards[optionOneId])
            cards[optionTwoId].setAttribute('src', 'assets/images/Memory-Backdrop.png')
            //console.log(cards[optionTwoId])
            alert('Sorry try again')

        }
        cardsChosen = []
        cardsChosenID = []
        //puts amount of cards won into score
        resultDisplay.textContent = cardsWon.length;
        //if no cards left display you won
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations you won!'
        }
    }

    //flip card
    function flipcard() {
        //gets id of clicked card and puts id and name into cardsChosen/cardsChosenID, sets img to new src and calls checkformatch
        var cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenID.push(cardID)
        console.log(cardArray[cardID])
        this.setAttribute('src', cardArray[cardID].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()

})