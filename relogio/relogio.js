
let display = document.querySelectorAll('p');


const time = setInterval(() => {
    executar();
}, 1000);

const inicio = setTimeout(() => {
    executar();
}, 10);


const executar = () => {
    let horaAtual = new Date();

    dia = horaAtual.getDay();
    switch (dia) {
        case 0:
            diaDaSemana = 'Domingo';
            break;
        case 1:
            diaDaSemana = 'Segunda-Feira';
            break
        case 2:
            diaDaSemana = 'Terça-Feira';
            break;
        case 3:
            diaDaSemana = 'Quarta-Feira';
            break;
        case 4:
            diaDaSemana = 'Quinta-Feira';
            break;
        case 5:
            diaDaSemana = 'Sexta-Feira';
            break;
        case 6:
            diaDaSemana = 'Sábado';                                        
    }
    
    diaDoMes = horaAtual.getDate() < 10 ? `0${horaAtual.getDate()}` : horaAtual.getDate(); 
    mes = horaAtual.getMonth() + 1 < 10 ? `0${horaAtual.getMonth() + 1}` : horaAtual.getMonth() + 1; 
    data = `${diaDoMes}/${mes}/${horaAtual.getFullYear()}`;


    hora = horaAtual.getHours();
    if (hora < 12) {
        formato = 'AM';
    } else {
        formato = 'PM';
        hora = hora - 12;
    }
    
    minuto = horaAtual.getMinutes();
    segundo = horaAtual.getSeconds();
    
    hora = hora < 10 ? `0${hora}` : hora;
    minuto = minuto < 10 ? `0${minuto}` : minuto;
    segundo = segundo < 10 ? `0${segundo}` : segundo;

    display[0].innerHTML = `${hora} <br/> <span class="description">horas</span>`;
    display[1].innerHTML = `${minuto} <br/> <span class="description">minutos</span>`;
    display[2].innerHTML = `${segundo} <br/> <span class="description">segundos</span>`;

    document.querySelector('sup').textContent = formato;
    document.querySelector('p.date').textContent = `${diaDaSemana}, ${data}`;
}