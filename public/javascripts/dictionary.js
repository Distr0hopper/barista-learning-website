async function createDictionary(){

    let response = await fetch("http://localhost:9000/api/coffees");
    let coffeelist = await response.json();
    console.log(coffeelist);

    coffeelist = coffeelist.map(coffee=>{
        coffee.coffeeImgPath = "assets/images/CoffeeTexts/"+ coffee.coffeeImgPath;
        return coffee
    })
    console.log(coffeelist);
    coffeelist.sort((a, b)=>a.title.localeCompare(b.title))

    // let coffeelist = []
    // let coffeePics = [
    //     "assets/images/CoffeeTexts/AffogatoText.png",
    //     "assets/images/CoffeeTexts/AmericanoText.png",
    //     "assets/images/CoffeeTexts/AquapanelaCoffeeText.png",
    //     "assets/images/CoffeeTexts/BlackText.png",
    //     "assets/images/CoffeeTexts/CafeAuLaitText.png",
    //     "assets/images/CoffeeTexts/CappuccinoText.png",
    //     "assets/images/CoffeeTexts/CortaditoText.png",
    //     "assets/images/CoffeeTexts/CortadoText.png",
    //     "assets/images/CoffeeTexts/DoppioText.png",
    //     "assets/images/CoffeeTexts/EspressoText.png",
    //     "assets/images/CoffeeTexts/FlatWhiteText.png",
    //     "assets/images/CoffeeTexts/GalaoText.png",
    //     "assets/images/CoffeeTexts/GuayoyoText.png",
    //     "assets/images/CoffeeTexts/IrishText.png",
    //     "assets/images/CoffeeTexts/LatteText.png",
    //     "assets/images/CoffeeTexts/LungoText.png",
    //     "assets/images/CoffeeTexts/MacchiatoText.png",
    //     "assets/images/CoffeeTexts/MochaText.png",
    //     "assets/images/CoffeeTexts/RedEyeText.png",
    //     "assets/images/CoffeeTexts/RistrettoText.png"
    // ]
    // let coffeeNames = [
    //     "AffogatoText",
    //     "AmericanoText",
    //     "AquapanelaCoffeeText",
    //     "BlackText",
    //     "CafeAuLaitText",
    //     "CappuccinoText",
    //     "CortaditoText",
    //     "CortadoText",
    //     "DoppioText",
    //     "EspressoText",
    //     "FlatWhiteText",
    //     "GalaoText",
    //     "GuayoyoText",
    //     "IrishText",
    //     "LatteText",
    //     "LungoText",
    //     "MacchiatoText",
    //     "MochaText",
    //     "RedEyeText",
    //     "RistrettoText"
    // ]
    // let coffeeDescription = [
    //     "AffogatoDesciption",
    //     "AmericanoDesciption",
    //     "AquapanelaCoffeeDesciption",
    //     "BlackDesciption",
    //     "CafeAuLaitDesciption",
    //     "CappuccinoDesciption",
    //     "CortaditoDesciption",
    //     "CortadoDesciption",
    //     "DoppioDesciption",
    //     "EspressoDesciption",
    //     "FlatWhiteDesciption",
    //     "GalaoDesciption",
    //     "GuayoyoDesciption",
    //     "IrishDesciption",
    //     "LatteDesciption",
    //     "LungoDesciption",
    //     "MacchiatoDesciption",
    //     "MochaDesciption",
    //     "RedEyeDesciption",
    //     "RistrettoDesciption"
    // ]
    // let coffeeIngredients = [
    //     "AffogatoIngredients",
    //     "AmericanoIngredients",
    //     "AquapanelaCoffeeIngredients",
    //     "BlackIngredients",
    //     "CafeAuLaitIngredients",
    //     "CappuccinoIngredients",
    //     "CortaditoIngredients",
    //     "CortadoIngredients",
    //     "DoppioIngredients",
    //     "EspressoIngredients",
    //     "FlatWhiteIngredients",
    //     "GalaoIngredientst",
    //     "GuayoyoIngredients",
    //     "IrishIngredients",
    //     "LatteIngredients",
    //     "LungoIngredients",
    //     "MacchiatoIngredients",
    //     "MochaIngredients",
    //     "RedEyeIngredients",
    //     "RistrettoTIngredients"
    // ]
    // coffeeNames.forEach(name => {
    //     const coffee_name = {
    //         title: name,
    //         description: coffeeDescription.shift(),
    //         ingredients: coffeeIngredients.shift(),
    //         img: coffeePics.shift()
    //     }
    //     coffeelist.push(coffee_name)
    // });
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
        ingredientText.innerText = coffee.ingredients;
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
