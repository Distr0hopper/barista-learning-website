
function checkMoneyForRanking(money) {
    console.log(money);
    if (money >= 60 && money <= 85) {
        window.alert("Congratulations! You are now Sergeant of the Milk Foam! +100 Beans")
        return 100;
    }
    if (money >= 280 && money <= 305) {
        window.alert("Congratulations! You are now Commander of the Coffeebeans! +200 Beans")
        return 200;
    }
    if (money >= 600 && money <= 625) {
        window.alert("Congratulations! You are now Barista-Colonel! +300 Beans")
        return 300;
    }
    if (money >= 1000 && money <= 1030) {
        window.alert("WOW! You are now the General of Baristas! +500 Beans")
        return 500;
    }
    return 0;
}

function redirectLvlTwo() {
    window.location = '/games/gameLevelTwo'
}

function redirectToMemoryLvl2() {
    window.location = '/games/gameLevelTwoMemory '
}

function redirectToMemoryLvl3(){
    window.location = '/games/gameLevelThreeMemory'
}



async function loadModal() {
    var gameModal = $('#gameModal')
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
    var coffeesForLevel2 = JSON.parse(sessionStorage.getItem("allCoffees"))
    const coffeeOrderCards = $('.card-title');
    const coffeeTitles = coffeesForLevel2.map(coffee => {
        return coffee.title
    });
    for (let i = 0; i < coffeeOrderCards.length; i++) {
        coffeeOrderCards[i].innerText = coffeeTitles[i];
    }
    /**Put Coffee To Make Into Game*/
    const orderHeader = $('#order');
    orderHeader.innerText = coffeeTitles[0]

    /**put CustomerImages in modal*/
    var customersForLevel2 = JSON.parse(sessionStorage.getItem("sixCustomers"))
    console.log(customersForLevel2)
    const coffeeOrderCustomers = $('.card-img-top');
    var customersLevel2Img = []
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        customersLevel2Img[i] = customersForLevel2[i].customerImgPath
    }
    console.log(coffeeOrderCustomers)
    // const customerImges = customersForLevel2.map(customer => {
    //     return customer.customerImgPath
    // })

    sessionStorage.setItem("sixCustomerImg", JSON.stringify(customersLevel2Img))

    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customersLevel2Img[i];
    }

    const modalInputMap = coffeeTitles.map((order, i) => {
        return {
            title: coffeeTitles[i],
            img: coffeeOrderCustomers[i]
        }
    })
    console.log(modalInputMap)
    sessionStorage.setItem("modalInput", JSON.stringify(modalInputMap))
}

