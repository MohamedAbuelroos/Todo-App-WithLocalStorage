let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let popUp = document.querySelector(".popup");
let ok = document.querySelector(".ok");

window.onload = function () {
  input.focus();
};
// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theie is Tasks in Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //Add Task To Array Of Tasks
    input.value = ""; //Empty The Input
  } else {
    popUp.style.display = "flex";
    ok.onclick = function () {
      popUp.style.display = "none";
    };
  }
};
// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    //remove element from page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggStatusTaskWith(e.target.getAttribute("data-id"));
    // toggle Done class
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(tasktext) {
  //Task Data
  const task = {
    id: Date.now(), // to creat Different id
    title: tasktext,
    completed: false,
  };
  // Push Tassk To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Elements To Page
  addElementsToPageFrom(arrayOfTasks); // The Sma Name parameter But Its Different
  addDataToLocalStorageFrom(arrayOfTasks);
}
function addElementsToPageFrom(arrayOfTasks) {
  // Empty The Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Creat Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Chek If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Creat Delete Button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

