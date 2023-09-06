"use strict";

const arrayOfTasks = [];

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

    updateScreen();

    textInput.value = "";
}

const updateScreen = () => {
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
    updateScreen();
}

const deleteTask = (index) => {
    arrayOfTasks.splice(index, 1);    
    updateScreen();
}


buttonInput.addEventListener("click", addTask);

window.addEventListener("keypress", (event) => {
    console.log(event)
    if (event.key == "Enter") {
        event.preventDefault();
        addTask();
    }
})