 
// variables of clock
const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minutes");
const hours = document.querySelector(".hours");

const digitalClockBigNumbers = document.querySelector("span.big-numbers");
const digitalClockSmallNumbers = document.querySelector("span.small-numbers");

// variables of DOM
const body = document.querySelector("body");
const aside = document.querySelector(".aside-menu");
const menu = document.querySelector(".aside-menu > i");

// variables of theme toggle
const arrayOfColors = [
    {
        background_body: "#ffd",
        background_text: "#0053",  
        background_text_hover: "#0058",  
        background_clock: "#fee",  
        text_color: "#000",
        text_color_hover: "fff",
        text_shadow: "2px 2px 0 white",
        text_shadow_hover: "none",
        background_hours_hand: "#222",
        background_minutes_hand: "#333",
        background_seconds_hand: "#f30"    
    },
    {
        background_body: "#003",
        background_text: "#ffe3",  
        background_text_hover: "#ffea",  
        background_clock: "#224",  
        text_color: "#fff",
        text_color_hover: "#000",
        text_shadow: "2px 2px 0 black",
        text_shadow_hover: "none",
        background_hours_hand: "#333",
        background_minutes_hand: "#444",
        background_seconds_hand: "#03f"    
    },
    {
        background_body: "#f40",
        background_text: "#ff8a",  
        background_text_hover: "#ff8a",  
        background_clock: "#a40",  
        text_color: "#001",
        text_color_hover: "fff",
        text_shadow: "2px 2px 0 white",
        text_shadow_hover: "none",
        background_hours_hand: "#ff0",
        background_minutes_hand: "#ff7",
        background_seconds_hand: "#f40"    
    },
    {
        background_body: "#0b0",
        background_text: "#3f3a",  
        background_text_hover: "#efe",  
        background_clock: "#fffa",  
        text_color: "#020",
        text_color_hover: "fff",
        text_shadow: "2px 2px 0 white",
        text_shadow_hover: "none",
        background_hours_hand: "#050",
        background_minutes_hand: "#080",
        background_seconds_hand: "#af0"    
    },
];

// work to clock function
const clockWork = () => {
    let secondsDeg = new Date().getSeconds();
    let minutesDeg = new Date().getMinutes();
    let hoursDeg = new Date().getHours();

    // analogic clock
    const finalHoursDeg = hoursDeg > 12 ? hoursDeg - 12 : hoursDeg;
    const totalMinutesDeg = finalHoursDeg * 60 + minutesDeg;
    
    seconds.style.transform = `rotateZ(${secondsDeg * 6}deg)`;
    minutes.style.transform = `rotateZ(${minutesDeg * 6}deg)`;
    hours.style.transform = `rotateZ(${totalMinutesDeg * 0.5}deg)`;
    
    // digital clock
    hoursDeg = hoursDeg < 10 ? `0${hoursDeg}` : hoursDeg;
    minutesDeg = minutesDeg < 10 ? `0${minutesDeg}` : minutesDeg;
    secondsDeg = secondsDeg < 10 ? `0${secondsDeg}` : secondsDeg;

    digitalClockBigNumbers.textContent = `${hoursDeg}:${minutesDeg}`; 
    digitalClockSmallNumbers.textContent = `:${secondsDeg}`; 
}

setInterval(() => {
    clockWork();
}, 1000);


// function to show the draw menu
menu.addEventListener("click", () => {
    document.querySelector(".aside-field").classList.toggle("draw-menu-show");
});

// class of all functions for each theme
class Theme {
    constructor(object) {
        this.backgroundBody = object.background_body,
        this.backgroundText = object.background_text,  
        this.backgroundTexthover = object.background_text_hover,  
        this.backgroundClock = object.background_clock,  
        this.textColor = object.text_color,
        this.textColorHover = object.text_color_hover,
        this.textShadow = object.text_shadow,
        this.textShadowHover = object.text_shadow_hover,
        this.backgroundHoursHand = object.background_hours_hand,
        this.backgroundMinutesHand = object.background_minutes_hand,
        this.backgroundSecondsHand = object.background_seconds_hand     
    }

    toggleTheme () {
        const root = document.querySelector(":root");
        root.style.setProperty("--background-body", this.backgroundBody);
        root.style.setProperty("--background-text", this.backgroundText);
        root.style.setProperty("--background-text-hover", this.backgroundTexthover);
        root.style.setProperty("--background-clock", this.backgroundClock);
        root.style.setProperty("--text-color", this.textColor);
        root.style.setProperty("--text-color-hover", this.textColorHover);
        root.style.setProperty("--text-shadow", this.textShadow);
        root.style.setProperty("--text-shadow-hover", this.textShadowHover);
        root.style.setProperty("--background-hours-hand", this.backgroundHoursHand);
        root.style.setProperty("--background-minutes-hand", this.backgroundMinutesHand);
        root.style.setProperty("--background-seconds-hand", this.backgroundSecondsHand);
    }
}

// function to toggle the theme
const toggleOfTheme = () => {
    const localStorageData = localStorage.getItem("indexOfTheme") || 0;

    const objectOfData = new Theme(arrayOfColors[Number(localStorageData)]); 
    objectOfData.toggleTheme();
}

// events of menu
document.querySelectorAll("ul li").forEach((element, index) => {
    element.addEventListener("click", () => {
        localStorage.setItem("indexOfTheme", index);
        toggleOfTheme();
    })
});

toggleOfTheme();
clockWork();
