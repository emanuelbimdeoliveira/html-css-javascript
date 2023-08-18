// "use strict";

const main = document.querySelector("main");
const gamePlace = document.querySelector(".game-place");

const fractionWidth = 25;
const fractionHeight = 25;

const snakeHead = document.querySelector(".snake-head");

let arrayOfElements;
const arrayOfElementsNotNodeList = [];

snakeHead.style.width = `${fractionWidth}px`;
snakeHead.style.height = `${fractionHeight}px`;

let xPosition = fractionWidth * 5;
let yPosition = fractionHeight * 5;

let direction = "toBottom";


const snakeMovement = () => {
    switch (direction) {
        case "toLeft":
            xPosition -= fractionWidth * 0.5;
            break
        case "toRight":
            xPosition += fractionWidth * 0.5;
            break
        case "toTop":
            yPosition -= fractionHeight * 0.5;
            break
        case "toBottom":
            yPosition += fractionHeight * 0.5;
    }
    
    snakeHead.style.left = `${xPosition}px`;
    snakeHead.style.top = `${yPosition}px`;

    if (arrayOfElementsNotNodeList.length > 1) {
        changePositions();
    }

    if (
        snakeHead.offsetLeft > gamePlace.offsetWidth - fractionWidth * 0.5 ||
        snakeHead.offsetLeft < 0 + fractionWidth * 0.5 ||
        snakeHead.offsetTop > gamePlace.offsetHeight - fractionHeight * 0.5 ||
        snakeHead.offsetTop < 0 + fractionHeight * 0.5
       ) {
        clearInterval(interval);
    }
}

// função para atualizar as posições dos elementos
const changePositions = () => {
    arrayOfElements = document.querySelectorAll(".snake-head");
    const arrayOfPositions = [];
    arrayOfElements.forEach((element) => {
        arrayOfElementsNotNodeList.push(element);
        const objectOfData = {
            elementYPosition: element.offsetTop,
            elementXPosition: element.offsetLeft
        }
        arrayOfPositions.push(objectOfData);
    });
    for (let i = 1; i < arrayOfElements.length; i++) {
        arrayOfElements[i].style.top = `${arrayOfPositions[i - 1].elementYPosition}px`;
        arrayOfElements[i].style.left = `${arrayOfPositions[i - 1].elementXPosition}px`;
        console.log(arrayOfPositions);
    }

}


// função para adicionar uma peça
const addPiece = () => {
    const newPieceElement = document.createElement("span");
    newPieceElement.classList.add("snake-head");

    gamePlace.appendChild(newPieceElement);

    newPieceElement.style.width = `${fractionWidth}px`;
    newPieceElement.style.height = `${fractionHeight}px`;

    newPieceElement.style.backgroundColor = "blue";
    
    switch (direction) {
        case "toLeft":
            xPosition += fractionWidth * 0.5;
            break
        case "toRight":
            xPosition -= fractionWidth * 0.5;
            break
        case "toTop":
            yPosition += fractionHeight * 0.5;
            break
        case "toBottom":
            yPosition -= fractionHeight * 0.5;
    }
    
    newPieceElement.style.left = `${xPosition}px`;
    newPieceElement.style.top = `${yPosition}px`;
}


// eventos e chamados de funções
const interval = setInterval(snakeMovement, 300);


document.querySelector("body").addEventListener("keypress", (event) => {
    switch (event.key) {
        case "j":
            if (direction !== "toRight") {
                direction = "toLeft";
            }
            break 
        case "l":
            if (direction !== "toLeft") {
                direction = "toRight";
            }
            break 
        case "i":
            if (direction !== "toBottom") {
                direction = "toTop";
            }
            break 
        case "a":
            addPiece();
            changePositions();
            break     
        case "k":
            if (direction !== "toTop") {
                direction = "toBottom";
            }
    }
});

snakeMovement();
changePositions();