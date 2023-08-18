// "use strict";

const main = document.querySelector("main");
const gamePlace = document.querySelector(".game-place");

const fractionWidth = 25;
const fractionHeight = 25;

const snakeHead = document.querySelector(".snake-head");

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

    if (
        snakeHead.offsetLeft > gamePlace.offsetWidth - fractionWidth * 0.5 ||
        snakeHead.offsetLeft < 0 + fractionWidth * 0.5 ||
        snakeHead.offsetTop > gamePlace.offsetHeight - fractionHeight * 0.5 ||
        snakeHead.offsetTop < 0 + fractionHeight * 0.5
       ) {
        clearInterval(interval);
    }
}

// função para adicionar uma peça
const addPiece = () => {
    const newPieceElement = document.createElement("span");
    newPieceElement.classList.add("snake-head");
    
    newPieceElement.style.top = yPosition;
    newPieceElement.style.left = xPosition;
    
    gamePlace.appendChild(newPieceElement);
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
            break     
        case "k":
            if (direction !== "toTop") {
                direction = "toBottom";
            }
    }
});

snakeMovement();