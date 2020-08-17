// CODE EXPLAINED channel

// select the element 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//variables
let LIST, id;

//get item from local storage

//add item to local storage
let data = localStorage.setItem("TODO", JSON.stringify(LIST));

//check if data is not empty
if (data) {
    // if data is not empty
    LIST = JSON.perse();
    id = LIST.length; //Set the id to the last one in the list
    loadList(LIST);
}
else{
    LIST = [];
    id = 0;
}
//clear local storage
clear.addEventListener("click", function(params) {
    localStorage.clear();
    location.reload();
})
//load items to the user interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
// Classes Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Show Todays Date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function(event) {
    if (event.keyCode == '13') {
        const toDo = input.value;
        //if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            id++;
        }
        input.value = "";
    }
})
//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dinamically
list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
})


