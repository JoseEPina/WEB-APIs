var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//* Create a counter that increments by one each time a task is created.
var taskIdCounter = 0;

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

    //! Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //* Create the divs to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";     //? Give it a class name 
    //* Add HTML content to the div dynamically
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    // console.log(taskActionsEl);

    //* Add entire list item to the whole list
    tasksToDoEl.appendChild(listItemEl);

    //* Increase the task counter for the next unique id
    taskIdCounter++;

    console.dir(listItemEl)
}

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //* Create Edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //* Create Delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //* Create the status selector dropdown for our tasks
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status"
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    //* Create the status choices for the user to select
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // Create the option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // Append to selector element
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);