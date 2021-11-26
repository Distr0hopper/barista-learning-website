// // Execute a function when the user releases a key on the keyboard
// document.querySelector('#myBtn').addEventListener('keypress', function (e){
//     // Number 13 is the "Enter" key on the keyboard
//     //if (event.keyCode === 13){
//     if (e.key === 'Enter') {
//         // Cancel the default action, if needed
//         //event.preventDefault();
//         // Trigger the button element with a click
//         document.getElementById('#myBtn').click();
//     }
// });
// $('#myBtn').keyup(function (e){
//     if (e.keyCode === 13){
//         $(this).trigger("checklogin")
//     }
// })


// $('#myBtn').on('click', function (e){
//     let name = false;
//     let password = false;
//     if ($('#username').val() === "admin" && $('#password').val() === "admin"){
//         name = true
//         password = true
//         location.href = 'main.html'
//     } else if (e.keyCode === 13){
//         $(this).trigger("checklogin")
//     } else {
//         $('#fehler').html("Falsches Passwort")
//     }
// });




function checklogin() {
    let name = false;
    let password = false;
    if (document.getElementById("username").value === "admin" &&
        document.getElementById("password").value === "admin") {
        name = true;
        password = true;
        window.location = '/home';
    } else {
        document.getElementById("fehler").innerHTML = "Falsches Password";
    }
}

let canEdit = false;

function editUsername() {
    if (canEdit === false) {
        document.querySelector('#profilename').readOnly = false;
        document.querySelector('#edit_button').textContent = "Save";
        // document.querySelector('#edit_button').style.borderColor = 'visible';
        canEdit = true;
    } else {
        saveUsername()
    }
}

function saveUsername(){
    if (canEdit === true){
        document.querySelector('#profilename').readOnly = true;
        document.querySelector('#edit_button').textContent = "Edit Username";
        canEdit = false;
    } else {
        editUsername()
    }
}

function openModal() {
    $('#myModal').modal('show');
}

function closeModal() {
    $('#myModal').modal('hide');
}

function chooseAvatar() {
        var img = '';
        setTimeout(function (){
            if ($('#inlineRadio1').is(':checked')) {
                document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/3462/3462124.png";
                closeModal();
            } else if ($('#inlineRadio2').is(':checked'))  {
                img = $('#avatar2');
                document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2317/2317940.png";
                closeModal();
            } else if ($('#inlineRadio3').is(':checked'))  {
                img = $('#avatar3');
                document.getElementById('profileimage').src = "https://cdn-icons-png.flaticon.com/512/2007/2007804.png";
                closeModal();
            }else if ($('#inlineRadio4').is(':checked'))  {
                img = $('#avatar4');
                document.getElementById('profileimage').src = "../assets/profile-icon.png";
                closeModal();
            }
            else {
                document.getElementById('error-message').textContent = "You need to select a picture."
            }
        }, 100)

    }

    function createScoreArray() {
        let list = []
        let scores = Array.from({length: 150}, () => Math.floor(Math.random() * 200));
        scores.sort((a, b) => {
            return a - b;
        });
        let names = ["coffelover1",
            "arrivewindlass",
            "advisoruniverse",
            "hosttax",
            "assistancerwandan",
            "deepratio",
            "telephonefreezing",
            "sugarginger",
            "wildcatextraneous",
            "habitattreasured",
            "folkexpand",
            "supposeits",
            "constituteribbit",
            "automaticinvent",
            "tensebonnet",
            "lumberingrespond",
            "sovietgymnasium",
            "asleepcathead",
            "optionyearly",
            "evilmaster",
            "observerdanger",
            "wornoutlumbar",
            "photographfrail",
            "jitterytermite",
            "certainflushed",
            "serpentinewham",
            "gassatisfying",
            // "buoyantcollected",
            // "lacrosseacrobatic",
            // "cowardiceestablish",
            // "endwitness",
            // "gingerygunwale",
            // "roastedbrain",
            // "whoopbeep",
            // "cardinaluphold",
            // "instructcable",
            // "slightlysport",
            // "corpsbiological",
            // "advisercabbage",
            // "composepack",
            // "danishplague",
            // "skilletsorrowful",
            // "sourceunicycle",
            // "bittsfaded",
            // "fieldsabaft",
            // "seekobliging",
            // "translatorglobal",
            // "costumecovey",
            // "weyrregular",
            // "zoglinrout",
            // "resoluterichness",
            // "breechesqueasy",
            // "catheaddeparture",
            // "earningschip",
            // "compromisesquealing",
            // "chirmlopsided",
            // "soulfulbeneficial",
            // "camisolebuckle",
            // "freshkilling",
            // "modernfifth",
            // "statisticsfurniture",
            // "sownderden",
            // "unamusedblossom",
            // "othersseriously",
            // "likableparka",
            // "bulgariandingaling",
            // "aboutpickled",
            // "bombdeer",
            // "foolhoopoe",
            // "effectivestruggle",
            // "developingmelon",
            // "playembrace",
            // "drivermillion",
            // "thinkabledivergent",
            // "bakedcheddar",
            // "exercisedrink",
            // "onionybible",
            // "longporch",
            // "printfewer",
            // "financecute",
            // "seagulljuly",
            // "streamplatform",
            // "dressbevy",
            // "shakediscuss",
            // "applyaqua",
            // "producenursery",
            // "theaterbitesized",
            // "acrobaticcivilian",
            // "attractivevariety",
            // "cloakeven",
            // "relyterm",
            // "lemonyveined",
            // "salarycoaming",
            // "teeyeoman",
            // "interviewinterview",
            // "crimsonsparrow",
            // "cloudlecturer",
            // "silentphobic",
            // "adaptableoffense",
            // "actuarysomehow",
            // "swimstand",
            // "wrapprocedure",
            // "wondertherapist",
            // "phalanxhypothesis",
            // "radiofocused",
            // "emeraldredneck",
            // "cowardlygirlguide",
            // "inflatecollarbone",
            // "honorgrass",
        ]
        names.forEach(name => {
            const highscore_name = {
                name: name,
                score: scores.pop()
            }
            list.push(highscore_name)
        });
        list.forEach(item => {
            let listRowDiv = document.createElement("div");
            listRowDiv.classList.add("listrow");
            let nameSpan = document.createElement("span");
            nameSpan.innerText = item.name;
            nameSpan.classList.add("nameSpan");
            let pointSpan = document.createElement("span");
            pointSpan.innerText = item.score;
            pointSpan.classList.add("pointSpan");
            listRowDiv.appendChild(nameSpan);
            listRowDiv.appendChild(pointSpan);
            document.querySelector(".list").appendChild(listRowDiv)
        });
    }
