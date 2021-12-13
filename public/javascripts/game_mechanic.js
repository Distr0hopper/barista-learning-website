// Array which contains the real images of the ingredients
var arrayDraggedImages = [];
// Array which contains only the id's of the images
var arrayImagesID = [];
var drinks = new Array();
drinks["americano"] = new Array("espresso", "hotWater");
drinks["latte"] = new Array("espresso", "milk", "milkfoam");
var activeDrink = 'americano';


function submitGame(){

    var submitButtonText = $('#submitGame').text();

    if (submitButtonText === 'next') {

        $('#submitGame').html('submit')

        if (activeDrink == 'americano') {
            $('#order').text("2. Please make a LATTE!");
            activeDrink = 'latte';
        } else if (activeDrink == 'latte') {
            $('#order').text("3. Please make a MOCHA!");
            activeDrink = 'mocha';

        } else if (activeDrink == 'mocha') {
            $('#order').text("4. Please make a CAPPUCCINO!");
            activeDrink = 'cappuccino';

        } else if (activeDrink == 'cappuccino') {
            $('#order').text("5. Please make a BREVE!");
            activeDrink = 'breve';

        } else if (activeDrink == 'breve') {
            $('#order').text("6. Please make a MACCHIATO!");
            activeDrink = 'macchiato';

        } else if (activeDrink == 'macchiato') {
            $('#order').text("7. Please make an IRISH COFFEE!");
            activeDrink = 'irish';

        } else if (activeDrink == 'irish') {
            $('#order').text("8. Please make a CAFFE AU LAIT!");
            activeDrink = 'caffe au lait';

        } else if (activeDrink == 'caffe au lait') {
            $('#order').text("9. Please make an ESPRESSO CON PANNA!");
            activeDrink = 'espresso con panna';

        } else if (activeDrink == 'espresso con panna') {
            $('#order').text("10. Please make a MOCHA BREVE!");
            activeDrink = 'mocha breve';

        }
    } else {
        $('#submitGame').html('next')

        for (i = 0; i < arrayDraggedImages.length; i++){
            let currentImage = arrayDraggedImages[i];
            arrayImagesID.push(currentImage.id);
            //console.log(arrayImagedID);


            // translate the element
            currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'

            // update the position attributes
            currentImage.setAttribute('data-x', 0)
            currentImage.setAttribute('data-y', 0)


        }

        // get an array of correct ingredients using the activeDrink name
        // so for example, if activeDrink was americano this would return an array of ['espresso','water']
        correctIngredients = drinks[activeDrink];
        // this code takes two arrays: correctIngredients and droppedIngredients
        // it first sorts them alphabetically, so the user doesn't have to match then order of ingredients
        // then, it collapses the arrays into strings
        // so an array with a value of ['water','espresso'] turns into a string 'espressowater'
        // then, i use the comparison operator to see if the values are the same
        // if they are, then they inputted the ingredients correctly



        if (correctIngredients.sort().join() == arrayImagesID.sort().join()) {
            $('#order').text("You got it right!");
        } else {
            $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));

        }
        /*  Another method to check if ingredient is already inside. It just checks both arrays and look if any ingredient matches
        var checker = (arr, target) => target.every(v => arr.includes(v));
        var ingredientsCheck = checker(correctIngredients, draggedIngredientsArray);
        console.log(ingredientsCheck);

        if (ingredientsCheck){
            $('#order').text("You got it right!");
        } else {
            $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));
        }
*/
        // Reset both arrays, so for the next exercises they are empty

        arrayImagesID = [];
        arrayDraggedImages = [];
    }

}


// Interact JS
// Dragging Code
const alreadyInside = -1;
// target elements with the "drag-drop" class
interact('.drag-drop')
    .draggable({
        listeners: {
            move: dragMoveListener,
            end: checkIngredientArray
        }
    })


function dragMoveListener(event) {
    var target = event.target

    // keep the dragged position in the data-x/ data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy


    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

function checkIngredientArray(event){
    var currentImage = event.target;
    //console.log(currentImage);

    // if on the end of the drag the ingredient is not inside the array, you havent dragged into the coffee mug, so
    // the position will snap back to the start. Same will happen if you drag an ingredient out.
    if(arrayDraggedImages.indexOf(currentImage) === alreadyInside){
        // snap the ingredients back to it's original position
        currentImage.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'


        currentImage.setAttribute('data-x', 0)
        currentImage.setAttribute('data-y', 0)

    }



}

// Dropping Code

// enable draggables to be dropped into this
interact('.dropzone').dropzone({

    // Require a 100% element overlap for a drop to be possible
    overlap: 1,

    // listen for drop related events:
    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {

        var droppedIngredient = event.relatedTarget;
        var dropzoneElement = event.target;


        dropzoneElement.classList.add('drop-target')
        droppedIngredient.classList.add('can-drop')
        // Put dropped ingredient in the array, but only if it's not insde. If returns -1 if the ingredient is not found.
        if (arrayDraggedImages.indexOf(droppedIngredient) === alreadyInside){
            arrayDraggedImages.push(droppedIngredient);
            //console.log(arrayDraggedImages);
            // console.log(arrayImages_ID);
        } else {
            console.log("Ingredient already inside!");
        }
    },
    ondragleave: function (event) {

        let droppedIngredient = event.relatedTarget;  //The same from above, but cannot use the same element
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        const index =arrayDraggedImages.indexOf(droppedIngredient);

        // Get index of the ingredient and remove ingredient which is dragged out from the array.

        // Check if ingredient is still inside
        if (index > -1 ) {
            arrayDraggedImages.splice(index, 1);
        }
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})







