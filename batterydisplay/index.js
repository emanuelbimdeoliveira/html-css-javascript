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

const updateDisplay = () => {
    indexOfArray = indexOfArray == 4 ? 0 : indexOfArray;

    const battery = window.navigator.getBattery().then((result) => {
        console.log(result)
        const batteryLevel = Math.round(result.level * 100);

        for (let element of batteryDisplay) {
            element.textContent = `${batteryLevel}%`;
        } 


        batteryFluid.style.height = `${batteryLevel}%`;
        if (batteryLevel < 30) {
            batteryFluid.style.background = "var(--red-gradient)";
        } else if (batteryLevel < 70) {
            batteryFluid.style.background = "var(--yellow-gradient)";
        } else {
            batteryFluid.style.background = "var(--green-gradient)";
        }


        if (result.charging == true) {
            statusSection.children[1].textContent = arrayToWrite[indexOfArray].iconCodeText;
            statusSection.children[2].textContent = arrayToWrite[indexOfArray].statusText;
            indexOfArray++
        } else {
            statusSection.children[1].textContent = "power_off";
            statusSection.children[2].textContent = "Desconectado";
        }
    });
}

setInterval(updateDisplay, 1000); 