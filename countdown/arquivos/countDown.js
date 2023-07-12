
let body = document.querySelector('body');
body.classList = 'temaPadraoBody';

let relogio = document.createElement('p');
relogio.id = "relogioHoraAtual";
relogio.setAttribute('class', 'relogioHoraAtual');


let menu = document.createElement('div');
const criarMenu = () => {
    menu.classList.add('menu');
    body.appendChild(menu);
    menu.innerHTML = `
        <aside class="temaPadraoAside">
            <p class="flexTexto">Tema Claro</p>
            <p class="flexTexto">Tema Escuro</p>
            <p class="flexTexto">Tema Inicial</p>
            <a href="#" class="flexTexto" id="reiniciar">Reiniciar</a>
        </aside>
    `;
    // tempo de espera para a que funcione a transição suave
    setTimeout(() => {
        document.querySelector('aside').setAttribute('id', 'asideTransicao')
    }, 1);
    
    document.querySelector('aside').appendChild(relogio);

    menuVisivel = true;
    body.addEventListener('click', sairDoMenu);
    
    // funcionalidade para mudar os temas
    temas = document.querySelectorAll('aside p');
    temas.forEach(element => {
        element.addEventListener('click', testeCondicionalParaMudarOTema);            
    });

    document.querySelector('a#reiniciar').addEventListener('click', reiniciar);

    document.querySelector('aside').setAttribute('class', temaAsideModificacao);
}      


let temaAsideModificacao = 'temaPadraoAside';

const mudarTema = () => {
    classeDosParagrafos = `[class*=Paragrafo]`;
    classeBody = `[class*=Body]`; 

    paragrafosModificacao = document.querySelectorAll(classeDosParagrafos);
    paragrafosModificacao.forEach(element => {
        element.setAttribute('class', classeModificacaoDosParagrafos);  
    });

    bodyModificacao = document.querySelectorAll(classeBody);
    bodyModificacao.forEach(element => {
        element.setAttribute('class', classeBodyModificacao);  
    });

    iconesModificacao = document.querySelectorAll(classeIcones);
    iconesModificacao.forEach(element => {
        element.style.color =  corIconesModificacao;                
    });
    document.querySelector('main > a').style.color = corIconeFormulario;
    document.querySelector('main > a').style.textShadow = shadowIconeFormulario;
    document.querySelector('aside').setAttribute('class', temaAsideModificacao);
}


const classeIcones = '.voltarPagina';

let corIconeFormulario = 'black';
let shadowIconeFormulario = '2px 2px 0 white';

document.querySelector('main > a').style.color = corIconeFormulario;
document.querySelector('main > a').style.textShadow = shadowIconeFormulario;

const testeCondicionalParaMudarOTema = (evento) => {
    testeParaModificacaoImg = evento.target.textContent;
    if (evento.target.textContent == 'Tema Claro') {
        classeModificacaoDosParagrafos = 'temaClaroParagrafo'; 
        classeBodyModificacao = 'temaClaroBody';

        corIconesModificacao = 'black';
        corIconeFormulario = 'black';
        shadowIconeFormulario = '2px 2px 0 white';

        document.querySelector(".display").style.textShadow = "3px 3px 0 #0f0fff";

        temaAsideModificacao = 'temaClaroAside';
        mudarTema();
    } else if (evento.target.textContent == 'Tema Escuro') {
        classeModificacaoDosParagrafos = 'temaEscuroParagrafo'; 
        classeBodyModificacao = 'temaEscuroBody';

        corIconesModificacao = 'white';
        corIconeFormulario = 'white';
        shadowIconeFormulario = '2px 2px 0 black';

        document.querySelector(".display").style.textShadow = "1.5px 1.5px 0 #f80";

        temaAsideModificacao = 'temaEscuroAside';
        mudarTema();
    } else if (evento.target.textContent == 'Tema Inicial') {
        classeModificacaoDosParagrafos = 'temaPadraoParagrafo'; 
        classeBodyModificacao = 'temaPadraoBody';

        corIconesModificacao = 'white';
        corIconeFormulario = 'black';
        shadowIconeFormulario = '2px 2px 0 white';

        document.querySelector(".display").style.textShadow = "6px 6px 0 black";

        temaAsideModificacao = 'temaPadraoAside';
        mudarTema();
    }
} 

const sairDoMenu = (evento) => {
    if (menuVisivel && evento.target.classList.value == 'menu') {
        document.querySelector('aside').setAttribute('id', 'menu');
        // tempo de espera para a que funcione a transição suave
        setTimeout(() => {
            body.removeChild(menu);
        }, 500);
        menuVisivel = false;
    }
}

const reiniciar = () => {
    body.removeChild(menu);
    clearInterval(countDown);
}

// aqui começa a parte dos cálculos do CountDown
let data;
let hora;
let minuto;
let segundo;
let horaAtual;

const countDown = () => {
    // esses são os dados de entrada que não mudam no decorrer do tempo
    tempo = document.querySelector("#horaFinal").value;
    horaFinal = new Date(tempo).getTime();
    
    // daqui para baixo os dados são atualizados a cada segundo
    countDownAtivo = setInterval(() => {
        horaAtual = Date.now();

        totalDeSegundos = Math.ceil((horaFinal - horaAtual) / 1000);        
        
        // cálculo dos valores exatos de horas, minutos e segundos com base no total dos segundos
        totalDias = Math.floor(totalDeSegundos / (3600 * 24));
        totalDias = totalDias < 10 ? `0${totalDias}` : totalDias;

        totalHoras = Math.floor((totalDeSegundos % (3600 * 24)) / 3600);
        totalHoras = totalHoras < 10 ? `0${totalHoras}` : totalHoras;

        minutosCountDown = Math.floor((totalDeSegundos % 3600) / 60);
        minutosCountDown = minutosCountDown < 10 ? `0${minutosCountDown}` : minutosCountDown;
        
        segundosCountDown = totalDeSegundos % 60;
        segundosCountDown = segundosCountDown < 10 ? `0${segundosCountDown}` : segundosCountDown;
        
        document.querySelector('p.display').textContent = 
            totalDeSegundos <= 0 ? '00 : 00 : 00 : 00' : `${totalDias} : ${totalHoras} : ${minutosCountDown} : ${segundosCountDown}`
        ;
        
        // esse é apenas um relógio que mostra a hora atual
        data = new Date();
        hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
        minuto = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
        segundo = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
        horaAtual = `${hora} : ${minuto} : ${segundo}`;
        relogio.textContent = horaAtual;  
        
    }, 1000);
}


// função inicia automáticamente
countDown();

// esses são os eventos para ativação das funções
document.querySelector('form a').addEventListener('click', countDown);
document.querySelector('i#menu').addEventListener('click', criarMenu);

const icons = document.querySelectorAll(".mostradorNumeros > .voltarPagina");

body.addEventListener("mouseenter", () => {
    icons.forEach((element) => {
        if (element.style.display = "none") {
            element.style.display = "block";
        }
    })
})

body.addEventListener("mouseleave", () => {
    icons.forEach((element) => {
        if (element.style.display = "block") {
            element.style.display = "none";
        }
    })
})
