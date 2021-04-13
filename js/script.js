let conteneurEnTete = document.getElementById('conteneurTabEnTete');

let conteneurMulti = document.getElementById('conteneurTabMulti');

let titre = Array.prototype.slice.call(document.getElementsByTagName('h2'))
titre.pop()

// FONCTION QUI PERMET D'ENLEVER UNE VALEUR SPECIFIQUE A UN TABLEAU
Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

function readOnlyCell(inputTabMulti){
	let compt = 0;
	let emplac = 0;
	inputTabMulti.forEach(entree => {
		emplac +=1
		// CHAQUE FOIS QU'ON REVIENT A LA LIGNE, ON INCREMENTE compt
		if (emplac % nbrClass.value === 0) {
			emplac = 0;
			compt += 1
		}
		// DES CONDITIONS QUI NE PEUVENT ETRE COMPRISES QU'EN AFFICHANT LES VALEURS DE emplac ET compt
		if (emplac > compt || emplac === 0) {
			entree.style.backgroundColor = "lightgrey";
			entree.disabled = true;
		}
		if (emplac === (compt + 1) || compt == nbrClass.value) {
			entree.style.backgroundColor = "grey";
			entree.style.color = "white";
			entree.selectedIndex = 9;
			// SI L'ELEMENT N'A PAS DE CLASSE, JE LUI MET inputCell, SINON 'inputCell someClass'
			entree.className += entree.className ? ' someClass' : 'inputCell';
		} 
	})
}

function sumArray(array) {
  for (
    var
      index = 0,              // The iterator
      length = array.length,  // Cache the array length
      sum = 0;                // The total amount
      index < length;         // The "for"-loop condition
      sum += array[index++]   // Add number on each iteration
  );
  return sum;
}

function removeEmptyValues(tab){
	for (var i = 0; i < (tab.length); i++) {
		tab[i] = tab[i].filter(n => n)
	}
	return tab
}

function convertToDoubleDimension(tabNumColumn, tabValueColumn){
	// JE CREE UN TABLEAU QUI DEVIENDRA UNE DOUBLE DIMENSION QUI CONTIENDRA LES VALEURS DE CHAQUE COLONNE
	let tabColumnValue = new Array()
	for (var i = 0; i < (nbrClass.value); i++) {
		tabColumnValue[i] = new Array()
		for (var j = 0; j < (tabNumColumn.length); j++) {
			if (tabNumColumn[j] === i) {
				tabColumnValue[i][j] = tabValueColumn[j]
			}
		}
	}
	// console.log(removeEmptyValues(tabColumnValue));
	return removeEmptyValues(tabColumnValue)
}

// CETTE FONCTION S'ENCLENCHE A CHAQUE FOIS QUE TOUS LES INPUTS SONT REMPLIES. 
// OBJECTIF 1 : CREE 2 TABLEAUX QUI INDIQUENT QUELLES VALEURS POUR QUELLES COLONNES.
// OBJECTIF 2 : CREER UN TABLEAU A DOUBLE DIMENSIONS QUI PUISSE ME PERMETTRE DE FACILEMENT FAIRE DES CALCULS SUR LES VALEURS DE CHAQUE COLONNE
function getColumnValues(inputTabMulti){
	// console.log("TABLEAU FINI");
	let tabColumn = []
	let tabValue = []
	// JE PARCOURS CHAQUE CELLULE DU TABLEAU CREE 
	inputTabMulti.forEach(entree => {
		// JE CREE UNE VARIABLE QUI CONTIENDRA L'ID GENERAL DE CHAQUE CELLULE CIBLEE
		let id_input = parseInt(entree.id.split('_')[3])
		// JE RECEUPERE LES VALEURS DE CHAQUE COLONNE
		for (var i = 0; i < nbrClass.value; i++) {
			// LA PREMIERE COLONNE NE CONTIENT QUE DES VALEURS DIVISIBLES PAR LE NOMBRE DE CRITERES. LA DEUXIEME, LE RESTE EST A 1, LA TROISIEME COLONNE A 2, ETC.
			if ((id_input % nbrClass.value === i)) {
				// console.log(`Colonne ${i} : valeur ${entree.value}`);
				tabColumn.push(i)
				tabValue.push(convertValueToReal(parseFloat(entree.value)))
			}
		}
	})
	// console.log(tabColumn);
	// console.log(tabValue);
	// console.log(convertToDoubleDimension(tabColumn, tabValue));
	calculIndices(convertToDoubleDimension(tabColumn, tabValue), inputTabMulti)
}

