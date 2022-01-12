//
// dataContainer = document.getElementByID("")
//quizNumber = dataContainer.getAttribute("data-quizNumber")
//data.container

// function createScoreArray() {
//     let list = []
//     let scores = Array.from({length: 150}, () => Math.floor(Math.random() * 200));
//     scores.sort((a, b) => {
//         return a - b;
//     });
//     let names = ["coffelover1",
//         "arrivewindlass",
//         "advisoruniverse",
//         "hosttax",
//         "assistancerwandan",
//         "deepratio",
//         "telephonefreezing",
//         "sugarginger",
//         "wildcatextraneous",
//         "habitattreasured",
//         "folkexpand",
//         "supposeits",
//         "constituteribbit",
//         "automaticinvent",
//         "tensebonnet",
//         "lumberingrespond",
//         "sovietgymnasium",
//         "asleepcathead",
//         "optionyearly",
//         "evilmaster",
//         "observerdanger",
//         "wornoutlumbar",
//         "photographfrail",
//         "jitterytermite",
//         "certainflushed",
//         "serpentinewham",
//         "gassatisfying",
//
//     ]
//     names.forEach(name => {
//         const highscore_name = {
//             name: name,
//             score: scores.pop()
//         }
//         list.push(highscore_name)
//     });
//
//     list.forEach(item => {
//         let listRowDiv = document.createElement("div");
//         listRowDiv.classList.add("listrow");
//         let nameSpan = document.createElement("span");
//         nameSpan.innerText = item.name;
//         nameSpan.classList.add("nameSpan");
//         let pointSpan = document.createElement("span");
//         pointSpan.innerText = item.score;
//         pointSpan.classList.add("pointSpan");
//         listRowDiv.appendChild(nameSpan);
//         listRowDiv.appendChild(pointSpan);
//         document.querySelector(".list").appendChild(listRowDiv)
//     });
//     fetch("/create", {
//         method: 'POST',
//         body: JSON.stringify(list.name, list.score),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }).then(response => {
//         if (response.ok){
//
//         }
//     })
// }
