let body = document.querySelector("body");
body.classList = "temaPadraoBody";

let display = document.querySelector(".display");

let relogio = document.createElement("p");
relogio.id = "relogioHoraAtual";
relogio.setAttribute("class", "relogioHoraAtual");

let menu = document.createElement("div");
const criarMenu = () => {
  menu.classList.add("menu");
  body.appendChild(menu);
  menu.innerHTML = `
        <aside class="temaPadraoAside">
            <p class="flexTexto" onclick="tocarAudio5Minutos()">5 minutos</p>
            <p class="flexTexto" onclick="tocarAudio1Minuto()">1 minuto</p>
            <p class="flexTexto">Tema Claro</p>
            <p class="flexTexto">Tema Escuro</p>
            <p class="flexTexto">Tema Inicial</p>
            <a href="#" class="flexTexto" id="reiniciar">Reiniciar</a>
        </aside>
    `;
  // tempo de espera para a que funcione a transição suave
  setTimeout(() => {
    document.querySelector("aside").setAttribute("id", "asideTransicao");
  }, 1);

  document.querySelector("aside").appendChild(relogio);

  menuVisivel = true;
  body.addEventListener("click", sairDoMenu);

  // funcionalidade para mudar os temas
  temas = document.querySelectorAll("aside p");
  temas.forEach((element) => {
    element.addEventListener("click", testeCondicionalParaMudarOTema);
  });

  document.querySelector("a#reiniciar").addEventListener("click", reiniciar);

  document.querySelector("aside").setAttribute("class", temaAsideModificacao);
};

let temaAsideModificacao = "temaPadraoAside";

const mudarTema = () => {
  classeDosParagrafos = `[class*=Paragrafo]`;
  classeBody = `[class*=Body]`;

  paragrafosModificacao = document.querySelectorAll(classeDosParagrafos);
  paragrafosModificacao.forEach((element) => {
    element.setAttribute("class", classeModificacaoDosParagrafos);
  });

  bodyModificacao = document.querySelectorAll(classeBody);
  bodyModificacao.forEach((element) => {
    element.setAttribute("class", classeBodyModificacao);
  });

  iconesModificacao = document.querySelectorAll(classeIcones);
  iconesModificacao.forEach((element) => {
    element.style.color = corIconesModificacao;
  });
  document.querySelector("main > a").style.color = corIconeFormulario;
  document.querySelector("main > a").style.textShadow = shadowIconeFormulario;
  document.querySelector("aside").setAttribute("class", temaAsideModificacao);
};

const classeIcones = ".voltarPagina";

let corIconeFormulario = "black";
let shadowIconeFormulario = "2px 2px 0 white";

document.querySelector("main > a").style.color = corIconeFormulario;
document.querySelector("main > a").style.textShadow = shadowIconeFormulario;

const testeCondicionalParaMudarOTema = (evento) => {
  testeParaModificacaoImg = evento.target.textContent;

  if (evento.target.textContent == "Tema Claro") {
    classeModificacaoDosParagrafos = "temaClaroParagrafo";
    classeBodyModificacao = "temaClaroBody";

    corIconesModificacao = "black";
    corIconeFormulario = "black";
    shadowIconeFormulario = "2px 2px 0 white";

    temaAsideModificacao = "temaClaroAside";

    display.style.textShadow = "none";
    mudarTema();
  } else if (evento.target.textContent == "Tema Escuro") {
    classeModificacaoDosParagrafos = "temaEscuroParagrafo";
    classeBodyModificacao = "temaEscuroBody";

    corIconesModificacao = "white";
    corIconeFormulario = "white";
    shadowIconeFormulario = "2px 2px 0 black";

    temaAsideModificacao = "temaEscuroAside";

    display.style.textShadow = "4px 4px 0px black";
    mudarTema();
  } else if (evento.target.textContent == "Tema Inicial") {
    classeModificacaoDosParagrafos = "temaPadraoParagrafo";
    classeBodyModificacao = "temaPadraoBody";

    corIconesModificacao = "white";
    corIconeFormulario = "black";
    shadowIconeFormulario = "2px 2px 0 white";

    temaAsideModificacao = "temaPadraoAside";

    display.style.textShadow = "4px 4px 0px black";
    mudarTema();
  }
};

const sairDoMenu = (evento) => {
  if (menuVisivel && evento.target.classList.value == "menu") {
    document.querySelector("aside").setAttribute("id", "menu");
    // tempo de espera para a que funcione a transição suave
    setTimeout(() => {
      body.removeChild(menu);
    }, 500);
    menuVisivel = false;
  }
};

