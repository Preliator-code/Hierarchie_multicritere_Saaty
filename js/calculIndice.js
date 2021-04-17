function calculIndices(tabColumnFinal, inputTabMulti){
	let meanOfEigenValue;
	let ri;
	let tabMean = []
	let numColumn = 0
	tabColumn = []
	tabValue = []
	let sommeTableau

	//------------ CALCUL DU RI
	ri = calculRi()

	//------------ CALCUL DE LA VALEUR PROPRE MAXIMALE DE CHAQUE FACTEUR DANS LE TABLEAU DE LA MATRICE
	calculValeurPropreMax(tabColumnFinal, numColumn)
	
	// JE RECUPERE UN TABLEAU A DOUBLE DIMENSION QUI CONPORTE CHAQUE VALEUR DIVISE PAR LA SOMME DE LA COLONNE (PREMIERE PARTIE DU TABLEAU A DROITE DE L'EXCEL)
	let tabCritere = convertToDoubleDimension(tabColumn, tabValue);

	// POUR LA SUITE, JE PREPARE UNE LIGNE POUR CALCULER LA MOYENNE D'UN TABLEAU
	let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

	//------------ CALCUL DE "PRIORITE" : JE VAIS AVOIR BESOIN DE RECUPERER LA PREMIERE VALEUR DE CHAQUE TABLEAU. J'UTILISE DONC UNE BOUCLE FOR
	tabMean = priorityTab(tabCritere, average, tabMean)

	//------------ CALCUL DE "SOMME PONDEREE PAR LES PRIORITE". MEME PRINCIPE, MAIS AVEC LE TABLEAU DES INPUT, COLONNE PAR COLONNE
	let sommePonderee = priorityWeightedSum(tabColumnFinal, tabMean)

	//------------ CALCUL DE "SOMME PONDEREE DIVISEE PAR LA PRIORITE". BEAUCOUP PLUS FACILE CETTE FOIS :)
	let sommePondereeSurPriorite = weightedSumDividedByPriority(sommePonderee, tabMean)
	
	// AFFICHER L'ELEMENT
	let coherenceMoyenne = average(sommePondereeSurPriorite)
	document.getElementById("valeurPropre").innerHTML = coherenceMoyenne.toFixed(2)

	//------------ CALCUL ET AFFICHAGE DE L'INDICE DE COHERENCE (CI)
	let indiceDeCoherence = (coherenceMoyenne - nbrClass.value) / (nbrClass.value - 1)
	document.getElementById("ci").innerHTML = indiceDeCoherence.toFixed(2)

	//------------ CALCUL ET AFFICHAGE DU RATIO DE COHERENCE (CR)
	let ratioDeCoherence = indiceDeCoherence / ri
	document.getElementById("cr").innerHTML = (ratioDeCoherence * 100).toFixed(2) + ' %';

	((ratioDeCoherence * 100) < 10) ? significatifRi() : nonSignificatifRi()
	fillTabWeight(tabMean)
}

function calculRi(){
	meanOfEigenValue = ((2.7699*nbrClass.value)-4.3513)
	ri = (meanOfEigenValue - nbrClass.value) / (nbrClass.value-1)
	document.getElementById("ri").innerHTML = ri.toFixed(2)
	return ri
}

function calculValeurPropreMax(tabColumnFinal, numColumn){
	tabColumnFinal.forEach(entree => {
		// CONVERTIR LE TABLEAU EN NUMERIC
		entree = entree.map(x => Number.parseFloat(x, 2))
		// CALCULER LA SOMME DU TABLEAU
		sommeTableau = sumArray(entree)
		// CALCULER LA MOYENNE DU TABLEAU
		entree.forEach(value => {
			tabColumn.push(numColumn)
			tabValue.push(value / sommeTableau)
		})
		numColumn += 1
	})
}

function priorityTab(tabCritere, average, tabMean){
	for (var i = 0; i < nbrClass.value; i++) {
		// CHAQUE FOIS QUE JE RECOMMENCE UNE BOUCLE, JE VIDE LE TABLEAU QUI CONTIENDRA LA PREMIERE VALEUR DE CHAQUE TABLEAU
		let tabFirstElement = []
		tabCritere.forEach(entree => {
			tabFirstElement.push(entree[i])
		})
		// J'AJOUTE AU TABLEAU tabMean LA MOYENNE DES PREMIERES VALEURS DE CHAQUE TABLEAU
		tabMean.push(average(tabFirstElement));
	}
	return tabMean
}

function priorityWeightedSum(tabColumnFinal, tabMean){
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
	return sommePonderee
}

function weightedSumDividedByPriority(sommePonderee, tabMean){
	let sommePondereeSurPriorite = []
	for (var i = 0; i < nbrClass.value; i++) {
		sommePondereeSurPriorite.push(sommePonderee[i] / tabMean[i])
	}
	return sommePondereeSurPriorite
}

function significatifRi(){
	document.getElementById("cr").style.backgroundColor = '#3EDB00'
	document.getElementById("alerteCr").style.visibility = 'hidden'
	document.querySelector("#conteneurTablePoids table").style.backgroundColor = '#3FCF00'
}

function nonSignificatifRi(){
	document.getElementById("cr").style.backgroundColor = '#BC0000'
	document.getElementById("alerteCr").style.visibility = 'visible'
	document.querySelector("#conteneurTablePoids table").style.backgroundColor = '#FF5252'
}