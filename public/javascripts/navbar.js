// var points = JSON.parse(window.sessionStorage.getItem('money'));
// //$('#money').text(points)
// var money = $('#money').text()
// console.log(points)
function clearSessionStorage() {
    sessionStorage.clear()
    window.location = '\\logout';
}


// function checkToLevelUp() {
//     if (countCorrectCoffees === 1) {
//         $('#nextGame').on('onclick', function () {
//             $('ul.navbar-nav').find('#gametwoNav').removeClass('disabled')
//         })
//     }
// }
// window.addEventListener('change', checkToLevelUp)
