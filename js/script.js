// RECUPERER LES DIV DE MA PAGE POUR POUVOIR LES AFFICHER/CACHER
let conteneurAllWithoutCritere = document.getElementsByClassName("conteneur")
// CONVERTIR EN LISTE
conteneurAllWithoutCritere = Array.prototype.slice.call(conteneurAllWithoutCritere)
// ENLEVER LA DIV QUI AFFICHE LE NOMBRE DE CRITERE (PAS NECESSAIRE DE CACHER/AFFICHER CELLE CI)
conteneurAllWithoutCritere.shift()

let conteneurEnTete = document.getElementById('conteneurTabEnTete');

let conteneurMulti = document.getElementById('conteneurTabMulti');

let conteneurTablePoids = document.getElementById('conteneurTablePoids').innerHTML;

let titre = Array.prototype.slice.call(document.getElementsByTagName('h2'))
titre.pop()

let inputTabMulti;

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
	calculIndices(convertToDoubleDimension(tabColumn, tabValue), inputTabMulti)
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
	fillTabWeight(tabMean)
}

function entreNbrClasses(nbrClasses){
	let nbrClass = nbrClasses;
	(parseInt(nbrClass.value) < 3 || nbrClass.value.length === 0) ? termine() : action();
}

function termine(){
	(parseInt(nbrClass.value) < 3) ? document.getElementById('alerteNbrCritere').style.visibility = 'visible' : "";
	conteneurAllWithoutCritere.forEach(entree => entree.style.visibility = 'hidden')
	document.getElementById("alerteCr").style.display = 'none'
}

function action(){
	// J'AFFICHE LA DIV D'ENTREE DU NOM DES ENTETES, ET CELLE QUI CONTIENT LA MATRICE.
	conteneurAllWithoutCritere[0].style.visibility = 'visible'
	conteneurAllWithoutCritere[1].style.visibility = 'visible'
	document.getElementById('alerteNbrCritere').style.visibility = 'hidden';

	// JE CREE LA MATRICE ET PREPARE LE TABLEAU DE POIDS, POUR POUVOIR MODIFIER EN TEMPS REEL LE NOM DES CRITERES EN MEME TEMPS QUE CEUX DE LA MATRICE
	prepareTabMulti();
	prepareTabWeight();

	// JE DONNE LA POSSIBILITE D'ENTRER LE NOM DE CHAQUE CRITERE AVEC UN EVENEMENT DE TYPE "input"
	setHeader(document.querySelectorAll(".entreeEnTete"), document.querySelectorAll("#tabMulti th"), document.querySelectorAll("#tabPoids .enTete"))

	controlMain()
}