const reiniciar = () => {
  body.removeChild(menu);
  clearInterval(countDown);
};

// aqui começa a parte dos cálculos do CountDown
let data;
let hora;
let minuto;
let segundo;
let horaAtual;

const countDown = () => {
  // esses são os dados de entrada que não mudam no decorrer do tempo
  tempo = document.querySelector("input#tempo");
  horaFinal = Number(tempo.value.slice(0, -3));
  minutoFinal = Number(tempo.value.slice(3, tempo.value.lenght));
  minutoFinal = minutoFinal == 1 ? (minutoFinal = 2) : minutoFinal;
  minutoFinal = minutoFinal == 0 ? 60 : minutoFinal - 1;
  segundoFinal = 60;

  audio5Minutos = new Audio("arquivos/audios/5minutos.mp3");
  audio1Minuto = new Audio("arquivos/audios/1minuto.mp3");
  audio1MinutoShort = new Audio("arquivos/audios/1minuto-short.mp3");

  // daqui para baixo todos os dados são atualizados a cada segundo
  countDownAtivo = setInterval(() => {
    data = new Date();
    hora = data.getHours();
    minuto = data.getMinutes();
    segundo = data.getSeconds();

    horasRestantes = horaFinal - hora;
    if (minutoFinal == "60") {
      horasRestantes--;
      minutoFinal--;
    }
    if (minutoFinal < minuto) {
      horasRestantes--;
      minutosRestantes = 60 - minuto;
      minutosRestantes += minutoFinal;
    } else {
      minutosRestantes = minutoFinal - minuto;
    }
    segundosRestantes = segundoFinal - segundo;

    // cálculo do total dos segundos
    let segundosEmHoras = horasRestantes * 3600;
    let segundosEmMinutos = minutosRestantes * 60;
    let totalDeSegundos =
      segundosEmHoras + segundosEmMinutos + segundosRestantes;

    // cálculo dos valores exatos de horas, minutos e segundos com base no total dos segundos
    segundosCountDown = totalDeSegundos % 60;
    segundosCountDown =
      segundosCountDown < 10 ? `0${segundosCountDown}` : segundosCountDown;
    minutosCountDown = parseInt(totalDeSegundos / 60) % 60;
    minutosCountDown =
      minutosCountDown < 10 ? `0${minutosCountDown}` : minutosCountDown;
    horasCountDown = parseInt(parseInt(totalDeSegundos / 60) / 60);
    horasCountDown =
      horasCountDown < 10 ? `0${horasCountDown}` : horasCountDown;

    document.querySelector("p.display").textContent =
      totalDeSegundos <= 0
        ? "00:00:00"
        : `${horasCountDown} : ${minutosCountDown} : ${segundosCountDown}`;

    // momento de tocar os audios
    if (totalDeSegundos == 60 * 5 + 10) {
      audio5Minutos.play();
    }
    if (totalDeSegundos == 60 + 10) {
      audio1Minuto.play();
    }

    // esse é apenas um relógio que mostra a hora atual
    data = new Date();
    hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
    minuto =
      data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
    segundo =
      data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
    horaAtual = `${hora} : ${minuto} : ${segundo}`;
    relogio.textContent = horaAtual;
    document.querySelector(".footer > #relogioHoraAtual").textContent =
      horaAtual;

    // isso está aqui para corrigir minutos acrescentados na outra condicional dos minutos
    if (minutoFinal == "59") {
      minutoFinal++;
    }
  }, 1000);
};

// funcionalidade para tocar os audios manualmente
const tocarAudio5Minutos = () => {
  audio5Minutos.play();
};
const tocarAudio1Minuto = () => {
  audio1MinutoShort.play();
};

body.addEventListener("keypress", (event) => {
  if (event.key == "q") {
    tocarAudio5Minutos();
  }
  if (event.key == "w") {
    tocarAudio1Minuto();
  }
});

// função inicia automáticamente
countDown();

// esses são os eventos para ativação das funções
document.querySelector("form a").addEventListener("click", countDown);
document.querySelector("i#menu").addEventListener("click", criarMenu);

const icons = document.querySelectorAll(".tituloCountDown > .voltarPagina");

body.addEventListener("mouseenter", () => {
  icons.forEach((element) => {
    if ((element.style.display = "none")) {
      element.style.display = "block";
    }
  });
});

body.addEventListener("mouseleave", () => {
  icons.forEach((element) => {
    if ((element.style.display = "block")) {
      element.style.display = "none";
    }
  });
});
