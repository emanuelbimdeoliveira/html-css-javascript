"use strict";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let arrayOfTasks = tasks;

const textInput = document.querySelector("#task-input");
const buttonInput = document.querySelector("#save-button");

const unorderedList = document.querySelector("ul");


const addTask = () => {
    let task = {}

    const taskContent = textInput.value;
    const taskChecked = "unchecked";

    task.content = taskContent;
    task.checked = taskChecked;

    arrayOfTasks.push(task);

    textInput.value = "";
        
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    updateScreen();
}

const updateScreen = () => {
    // tasks = localStorage.getItem("tasks") || [];
    // arrayOfTasks = JSON.parse(tasks);

    unorderedList.innerHTML = '';

    arrayOfTasks.forEach((element, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" name="checkbox" id="${index}" ${element.checked}>
            <label for="${index}" onclick="check(${index})">
                <p>${element.content}</p>
            </label>
            <input type="button" value="X" onclick="deleteTask(${index})"> 
        `;
        unorderedList.appendChild(li);
    });
}

const check = (index) => {
    arrayOfTasks[index].checked = arrayOfTasks[index].checked == "checked" ? "unchecked" : "checked";
    
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    updateScreen();
}

const deleteTask = (index) => {
    arrayOfTasks.splice(index, 1);    
    
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    updateScreen();
}


buttonInput.addEventListener("click", addTask);

window.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        addTask();
    }
})

updateScreen();
