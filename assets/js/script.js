var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //* Create the list items  
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //* Create the divs to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //* Give it a class name 
    taskInfoEl.className = "task-info";

    //* Add HTML content to the div dynamically
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //* Add entire list item to the whole list
    tasksToDoEl.appendChild(listItemEl);

    console.dir(listItemEl)
};

formEl.addEventListener("submit", createTaskHandler);