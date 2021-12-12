function submitGame() {
    var submitButtonText = $('#submitGame').text();

    if (submitButtonText === 'next') {
        $('#submitGame').html('submit')
        for (let i = 0; i < ingredients.length; i++) {

            let ingredient_id = '#' + ingredients[i];

            $(ingredient_id).css({
                'left': $(ingredient_id).data('originalLeft'),
                'top': $(ingredient_id).data('originalTop')
            });
        }

        let activeDrink = "";
        if (activeDrink === 'americano') {
            $('#order').text("2. Please make a LATTE!");
            activeDrink = 'latte';
        } else if (activeDrink === 'latte') {
            $('#order').text("3. Please make a MOCHA!");
            activeDrink = 'mocha';

        } else if (activeDrink === 'mocha') {
            $('#order').text("4. Please make a CAPPUCCINO!");
            activeDrink = 'cappuccino';

        } else if (activeDrink === 'cappuccino') {
            $('#order').text("5. Please make a BREVE!");
            activeDrink = 'breve';

        } else if (activeDrink === 'breve') {
            $('#order').text("6 Please make a MACCHIATO!");
            activeDrink = 'macchiato';

        } else if (activeDrink === 'macchiato') {
            $('#order').text("7. Please make an IRISH COFFEE!");
            activeDrink = 'irish';

        } else if (activeDrink === 'irish') {
            $('#order').text("8. Please make a CAFFE AU LAIT!");
            activeDrink = 'caffe au lait';

        } else if (activeDrink === 'caffe au lait') {
            $('#order').text("9. Please make an ESPRESSO CON PANNA!");
            activeDrink = 'espresso con panna';

        } else if (activeDrink === 'espresso con panna') {
            $('#order').text("10. Please make a MOCHA BREVE!");
            activeDrink = 'mocha breve';

        }
    } else {
        $('#submitGame').html('next')
        // get an array of correct ingredients using the activeDrink name
        // so for example, if activeDrink was americano this would return an array of ['espresso','water']
        let correctIngredients = drinks[activeDrink];
        // this code takes two arrays: correctIngredients and droppedIngredients
        // it first sorts them alphabetically, so the user doesn't have to match then order of ingredients
        // then, it collapses the arrays into strings
        // so an array with a value of ['water','espresso'] turns into a string 'espressowater'
        // then, i use the comparison operator to see if the values are the same
        // if they are, then they inputted the ingredients correctly
        if (correctIngredients.sort().join() === droppedIngredients.sort().join()) {
            $('#order').text("You got it right!");
        } else {
            $('#order').text("Wrong! " + activeDrink + " = " + correctIngredients.join(" + "));

        }

        let droppedIngredients = [];


    }
}



/*Interact JS Code*/
// Interact JS
// Dragging Code

var dragArray = [];


// target elements with the "drag-drop" class
interact('.drag-drop')
    .draggable({
        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
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

// Dropping Code

// enable draggables to be dropped into this
interact('.dropzone').dropzone({

    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
        var droppedIngredient = event.relatedTarget.id;
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target

        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        // Put dropped ingredient in the array
        console.log(droppedIngredient);
        if (dragArray.indexOf(droppedIngredient) === -1){
            dragArray.push(droppedIngredient);
        } else {
            console.log("Ingredient already inside!");
        }
        console.log(dragArray);
    },
    ondragleave: function (event) {
        var droppedIngredient = event.relatedTarget.id
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')

        // Remove ingredient which is dragged out from the array
        const index = dragArray.indexOf(droppedIngredient);
        if (index > -1 ) {
            dragArray.splice(index, 1);
        }
        console.log(dragArray);
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})

interact('drag-drop')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,

        listeners: {move: dragMoveListener}
    })
