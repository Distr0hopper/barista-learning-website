
var tipModal = $('#exampleModalCenter')
/**
 * prevents modal from being able to clicked away if you click somewhere else in the screen
 * you have to watch the content of the modal for the 5 sec and only afterwards are shown the memory*/
$(window).on('load', function () {
    $('#gameModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,

    })
})
/**important so tooltip shows up
 * has to be done in js bc of very nested HTML code, doesnt work without it for some reason*/
$("[data-toggle=tooltip]").tooltip({
    html: true,
    content: function() {
        return $('.tooltipCoffee').html();
    }
});
/**important so popover shows up
 * has to be done in js bc of very nested HTML code, doesnt work without it for some reason*/
$(function () {
    $('.example-popover').popover({
        container: 'body'
    })
})
/**loads the new randomSixCustomers on pageLoad and displays modal*/
window.addEventListener('load', async ()=>{
     await getRandomSixCustomers();
     await loadModal();
})

/**loads content into tooltip as soon as the modal is visible*/
tipModal.on('shown.bs.modal', function (){
    $('.card-group').innerText = createDictionary()
})


