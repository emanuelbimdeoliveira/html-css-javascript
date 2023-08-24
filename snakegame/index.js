// "use strict";

// DOM
const main = document.querySelector("main");
const gamePlace = document.querySelector(".game-place");
const snakeHead = document.querySelector(".snake-head");

// tamanho padrão
const fractionWidth = 20;
const fractionHeight = 20;
const totalWidth = gamePlace.offsetWidth;
const totalHeight = gamePlace.offsetHeight;

// score e highScore
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
const scorePlace = document.querySelector("span#score");
const highScorePlace = document.querySelector("span#high-score");

// posições possíveis para o alimento
const possiblePositionsX = [];
const possiblePositionsY = [];
for (let i = fractionWidth; i < totalWidth; i += fractionWidth) {
    possiblePositionsX.push(i);
}
for (let i = fractionHeight; i < totalHeight; i += fractionHeight) {
    possiblePositionsY.push(i);
}

// para alternar a posição de cada peça
let arrayOfElements;
const arrayOfElementsNotNodeList = [];

let arrayOfPositions = [];

snakeHead.style.width = `${fractionWidth}px`;
snakeHead.style.height = `${fractionHeight}px`;

let xPosition = fractionWidth * 5;
let yPosition = fractionHeight * 5;

let direction = "toBottom";

// para alternar a cor de cada peça
let colorPiece = ["#f70", "#000", "#fff"];
let colorPieceIndex = -1;

// posição de cada alimento
const foodPosition = {
    x: 0,
    y: 0
}


// movimento por intervalo
const snakeMovement = () => {
    switch (direction) {
        case "toLeft":
            xPosition -= fractionWidth;
            break
        case "toRight":
            xPosition += fractionWidth;
            break
        case "toTop":
            yPosition -= fractionHeight;
            break
        case "toBottom":
            yPosition += fractionHeight;
    }
    
    snakeHead.style.left = `${xPosition}px`;
    snakeHead.style.top = `${yPosition}px`;

    changePositions();

    if (xPosition == foodPosition.x && yPosition == foodPosition.y) {
        gamePlace.removeChild(document.querySelector("span.food"));
        addPiece();
        addFood();
        score++
        scorePlace.textContent = score.toString().padStart(2, "0");
    }

    if (testOfHit()) {
        clearInterval(interval);
        gameOver();
    }

    if (
        xPosition > gamePlace.offsetWidth - fractionWidth * 0.5 ||
        xPosition < 0 + fractionWidth * 0.5 ||
        yPosition > gamePlace.offsetHeight - fractionHeight * 0.5 ||
        yPosition < 0 + fractionHeight * 0.5
       ) {
        clearInterval(interval);
        gameOver();
    }
}

// função para atualizar as posições dos elementos
const changePositions = () => {
    arrayOfPositions = [];
    arrayOfElements = document.querySelectorAll(".snake-head");
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
    }
}

// função para adicionar o alimento
const addFood = () => {
    const food = document.createElement("span");
    food.classList.add("food");
    gamePlace.appendChild(food);

    const randomPositionX = Math.floor(Math.random() * possiblePositionsX.length);
    const randomPositionY = Math.floor(Math.random() * possiblePositionsY.length);

    foodPosition.x = possiblePositionsX[randomPositionX];
    foodPosition.y = possiblePositionsY[randomPositionY];        
     
    food.style.top = `${foodPosition.y}px`;
    food.style.left = `${foodPosition.x}px`;
}

// função para adicionar uma peça
const addPiece = () => {
    setTimeout(() => {
        const newPieceElement = document.createElement("span");
        newPieceElement.classList.add("snake-head");
        
        gamePlace.appendChild(newPieceElement);
        
        newPieceElement.style.width = `${fractionWidth}px`;
        newPieceElement.style.height = `${fractionHeight}px`;
        
        colorPieceIndex++
        newPieceElement.style.backgroundColor = colorPiece[colorPieceIndex];
        colorPieceIndex = colorPieceIndex >= 2 ? -1 : colorPieceIndex;

        // const colorPiece = Math.floor(Math.random() * 360);
        // newPieceElement.style.backgroundColor = `hsl(${colorPiece}, 100%, 50%)`;
        
        switch (direction) {
            case "toLeft":
                xPosition += fractionWidth;
                break
            case "toRight":
                xPosition -= fractionWidth;
                break
            case "toTop":
                yPosition += fractionHeight;
                break
            case "toBottom":
                yPosition -= fractionHeight;
        }
        
        newPieceElement.style.left = `${xPosition}px`;
        newPieceElement.style.top = `${yPosition}px`;    
    }, 500);
}

// função que testa se a cabeça bate no seu corpo
const testOfHit = () => {
    for (let i = 2; i < arrayOfPositions.length; i++) {
        if (arrayOfPositions[i].elementXPosition == xPosition &&
            arrayOfPositions[i].elementYPosition == yPosition) {
                return true
            }
    }
}

const reloadPage = () => location.reload();

const gameOver = () => {
    const gameOverScreen = document.createElement("section");
    gameOverScreen.classList.add("game-over-screen");

    highScore = score > highScore ? score : highScore;
    localStorage.setItem("highScore", highScore);
    
    gameOverScreen.innerHTML = `
        <div>
            <h1>Game Over!!!</h1>
            <p>Pontuação: <span id="score">${score.toString().padStart(2, "0")}</span></p>
            <p>Maior Pontuação: <span id="high-score">${highScore.toString().padStart(2, "0")}</span></p>
            <button id="button-to-reload" onclick="reloadPage()">Reiniciar</button>
            </div>
    `;

    main.appendChild(gameOverScreen);
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
        case "k":
            if (direction !== "toTop") {
                direction = "toBottom";
            }
    }
});


snakeMovement();
addPiece();
changePositions();
addFood();

highScorePlace.textContent = highScore.toString().padStart(2, "0");