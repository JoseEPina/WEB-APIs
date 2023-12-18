var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //* Check if the values for the task are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    //* reset the form element from the document 
    formEl.reset();

    //* Create the task data as an object:
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //* Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function (taskDataObj) {
    //* Create the list items  
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //* Create the divs to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";     //* Give it a class name 
    //* Add HTML content to the div dynamically
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //* Add entire list item to the whole list
    tasksToDoEl.appendChild(listItemEl);

    console.dir(listItemEl)
}

formEl.addEventListener("submit", taskFormHandler);