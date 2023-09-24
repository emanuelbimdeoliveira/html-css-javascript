"use strict";

const body = document.querySelector("body");
let limit = 50;

const data = [
	{id: "continent", h2Text: "Selecione um continente", inputPlaceholder: "America do Sul", thText: "Nomes dos Países"},
	{id: "country", h2Text: "Digite a sigla de um país", inputPlaceholder: "Exemplo: Br, Us, Fr, It", inputValue: "br", thText: "Nomes dos estados ou províncias:"},
	{id: "state", h2Text: "Digite a sigla do estado:", inputPlaceholder: "Exemplo: SP, PR, RJ", inputValue: "sp", thText: "Nomes das cidades:"}
];

for (let i = 0; i < 3; i++) {
	const section = document.createElement("section");
	section.id = data[i].id;
	section.classList.add("section-of-content");
	section.innerHTML = `
		<form class="form-control container-lg bg-light mt-5">
			<button type="button" class="btn btn-warning border-dark mt-3 shadow material-symbols-outlined" onclick="history.back()">arrow_back</button>
			<h2 class="bg-info text-bg-info text-center mt-3 shadow rounded-2">${data[i].h2Text}</h2>
			<fieldset class="input-group container-lg d-flex justify-content-center py-5">
				<input type="text" placeholder="${data[i].inputPlaceholder}" value="${data[i].inputValue}" class="p-2 w-75 input-of-text">
				<select name="continent-name" id="continent-name" class="select-of-continents w-75">
					<option value="eu">Europa</option>
					<option value="na">América do Norte</option>
					<option value="sa" selected>América do Sul</option>
					<option value="as">Ásia</option>
					<option value="af">Africa</option>
					<option value="oc">Oceania</option>
				</select>		
				<button type="button" id="${i}" onclick="catchResponse(${i})" class="btn btn-info p-2 material-symbols-outlined">search</button> 
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


// funções
const increaseLimit = (index) => {
	limit += 20;
	catchResponse(index);
}

const catchResponse = async (index) => {
	const inputText = document.querySelectorAll("input[type=text]");
	const inputSelect = document.querySelector("select");
	const tableBody = document.querySelectorAll("tbody");
	const section = document.querySelectorAll("section.section-of-content");

	let response;
	let url;

	tableBody[index].innerHTML = "";

	switch (section[index].id) {
		case "continent": 
			url = `https://referential.p.rapidapi.com/v1/country?fields=currency%2Ccurrency_num_code%2Ccurrency_code%2Ccontinent_code%2Ccurrency%2Ciso_a3%2Cdial_code&continent_code=${inputSelect.value}&lang=pt&limit=${limit}`;
			break;
		case "country": 
			url = `https://referential.p.rapidapi.com/v1/state?fields=iso_a2&iso_a2=${inputText[index].value}&lang=pt&limit=${limit}`;
			break;
		case "state": 
			url = `https://referential.p.rapidapi.com/v1/city?fields=iso_a2%2Cstate_code%2Cstate_hasc%2Ctimezone%2Ctimezone_offset&iso_a2=br&lang=pt&state_code=${inputText[index].value}&limit=${limit}`;
			break;
	}

	try {
		response = await fetch(url, options);
	} catch (error) {
		alert("Tente novamente!");
	}

	if (response.status == 200) {
		let result = await response.json();

		let resultArray = [];
		result.map((element) => {
			resultArray.push(element.value);
		})
		resultArray.sort()

		for (let i = 0; i < resultArray.length; i += 3) {
			const tableRow = document.createElement("tr");		
			tableRow.innerHTML = `
				<td>
					<p class="w-50 d-inline float-start">${resultArray[i]}</p>
					<a class="find-place nav-link material-symbols-outlined" href="https://www.google.com.br/maps/place/${resultArray[i]}" target="_blank" title="Localizar no Google Maps">location_on</a>
				</td>
				<td>
					<p class="w-50 d-inline float-start">${resultArray[i += 1]}</p>
					<a class="find-place nav-link material-symbols-outlined" href="https://www.google.com.br/maps/place/${resultArray[i]}" target="_blank" title="Localizar no Google Maps">location_on</a>
				</td>
				<td>
					<p class="w-50 d-inline float-start">${resultArray[i += 1]}</p>
					<a class="find-place nav-link material-symbols-outlined" href="https://www.google.com.br/maps/place/${resultArray[i]}" target="_blank" title="Localizar no Google Maps">location_on</a>
				</td>
			`;
			i -= 2;
			tableBody[index].appendChild(tableRow);
		}	
		
		const lastRow = document.querySelectorAll("tr:last-of-type p");
		lastRow.forEach((element) => {
			if (element.textContent == "undefined") {
				element.parentElement.style.display = "none";
			}
		})

		const tableRowIncreaseContent = document.createElement("tr");		
		tableRowIncreaseContent.innerHTML = `
			<td class="text-center py-2" colspan="3">
				<button type="button" class="btn btn-warning text-bg-warning text-center w-50 mx-auto" onclick="increaseLimit(${index})">Mostrar Mais</button>
			</td>
		`;
		tableBody[index].appendChild(tableRowIncreaseContent);
	} else {
		const tableRow = document.createElement("tr");		
		tableRow.innerHTML = `
			<td class="text-center py-2">Nenhum resultado encontrado! Tente novamente.</td>
		`;
		tableBody[index].appendChild(tableRow);
	}
}


body.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		event.preventDefault();
		switch (event.view.location.hash) {
			case "#continent":
				catchResponse(0);
				break;
			case "#country":
				catchResponse(1);
				break;
			case "#state":
				catchResponse(2);
				break;			
		}		
	}
});