
// variáveis
const maxValue = document.querySelector("input#max");
const minValue = document.querySelector("input#min");

const body = document.querySelector("body");

const startRandomButton = document.querySelector("form > a > p");
const buttonMoreOptions = document.querySelector("#menu")
const buttonRefresh = document.querySelector("#button-refresh");
const buttonHistory = document.querySelector("#button-history");

const display = document.querySelector("#main-display p");

const history = [];
const historyElement = document.querySelector("span");

const itens = document.querySelectorAll("#main-display .ocultable-buttons");

// funções
const randomNumber = () => {
    changeBackgroundColor();

    const arrayNumbers = [];

    const max = Number(maxValue.value);
    const min = Number(minValue.value);

    for (let i = 0; i < 30; i++) {
        const number = Math.floor((Math.random() * (max - min)) + min);
        arrayNumbers.push(number);
    }

    let index = 0;

    const interval = setInterval(() => {
        display.textContent = arrayNumbers[index] < 10 ? `0${arrayNumbers[index]}`: arrayNumbers[index];

        if (index == arrayNumbers.length - 1) {
            clearInterval(interval);
        }

        index++
    }, 40);

    const value = 
        arrayNumbers[arrayNumbers.length - 1] < 10 
        ? `0${arrayNumbers[arrayNumbers.length - 1]}`
        : arrayNumbers[arrayNumbers.length - 1]; 
    history.push(value);
}

const changeBackgroundColor = () => {
    const color = document.querySelector("input[type=color]").value;

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        section.style.backgroundColor = color;
    });
}

const showHistory = () => {
    if (historyElement.textContent == "") {
        historyElement.textContent = history.join("-");
    } else {
        historyElement.textContent = "";
    }
}

const showMore = () => {
    document.querySelectorAll(".ocultable-hidden").forEach((element) => {
        element.classList.toggle("ocultable-show");
    });
}


// eventos
startRandomButton.addEventListener("click", randomNumber);

buttonMoreOptions.addEventListener("click", showMore);
buttonRefresh.addEventListener("click", randomNumber);
buttonHistory.addEventListener("click", showHistory);

display.addEventListener("click", randomNumber);

body.addEventListener("keypress", (event) => {
    if (event.key == "r") {
        randomNumber();
    }
    if (event.key == "h") {
        showHistory();
    }
})

body.addEventListener("mouseenter", () => {
    itens.forEach((element) => {
        element.style.opacity = "1";
    })
})

body.addEventListener("mouseleave", () => {
    itens.forEach((element) => {
        element.style.opacity = "0";
    })
})