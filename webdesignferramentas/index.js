"use strict";

// interruptor
const toggleButton = document.querySelectorAll(".toggle-switch > div");
const toggleButtonDot = document.querySelectorAll(".toggle-switch span");

let active = [false, false];


const toggleSwitch = (event) => {
    if (event.target.id == 0) {
        active[event.target.id] = active[event.target.id] ? false : true;
    } else if (event.target.id == 1) {
        active[event.target.id] = active[event.target.id] ? false : true;
    }
    toggleButtonDot.forEach((element, index) => {
        if (active[index]) {
            element.classList.add("active")
        } else {
            element.classList.remove("active")
        }
    })
}

toggleButton.forEach((element, index) => {
    element.id = index;
    element.addEventListener("click", toggleSwitch);
})




// tabela dinâmica
const arrayOfTableData = [
    {city: "Paris", country: "França"},
    {city: "Lisboa", country: "Portugal"},
    {city: "São Paulo", country: "Brasil"},
    {city: "Nova Iorque", country: "Estados Unidos"},
    {city: "Londres", country: "Inglaterra"},
    {city: "Tóquio", country: "Japão"},
    {city: "Moscou", country: "Rússia"},
    {city: "Berlin", country: "Alemanha"},
];

const input = document.querySelector("input#search");
const table = document.querySelector("table");

const updateTable = () => {
    table.innerHTML = "";
    arrayOfTableData.forEach((element) => {
        if (element.city.includes(input.value) || element.country.includes(input.value)) {
            console.log(element)
            let newTableRow = document.createElement("tr");
            newTableRow.innerHTML = `
                <td>${element.city}</td>
                <td>${element.country}</td>
            `;
            table.appendChild(newTableRow);
        }
    })
}

updateTable();
document.querySelector("input#search").addEventListener("input", updateTable);


// imagens com zoom
const imagePlace = document.querySelector("div.image");
const zoomPlace = document.querySelector("div.zoom");
const magnifying = document.querySelector("div.magnifying");

const moveMagnifying = (event) => {
    const y = event.pageY - imagePlace.offsetTop;
    const x = event.pageX - imagePlace.offsetLeft;

    const porcentageY = Math.round(y / (imagePlace.offsetHeight / 100));
    const porcentageX = Math.round(x / (imagePlace.offsetWidth / 100));

    event.preventDefault();
    magnifying.style.top = `${y}px`;
    magnifying.style.left = `${x}px`;

    zoomPlace.style.backgroundPosition = `${porcentageX}% ${porcentageY}%`;        
}

imagePlace.addEventListener("mousemove", moveMagnifying);


// cortina entre imagens
const locatorOfCurtain = document.querySelector("span#locator");
const section = document.querySelector(".image-comparison-slider");
const containerOfImages = document.querySelector(".container-of-images");
const firstImage = document.querySelector(".image-comparison-slider > div > div:first-of-type");


const changeCurtain = (event) => {
    const positionX = event.pageX - containerOfImages.offsetLeft;
    locatorOfCurtain.style.left = `${positionX}px`;

    firstImage.style.width = `${positionX}px`;
    firstImage.style.backgroundSize = `${section.offsetWidth}px`;
}


containerOfImages.addEventListener("mousedown", () => {
    containerOfImages.addEventListener("mousemove", changeCurtain);
});

containerOfImages.addEventListener("mouseup", () => {
    containerOfImages.removeEventListener("mousemove", changeCurtain);
});

