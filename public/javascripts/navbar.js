// var points = JSON.parse(window.sessionStorage.getItem('money'));
// //$('#money').text(points)
// var money = $('#money').text()
// console.log(points)
function clearSessionStorage(){
        sessionStorage.clear()
        window.location = '\\logout';
}