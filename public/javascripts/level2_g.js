$(window).on('load', function () {
    $('#gameModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,

    })
})

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
    const coffeeOrderCards = $('.card-text');
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
    for (let i = 0; i < customersForLevel2.length; i++) {
        customersLevel2Img[i] = customersForLevel2[i].customerImgPath
    }

    console.log(customersLevel2Img)

    sessionStorage.setItem("sixCustomerImg", JSON.stringify(customersLevel2Img))

    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customersLevel2Img[i];
    }

    const modalInputMap = coffeeTitles.map((order, i) => {
        return {
            title: coffeeTitles[i],
            img: customersLevel2Img[i]
        }
    })
    sessionStorage.setItem("modalInput", JSON.stringify(modalInputMap))
}

window.addEventListener('load', loadModal)
