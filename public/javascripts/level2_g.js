
var tipModal = $('#exampleModalCenter')

$(window).on('load', function () {
    $('#gameModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,

    })
})

$("[data-toggle=tooltip]").tooltip({
    html: true,
    content: function() {
        return $('.tooltipCoffee').html();
    }
});

$(function () {
    $('.example-popover').popover({
        container: 'body'
    })
})

window.addEventListener('load', async ()=>{
     await getRandomSixCustomers();
     await loadModal();
})
// window.addEventListener('load', loadModal)
tipModal.on('shown.bs.modal', function (){
    $('.card-group').innerText = createDictionary()
})


