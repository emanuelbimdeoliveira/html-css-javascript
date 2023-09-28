"use strict";

const main = document.querySelector("main");
const video = document.querySelector("video");

const buttons = document.querySelectorAll("button");

let totalTimeValue;
let currentTimeValue;

const progressBar = document.querySelector(".progress-bar");
const timeDisplay = document.querySelector("#time-display");


const controls = (event) => {
    switch (event.target.id) {
        case "restart":
            video.currentTime = 0;
            break
        case "backward":
            video.currentTime -= 10;
            break;
        case "play-pause":
            if (event.target.textContent == "play_circle") {
                video.play();
                event.target.textContent = "pause_circle";    
            } else {
                video.pause();
                event.target.textContent = "play_circle";    
            }
            break;
        case "forward":
            video.currentTime += 10;
            break;
        case "volume": 
            if (event.target.textContent == "volume_up") {
                video.volume = 0;
                event.target.textContent = "volume_off";    
            } else {
                video.volume = 1;
                event.target.textContent = "volume_up";    
            }
            break;
    }
}

const duration = () => {
    totalTimeValue = Math.floor(video.duration);
    currentTimeValue = Math.floor(video.currentTime);

    const totalTimeSeconds = `${String(Math.floor(totalTimeValue / 60)).padStart(2, "0")} : ${String(Math.floor(totalTimeValue % 60)).padStart(2, "0")}`;
    const currentTimeSeconds = `${String(Math.floor(currentTimeValue / 60)).padStart(2, "0")} : ${String(Math.floor(currentTimeValue % 60)).padStart(2, "0")}`;

    timeDisplay.textContent = `${currentTimeSeconds} / ${totalTimeSeconds}`;

    const percentage = currentTimeValue / (totalTimeValue / 100);
    progressBar.style.width = `${percentage}%`;
}

const changeTime = (event) => {
    const totalWidth = event.target.offsetWidth;
    const clickOffset = event.offsetX;

    const percentageWidth = Math.round(clickOffset / (totalWidth / 100));
    console.log(percentageWidth)

    video.currentTime = (totalTimeValue / 100) * percentageWidth;
}


buttons.forEach((element) => {
    element.addEventListener("click", controls);
});

video.addEventListener("timeupdate", duration);

progressBar.parentElement.addEventListener("click", changeTime);

window.addEventListener("keydown", (event) => {
    if (event.key == "f") {
        main.requestFullscreen();
    }
})