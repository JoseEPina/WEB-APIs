var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
//* Create a counter that increments by one each time a task is created.
var taskIdCounter = 0;
//* Create a task array variable
var tasksArray = [];

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

    var isEdit = formEl.hasAttribute("data-task-id");

    //* Has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //* No data attribute, so create object as normal and pass to createTaskEl function
    else {
        //* Create the task data as an object:
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
        };

        //* Send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
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

    taskDataObj.id = taskIdCounter;

    //* Assign the data from tasks into the taskArray
    tasksArray.push(taskDataObj);
    //* Add the data to localStorage
    saveTasks();
    //* Add entire list item to the whole list
    tasksToDoEl.appendChild(listItemEl);

    //* Increase the task counter for the next unique id
    taskIdCounter++;

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

var taskButtonHandler = function (event) {
    console.log(event.target);
    //* Get the target element from event
    var targetEl = event.target;

    //? Edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //? Delete button was clicked
    else if (event.target.matches(".delete-btn")) {
        //* get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var deleteTask = function (taskId) {
    //* get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //* Create a new array to hold updated list of tasks
    var updatedTaskArr = [];

    //* Loop through current tasks
    for (var i = 0; i < tasksArray.length; i++) {
        //TODO: if tasksArray[i].id doesn't match the value of taskId,
        //TODO let's keep that task and push it into the new array
        if (tasksArray[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasksArray[i]);
        }
    }

    //* Reassign tasks array to be the same as updatedTaskArr
    tasksArray = updatedTaskArr;

    taskSelected.remove();

    //* Add the data to localStorage
    saveTasks();
}

var editTask = function (taskId) {
    console.log("editing task #" + taskId);

    //* get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //* get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);

    document.querySelector("input[name = 'task-name']").value = taskName;
    document.querySelector("select[name = 'task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

var completeEditTask = function (taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    //* Find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //! Set the new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //* Loop through tasks array and task object with new content
    for (var i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id === parseInt(taskId)) {
            tasksArray[i].name = taskName;
            tasksArray[i].type = taskType;
        }
    }
    //* Add the data to localStorage
    saveTasks();

    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskStatusChangeHandler = function (event) {
    //* Get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //* Get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //* Find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //* Reassign the placement of the tasks to their respective status
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //* Update task's status in the tasksArray
    for (var i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id === parseInt(taskId)) {
            tasksArray[i].status = statusValue
        }
    }

    //* Add the data to localStorage
    saveTasks();
}

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);