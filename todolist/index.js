"use strict";

let tasks;
let arrayOfTasks = [];

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
    tasks = localStorage.getItem("tasks") || [];
    arrayOfTasks = JSON.parse(tasks);

    unorderedList.innerHTML = '';

    if (arrayOfTasks == "") {
        const li = document.createElement("li");
        li.classList.add("without-tasks");
        li.innerHTML = `
            <p>Adicione uma tarefa</p>
        `;
        unorderedList.appendChild(li);
    }

    arrayOfTasks.forEach((element, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" name="checkbox" id="${index}" ${element.checked}>
            <label for="${index}" onclick="check(${index})">
                <p>${element.content}</p>
            </label>
            <input type="button" class="material-symbols-outlined" value="edit" onclick="editTask(${index})"> 
            <input type="button" class="material-symbols-outlined" value="delete" onclick="deleteTask(${index})"> 
        `;
        unorderedList.appendChild(li);
    });
}

// ações
const check = (index) => {
    arrayOfTasks[index].checked = arrayOfTasks[index].checked == "checked" ? "unchecked" : "checked";
    
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    updateScreen();
}

const editTask = (index) => {
    const editTaskResponse = prompt("Edição da tarefa");
    arrayOfTasks[index].content = editTaskResponse;
    
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

// dados atualizados ao carregar a página
updateScreen();
