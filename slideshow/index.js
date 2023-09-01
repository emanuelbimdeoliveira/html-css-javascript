"use strit";

const slides = document.querySelectorAll("section[class*=slide]");

slides.forEach((element, index) => {
    element.id = index;
    element.style.backgroundImage = `url(imagens/${index}.jpg)`;
})

const dots = document.querySelectorAll("li[id*=dot]");

let i = 0;


const slideShow = () => {
    i = i > slides.length - 1 ? 0 : i;
    i = i < 0 ? slides.length - 1 : i;
    for (let a = 0; a < slides.length; a++ ) {
        if (slides[a].id == i) {
            slides[a].style.display = "block"; 
        } else {
            slides[a].style.display = "none"; 
        }

        const test = i + 1;

        if (dots[a].id.endsWith(test)) {
            dots[a].className = "selected"; 
        } else {
            dots[a].className = "un-selected"; 
        }
        
    }
}

const buttonClick = (event) => {
    switch (event.target.id) {
        case "back-button":
            i--
            break
        case "forward-button":
            i++
            break
        case "dot-1":
            i = 0;
            break
        case "dot-2":
            i = 1
            break   
        case "dot-3":
            i = 2
            break       
        case "dot-4":
            i = 3
            break       
        case "dot-5":
            i = 4
    }
    slideShow();  
}


document.querySelectorAll("li").forEach((element) => {
    element.addEventListener("click", buttonClick);
})

slideShow();