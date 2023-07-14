const sections = document.querySelectorAll('section');
const classeAnimacao = 'section_scroll';

let tela = window.innerHeight;
tela /= 100;
tela *= 50; 

const menu = document.querySelector("menu");
const navElement = document.querySelector("nav");


const animacao = () => {
    sections.forEach(element => {
        if (window.pageYOffset > element.offsetTop - tela) {
            element.classList.add(classeAnimacao);
        }
    });
}

setInterval(() => {
    animacao();
}, 500);


let texto = document.querySelector('h1');
let i = 0;

texto.addEventListener('click', () => {
    const escrever = texto.textContent;
    texto.textContent = '';
    const textoArray = escrever.split('');
    const intervalo = setInterval(() => {
        if (i < textoArray.length) {
            texto.textContent += textoArray[i];    
        } else {
            texto.innerHTML = `Bíblia <br/> Sagrada`;    
            clearInterval(intervalo);
            i = -1;
        }
        i++
    }, 100);    
})

menu.addEventListener("click", () => {
    navElement.classList.toggle("nav-showing");
    menu.classList.toggle("menu-actived");
    if (menu.textContent == ">") {
        menu.textContent = "<";
    } else if (menu.textContent == "<") {
        menu.textContent = ">";
    }
})