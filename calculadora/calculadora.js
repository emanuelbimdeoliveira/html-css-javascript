
let resposta = document.querySelector('p.telaNumeros');
let resultado;


const executarCalculo = () => {
    fator1 = Number(fator1.replace(',', '.'));
    fator2 = Number(fator2.replace(',', '.'));
    switch (operacao) {
        case '+': resultado = fator1 + fator2;
         break
        case '-': resultado = fator1 - fator2;
         break
        case '/': resultado = fator1 / fator2;
         break
        case 'X': resultado = fator1 * fator2;
         break
        case '^': resultado = fator1 ** fator2;
    } 
    fator1 = String(resultado);
    fator1 = fator1.replace('.', ',');
    resposta.textContent = fator1;
    fator2 =  '';
    sinalClicado = false;
    fator1Ativado = true;
    fator1Ativo = true;
    sinalAtivo = false;
    fator2Ativo = false;
    invertido = false;
}


let fator1 = '';
let fator1Ativado = false;
let fator2 = '';

let fator1Ativo = false;
let fator2Ativo = false;
let sinalAtivo = false;
let testeAcercaDaVirgula;

const inserirNumero = (evento) => {
    if (!sinalClicado) {
        testeAcercaDaVirgula = fator1.indexOf(',') !== -1 && evento.target.textContent == ',';
        if (resposta.textContent == '' && evento.target.textContent == ',') {
            fator1 += `0${evento.target.textContent}`;
            resposta.textContent = fator1.toLocaleString('BR');
        } else if (!testeAcercaDaVirgula) {
            fator1 += evento.target.textContent;
            resposta.textContent = !invertido ? fator1 : `(${fator1})`;
        }
        fator1Ativado = true;
        fator1Ativo = true;
        sinalAtivo = false;
        fator2Ativo = false;
    } else {
        testeAcercaDaVirgula = fator2.indexOf(',') !== -1 && evento.target.textContent == ',';
        if (sinalAtivo == true && evento.target.textContent == ',') {
            fator2 += `0${evento.target.textContent}`;
            fator2Tela = `0${evento.target.textContent}`;
            resposta.textContent += fator2Tela;
        } else if (!testeAcercaDaVirgula) {
            fator2 += evento.target.textContent;
            fator2Tela = evento.target.textContent;
            if (!invertido) {
                resposta.textContent += fator2Tela;
            } else {
                if (!fator2Ativo) {
                    resposta.textContent += `(${fator2Tela})`;
                } else {
                    resposta.textContent = resposta.textContent.slice(0, -1);
                    resposta.textContent += `${fator2Tela})`;
                }
            }
        }
        fator1Ativado = true;
        fator1Ativo = false;
        fator2Ativo = true;
        sinalAtivo = false;
    }
}


let operador = document.querySelector('p.telaSinais');
let operacao;

let sinalClicado = false;
let respondido = false;

const inserirSinal = (evento) => {
   if (fator1Ativado) {
        if (!respondido) {
            operacao = evento.target.textContent;
        }
        if (sinalAtivo) {
            for (let i = 0; i < 3; i++) {
                resposta.textContent = resposta.textContent.slice(0, -1);
            } 
        }
        respondido = true;
        sinalClicado = true;
        if (fator1 !== '' && fator2 !== '') {
            executarCalculo();
            sinalClicado = true;
        } 
        operacao = evento.target.textContent;
        resposta.textContent += ` ${operacao} `;
        fator1Ativo = false;
        fator2Ativo = false;
        sinalAtivo = true;   
        invertido = false; 
   } 
}

const numeros = document.querySelectorAll('[class*=btNumero]');
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
const sinais = document.querySelectorAll('[class*=btSinal]');
sinais.forEach(sinal => sinal.addEventListener('click', inserirSinal));

document.querySelector('.btRes').addEventListener('click', () => {
    if (fator1 !== '' && fator2 !== '') {
        executarCalculo();
        respondido = true;
    }
});


const limparTudo = () => {
    fator1 = '';
    fator2 = '';
    fator1Ativado = false;
    fator1Ativo = false;
    fator2Ativo = false;
    sinalAtivo = false;
    sinalClicado = false;
    operacao;
    respondido = false;  
    resposta.textContent = '';
}

document.querySelector('.btDel').addEventListener('click', limparTudo);


const backSpace = () => {
    if (fator2Ativo  && fator2 !== '') {
        fator2 = fator2.slice(0, -1);
        resposta.textContent = resposta.textContent.slice(0, -1);
        if (fator2 == '') {
            fator2Ativo = false;
            sinalAtivo = true;
        }
    } else if (sinalAtivo && operacao !== '') {
        operacao = operacao.slice(0, -1);
        resposta.textContent = resposta.textContent.slice(0, -3);
        if (operacao == '') {
            operacaoAtivo = false;
            fator1Ativo = true;
        }
    } else if (fator1Ativo && fator1 !== '') {
        fator1 = fator1.slice(0, -1);
        resposta.textContent = resposta.textContent.slice(0, -1);
        if (fator1 == '') {
            limparTudo()
        }
    }
}

document.querySelector('.btBackspace').addEventListener('click', backSpace);


let invertido = false;

const inverterValor = () => {
    if (fator2Ativo && fator2 !== '') {
        fator2 = Number(fator2.replace(',', '.')) * -1;
        fator2 = fator2.toLocaleString('BR'); 
        if (!invertido) {
            const back = fator2.length;
            resposta.textContent = resposta.textContent.slice(0, -back)
            resposta.textContent += ` (${fator2})`;
            invertido = true;
        } else {
            const back = fator2.length + 3;
            resposta.textContent = resposta.textContent.slice(0, -back)
            resposta.textContent += ` ${fator2}`;
            invertido = false;
        }
    } else if (fator1Ativo && fator1 !== '') {
        fator1 = Number(fator1.replace(',', '.')) * -1;
        fator1 = fator1.toLocaleString('BR'); 
        if (!invertido) {
            const back = fator1.length;
            resposta.textContent = resposta.textContent.slice(0, -back)
            resposta.textContent += ` (${fator1})`;
            invertido = true;
        } else {
            const back = fator1.length + 3;
            resposta.textContent = resposta.textContent.slice(0, -back)
            resposta.textContent += ` ${fator1}`;
            invertido = false;
        }
    }
}

document.querySelector('.btInverter').addEventListener('click', inverterValor);