// OBJECTIF : DONNER AUX INPUT UN IDENTIFIANT QUI PERMETTE DE RECUPERER L'INPUT INVERSE.
function reordonneArray(inputTabMulti){
	let comptReadOnly = 1
	let comptRead = 1
	// TOUT D'ABORD, JE REORDONNE LES INPUT EN MODIFIABLE. LORSQU'ON EST SUR UNE MEME COLONNE, J'INCREMENTE. 
	for (var i = 0; i < nbrClass.value; i++) {
		inputTabMulti.forEach(entree => {
			// SI L'ELEMENT EST MODIFIABLE, NE POSSEDE PAS LA CLASSE someClass (NE FAIT PAS PARTI DES "1"), ET ON EST UNE SUR MEME COLONNE
			if ((parseInt(entree.id.split('_')[1]) === i) && !entree.disabled && !entree.classList.contains('someClass')){
				entree.id += '_read_' + comptRead
				// entree.value = comptRead
				comptRead += 1
			}
		})
	}
	// POUR UNE RAISON MATHEMATIQUE INCOMPREHENSIBLE, JE NE DOIS PAS FAIRE LA MEME CHOSE POUR L'AUTRE MOITIE. CELLE CI DOIT ETRE INCREMENTEE PAR LIGNE. JE SORS DONC DE LA BOUCLE for
	inputTabMulti.forEach(entree => {
		// SI L'ELEMENT EST EN readOnly ET NE POSSEDE PAS LA CLASSE someClass (NE FAIT PAS PARTI DES "1")
		if (entree.disabled && !entree.classList.contains('someClass')) {
			entree.id += '_readOnly_' + comptReadOnly
			// entree.value = comptReadOnly
			comptReadOnly+= 1
		}
	})
}

function calculIndices(tabColumnFinal, inputTabMulti){
	//------------ CALCUL DU RI
	let meanOfEigenValue = ((2.7699*nbrClass.value)-4.3513)
	let ri = (meanOfEigenValue - nbrClass.value) / (nbrClass.value-1)
	document.getElementById("ri").innerHTML = ri.toFixed(2)

	//------------ CALCUL DE LA VALEUR PROPRE MAXIMALE DE CHAQUE FACTEUR DANS LE TABLEAU DE LA MATRICE
	tabColumn = []
	tabValue = []
	let tabMean = []
	let numColumn = 0

	tabColumnFinal.forEach(entree => {
		// CONVERTIR LE TABLEAU EN NUMERIC
		entree = entree.map(x => Number.parseFloat(x, 2))
		// CALCULER LA SOMME DU TABLEAU
		let sommeTableau = sumArray(entree)
		// CALCULER LA MOYENNE DU TABLEAU
		entree.forEach(value => {
			tabColumn.push(numColumn)
			tabValue.push(value / sommeTableau)
		})
		numColumn += 1
	})
	
	// JE RECUPERE UN TABLEAU A DOUBLE DIMENSION QUI CONPORTE CHAQUE VALEUR DIVISE PAR LA SOMME DE LA COLONNE (PREMIERE PARTIE DU TABLEAU A DROITE DE L'EXCEL)
	let tabCritere = convertToDoubleDimension(tabColumn, tabValue);

	// POUR LA SUITE, JE PREPARE UNE LIGNE POUR CALCULER LA MOYENNE D'UN TABLEAU
	let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
	// --CALCUL DE "PRIORITE" : JE VAIS AVOIR BESOIN DE RECUPERER LA PREMIERE VALEUR DE CHAQUE TABLEAU. J'UTILISE DONC UNE BOUCLE FOR
	for (var i = 0; i < nbrClass.value; i++) {
		// CHAQUE FOIS QUE JE RECOMMENCE UNE BOUCLE, JE VIDE LE TABLEAU QUI CONTIENDRA LA PREMIERE VALEUR DE CHAQUE TABLEAU
		let tabFirstElement = []
		tabCritere.forEach(entree => {
			tabFirstElement.push(entree[i])
		})
		// J'AJOUTE AU TABLEAU tabMean LA MOYENNE DES PREMIERES VALEURS DE CHAQUE TABLEAU
		tabMean.push(average(tabFirstElement));
		console.log(tabMean);
	}

	// --CALCUL DE "SOMME PONDEREE PAR LES PRIORITE". MEME PRINCIPE, MAIS AVEC LE TABLEAU DES INPUT, COLONNE PAR COLONNE
	let sommePonderee = []
	// JE REPETE PAR LE NOMBRE DE FOIS QU'IL Y A DE CRITERES
	for (var i = 0; i < nbrClass.value; i++) {
		let valeur = 0
		let tabFirstElement = []
		// JE PARCOURS CHAQUE ELEMENTS DE TABLEAU DES ENTREES POUR NE GARDER QUE LES PREMIERES VALEURS
		tabColumnFinal.forEach(entree => {
			tabFirstElement.push(entree[i])
		})
		for (var j = 0; j < nbrClass.value; j++) {
			valeur += (tabFirstElement[j] * tabMean[j])
		}
		sommePonderee.push(valeur)
	}

	// --CALCUL DE "SOMME PONDEREE DIVISEE PAR LA PRIORITE". BEAUCOUP PLUS FACILE CETTE FOIS :)
	let sommePondereeSurPriorite = []
	// JE REPETE PAR LE NOMBRE DE FOIS QU'IL Y A DE CRITERES
	for (var i = 0; i < nbrClass.value; i++) {
		sommePondereeSurPriorite.push(sommePonderee[i] / tabMean[i])
	}
	// AFFICHER L'ELEMENT
	let coherenceMoyenne = average(sommePondereeSurPriorite)
	document.getElementById("valeurPropre").innerHTML = coherenceMoyenne.toFixed(2)

	//------------ CALCUL ET AFFICHAGE DE L'INDICE DE COHERENCE (CI)
	let indiceDeCoherence = (coherenceMoyenne - nbrClass.value) / (nbrClass.value - 1)
	document.getElementById("ci").innerHTML = indiceDeCoherence.toFixed(2)

	//------------ CALCUL ET AFFICHAGE DU RATIO DE COHERENCE (CR)
	let ratioDeCoherence = indiceDeCoherence / ri
	document.getElementById("cr").innerHTML = (ratioDeCoherence * 100).toFixed(2) + ' %'
	if ((ratioDeCoherence * 100) < 10) {
		document.getElementById("cr").style.backgroundColor = '#3EDB00'
		document.getElementById("alerteCr").style.visibility = 'hidden'
	}
	if ((ratioDeCoherence * 100) >= 10) {
		document.getElementById("cr").style.backgroundColor = '#BC0000'
		document.getElementById("alerteCr").style.visibility = 'visible'
	}

}

