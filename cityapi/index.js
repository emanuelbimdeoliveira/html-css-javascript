"use strict";

const body = document.querySelector("body");

const data = [
	{id: "continent", h2Text: "Digite o nome de um continente", inputPlaceholder: "America do Sul", thText: "Nomes dos Países"},
	{id: "country", h2Text: "Digite o nome de um país", inputPlaceholder: "Brasil", thText: "Nomes dos estados"},
	{id: "state", h2Text: "Digite a sigla do estado desejado:", inputPlaceholder: "Exemplo: SP, PR, RJ", thText: "Nomes das cidades"}
]

for (let i = 0; i < 3; i++) {
	const section = document.createElement("section");
	section.id = data[i].id;
	section.innerHTML = `
		<form class="form-control container-lg bg-light my-5">
			<h2 class="bg-info text-bg-info text-center">${data[i].h2Text}</h2>
			<fieldset class="input-group container-lg d-flex justify-content-center py-5">
				<input type="text" placeholder="${data[i].inputPlaceholder}" class="p-2 w-50">
				<button type="button" id="${i}" onclick="catchResponse(${i})" class="btn btn-info p-2">S</button> 
			</fieldset>
		</form>
	
		<div>
			<table id="${i}" class="table table-striped table-bordered table-hover container-lg bg-light rounded mx-auto">
				<thead>
					<tr>
						<th colspan="3" class="text-center">${data[i].thText}</th>
					</tr>
				</thead>
				<tbody id="${i}">
	
				</tbody>
			</table>    
			<div id="image" class="container-lg"></div>
		</div>
	`;
	body.appendChild(section);
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d01508de4msh693999af6a06f17p130f88jsn1e52fddd5772',
		'X-RapidAPI-Host': 'referential.p.rapidapi.com'
	}
};


const catchResponse = async (index) => {
	const inputText = document.querySelectorAll("input[type=text]");
	const tableBody = document.querySelectorAll("tbody");

	tableBody[index].innerHTML = "";

    const url = `https://referential.p.rapidapi.com/v1/city?fields=iso_a2%2Cstate_code%2Cstate_hasc%2Ctimezone%2Ctimezone_offset&iso_a2=br&lang=pt&state_code=${inputText[index].value}&limit=250`;
    
    const response = await fetch(url, options);
    const result = await response.json();
    
	console.log(result.length)
	for (let i = 0; i <= result.length; i += 3) {
		console.log(i)
		const tableRow = document.createElement("tr");		
		tableRow.innerHTML = `
			<td>${result[i].value}</td>
			<td>${result[i += 1].value}</td>
			<td>${result[i += 1].value}</td>
		`;
		i -= 2;
		tableBody[index].appendChild(tableRow);
	}
}


