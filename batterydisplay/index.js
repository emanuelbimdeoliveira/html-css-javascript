"use strict";

const batteryDisplay = document.querySelectorAll(".battery-percentage-display");
const batteryFluid = document.querySelector("#battery-fluid");
const statusSection = document.querySelector("#status");

const arrayToWrite = [
    {statusText: "Carregando", iconCodeText: "battery_charging_20"},
    {statusText: "Carregando.", iconCodeText: "battery_charging_50"},
    {statusText: "Carregando..", iconCodeText: "battery_charging_80"},
    {statusText: "Carregando...", iconCodeText: "battery_charging_90"}
];
let indexOfArray = 0;

const toggleSwitch = document.querySelector("#check");
const label = document.querySelector("label");


const updateDisplay = () => {
    indexOfArray = indexOfArray == 4 ? 0 : indexOfArray;

    const battery = window.navigator.getBattery().then((result) => {
        const batteryLevel = Math.round(result.level * 100);

        updateBatteryFluid(batteryLevel);
        updateText(batteryLevel, result);
    });
}

const updateBatteryFluid = (batteryLevel) => {
    batteryFluid.style.height = `${batteryLevel}%`;
    if (batteryLevel < 30) {
        batteryFluid.style.background = "var(--red-gradient)";
    } else if (batteryLevel < 70) {
        batteryFluid.style.background = "var(--yellow-gradient)";
    } else {
        batteryFluid.style.background = "var(--green-gradient)";
    }    
}

const updateText = (batteryLevel, result) => {
    for (let element of batteryDisplay) {
        element.textContent = `${batteryLevel}%`;
    } 

    if (result.charging == true) {
        statusSection.children[1].textContent = arrayToWrite[indexOfArray].iconCodeText;
        statusSection.children[2].textContent = arrayToWrite[indexOfArray].statusText;
        indexOfArray++
    } else {
        statusSection.children[1].textContent = "power_off";
        statusSection.children[2].textContent = "Desconectado";
    }    
}

// para mudar para o tema dark
const changeTheme = (event) => {
    const root = document.querySelector(":root");

    if (event.target.checked) {
        root.style.setProperty("--background-body", "#002");
        root.style.setProperty("--background-main", "linear-gradient(45deg, #3335, #5555, #8885)");
        label.style.border = "solid 2px white";
        document.querySelector("#chose_mode").textContent = "Desativar modo escuro:"
    } else {
        root.style.setProperty("--background-body", "#ddf")
        root.style.setProperty("--background-main", "linear-gradient(45deg, #00a, #00f, #35f)");
        label.style.border = "solid 2px black";
        document.querySelector("#chose_mode").textContent = "Ativar modo escuro:"
    }

}


toggleSwitch.addEventListener("click", changeTheme);

setInterval(updateDisplay, 1000); 
updateDisplay();