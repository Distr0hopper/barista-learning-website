async function createDictionary(){

    let response = await fetch("http://localhost:9000/api/coffees");
    let coffeelist = await response.json();
    console.log(coffeelist);
    console.log(coffeelist[1].ingredientList);
    coffeelist = coffeelist.map(coffee=>{
        let ingredientArray = [];
        coffee.coffeeImgPath = "assets/images/CoffeeTexts/"+ coffee.coffeeImgPath;
        for (let i = 0; i < coffee.ingredientList.length; i++) {
            ingredientArray.push(coffee.ingredientList[i].name);
        }
        coffee.ingredientList = ingredientArray;
        return coffee
    })
    console.log(coffeelist);
    coffeelist.sort((a, b)=>a.title.localeCompare(b.title))

    
    coffeelist.forEach((coffee, i) => {
        let cardCoffee = document.createElement("card");
        cardCoffee.classList.add("cardCoffee");
        let imgCoffee = document.createElement("img");
        imgCoffee.src = coffee.coffeeImgPath;
        imgCoffee.classList.add("imgCoffee");
        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
        //CoffeeTitle
        let cardTitle = document.createElement("h2");
        cardTitle.innerText = coffee.title;
        //CoffeeDescription
        let cardText = document.createElement("cardText");
        cardText.innerText = coffee.description;
        let divFooter = document.createElement("div");
        divFooter.classList.add("card-footer");
        //Ingredients
        let ingredientText = document.createElement("medium");
        ingredientText.innerText = "Ingredients: "+ coffee.ingredientList;
        ingredientText.classList.add("ingredient-text");

        //Collapse
        let divCollapseBody = document.createElement("div");
        divCollapseBody.id = "collapseBody"+i;
        divCollapseBody.classList.add("collapse");

        //CollapseButton
        let toggleButton = document.createElement("button");
        toggleButton.classList.add("btn-toggle")
        toggleButton.type = "button";
        toggleButton.dataset.target = "#collapseBody"+i;
        toggleButton.dataset.toggle = "collapse";
        toggleButton.ariaExpanded = "false";
        toggleButton.ariaControls = "collapseBody";
        toggleButton.innerText = "Mehr lernen";


        cardCoffee.appendChild(imgCoffee);
        cardCoffee.appendChild(divCardBody);
        divCardBody.appendChild(cardTitle);
        divCardBody.appendChild(toggleButton);

        divCardBody.appendChild(divCollapseBody);
        divCollapseBody.appendChild(cardText);
        divCollapseBody.appendChild(divFooter);
        divFooter.appendChild(ingredientText);
        console.log(cardCoffee);
        document.querySelector(".card-group").appendChild(cardCoffee);
    })
}

