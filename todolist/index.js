"use strict";

const arrayOfTasks = [];

const textInput = document.querySelector("#task-input");
const buttonInput = document.querySelector("#save-button");

const unorderedList = document.querySelector("ul");


const addTask = () => {
    let task = {}

    const taskContent = textInput.value;
    const taskChecked = false;

    task.content = taskContent;
    task.checked = taskChecked;

    arrayOfTasks.push(task);

    updateScreen();
}

const updateScreen = () => {
    unorderedList.innerHTML = '';

    arrayOfTasks.forEach((element, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" name="checkbox" id="${index}">
            <label for="${index}">
                <p>${element.content}</p>
            </label>
            <input type="button" value="X">
        `;
        unorderedList.appendChild(li);
    });
}


buttonInput.addEventListener("click", addTask);