function entreNbrClasses(nbrClasses){
	let nbrClass = nbrClasses;
	(parseInt(nbrClass.value) < 3 || nbrClass.value.length === 0) ? termine() : action();
}

function termine(){
	titre.forEach(entree => entree.style.visibility = 'hidden')
	document.getElementById('conteneurTotal').style.visibility = 'hidden';
	(parseInt(nbrClass.value) < 3) ? document.getElementById('alerteNbrCritere').style.visibility = 'visible' : "";
	document.getElementById("conteneurInfos").style.visibility = 'hidden'
	document.getElementById("alerteCr").style.visibility = 'hidden'
	document.getElementById("alerteChamps").style.display = 'none'
	document.getElementsByClassName("titre")[2].style.visibility = 'hidden'
}

function action(){
	document.getElementById('conteneurTotal').style.visibility = 'visible';
	titre.forEach(entree => entree.style.visibility = 'visible')
	document.getElementById('alerteNbrCritere').style.visibility = 'hidden';
	let tableString = "<table id='tabMulti'>";
	// ICI, RAJOUTER UN "th" VIDE POUR CREER SIMPLEMENT LES ENTETE VERTICAUX ET HORIZONTAUX
	let tableHead = "<thead><tr><th></th>"
	let ligneTableHead = ""
	let ligne = ""
	let inputEnTete = "";

	let comptCell = 0

	for (var i = 0; i < nbrClass.value; i++) {
		let comptCol = 1
		inputEnTete += `<div class="conteneurInput"><label for="nbrClass">Nom critère ${(i<9) ? ('0' + (i + 1)) : (i + 1)}</label><input type="text" name="nbrClass" class="entreeEnTete" id="input${i}"></div>`
		ligneTableHead += `<th><div class='enTete'>Critère ${(i<9) ? ('0' + (i + 1)) : (i + 1)}</div></th>`
		ligne += `<tr><th><div class='enTete'>Critère ${(i<9) ? ('0' + (i + 1)) : (i + 1)}</div></th>`
		for (var j = 0; j < nbrClass.value; j++) {
			// ligne += `<td><input type="number" id="col_${comptCol}" class="inputCell" value='${comptCell}'></td>`
			// ICI, ON AJOUTE DES INFORMATIONS A CHAQUE INPUT SEPARE PAR DES "_" : NUMERO DE LA COLONNE, NUMERO GENERAL DE L'INPUT, S'IL EST MODIFIABLE OU PAS, ET SON NUMERO D'INPUT RELATIF A SA COLONNE
			// ligne += `<td><input id="col_${comptCol}_idGeneral_${comptCell}" class="inputCell" for="liste"></td>`
			ligne += 	`<td><select id="col_${comptCol}_idGeneral_${comptCell}" class="inputCell" name="" id="liste">
							<option value="Pas_un_nombre"></option>
							<optgroup label="Normal">
								<option value="1">9</option>
								<option value="2">8</option>
								<option value="3">7</option>
								<option value="4">6</option>
								<option value="5">5</option>
								<option value="6">4</option>
								<option value="7">3</option>
								<option value="8">2</option>
								<option value="9">1</option>
							</optgroup>
							<optgroup label="Inverse">
								<option value="10">1/9</option>
								<option value="11">1/8</option>
								<option value="12">1/7</option>
								<option value="13">1/6</option>
								<option value="14">1/5</option>
								<option value="15">1/4</option>
								<option value="16">1/3</option>
								<option value="17">1/2</option>
							</optgroup>
						</select></td>`
			comptCol+=1
			comptCell+=1
		}
		ligne += "</tr>"
	}
	ligneTableHead += '</thead>'
	tableHead += ligneTableHead
	tableHead += "</tr>"
	tableString += tableHead
	tableString += ligne
	tableString += "</table>";
	tableString += "<p id='alerteChamps' class='avertissement'>*Veuillez remplir tous les champs pour continuer</p>";

	conteneurEnTete.innerHTML = inputEnTete;
	conteneurMulti.innerHTML = tableString;

	let inputTabMulti = document.querySelectorAll('#tabMulti td select');

	readOnlyCell(inputTabMulti)
	reordonneArray(inputTabMulti)

	let inputTabEnTete = document.querySelectorAll(".entreeEnTete")
	let tabEnTete = document.querySelectorAll("th")
	inputTabEnTete.forEach(inputTete => inputTete.addEventListener("input", () =>{
		let comptPosition = 0
		let numeroEnTete = parseInt(inputTete.id.substring(5,70)) + 1
		tabEnTete.forEach(tabTete => {
			if ((comptPosition === numeroEnTete) || (comptPosition === parseInt(nbrClass.value) + numeroEnTete)) {
				tabTete.innerHTML = inputTete.value
			}
			comptPosition +=1;
		})
	}))

	let comptEntree = 0;
	let tabId = []

	let elementReadOnly = document.querySelectorAll("select[disabled]")

	inputTabMulti.forEach(entree => entree.addEventListener("change", () =>{
		let id_input = parseInt(entree.id.split('_')[5])
		// console.log("id_input : " + id_input);
		let nbCol = parseInt(entree.id.split('_')[1])

		// SI L'INPUT N'EST PAS VIDE, N'EST PAS PRESENTE DANS LE TABLEAU DES IDENTIFIANTS, ET EST UN NOMBRE
		if ((entree.value !== '') && (tabId.indexOf(id_input) === -1) && !isNaN(entree.value)) {
			comptEntree +=1
			tabId.push(id_input)
		}

		// SI J'ENLEVE UN ELEMENT : L'INPUT NE DOIT PAS ETRE UN NOMBRE, ET DOIT ETRE DEJA PRESENT DANS tabId. CE PARAMETRE PERMET D'EVITER DE CUMULER LES DECREMENTATION DE comptEntree
		else if (isNaN(entree.value) && (tabId.indexOf(id_input) !== -1)) {
			// JE RETIRE 1 A comptEntree
			comptEntree -=1
			// JE RETIRE L'IDENTFIANT DE L'INPUT CIBLE DU TABLEAU AVEC UNE FONCTION QUE J'AI ECRITE EN HAUT
			tabId.remove(id_input);
		}

		// POUR UNE RAISON INDETERMINEE, JE N'ARRIVE PAS A FAIRE UN FOREACH SUR elementReadOnly. J'AI L'ERRREUR "forEach N'EST PAS UNE FONCTION"
		// JE PARCOURS CHAQUE ELEMENT DE elementReadOnly. S'IL Y A UNE CORRESPONDANCE ENTRE L'IDENTIFIANT DE L'ENTREE ET DU TABLEAU, JE MARQUE LA MEME VALEUR
		for (var i = 0; i < elementReadOnly.length; i++) {
			if (parseInt(elementReadOnly[i].id.split('_')[5]) === id_input) {
				// elementReadOnly[i].value = (1 / entree.value).toFixed(2)
				elementReadOnly[i].selectedIndex = convertValueToInverse(parseInt(entree.value))
			}
		}

		// SI TOUS LES INPUT EDITABLES NE SONT ENTRES....
		if (comptEntree < ((nbrClass.value * nbrClass.value - nbrClass.value) / 2)) {
			// document.getElementById("alerteChamps").style.display = 'block'
			// document.getElementById("conteneurInfos").style.visibility = 'hidden'
			// document.getElementById("alerteCr").style.visibility = 'hidden'
			// document.getElementsByClassName("titre")[2].style.visibility = 'hidden'
		}

		// SI TOUS LES INPUT EDITABLES SONT ENTRES...
		if (comptEntree === ((nbrClass.value * nbrClass.value - nbrClass.value) / 2)) {
			getColumnValues(inputTabMulti)
			// document.getElementById("alerteChamps").style.display = 'none'
			// document.getElementById("conteneurInfos").style.visibility = 'visible'
			// document.getElementsByClassName("titre")[2].style.visibility = 'visible'
		}
	}))
}

