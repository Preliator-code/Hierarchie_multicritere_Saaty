function controlMain(){
	let comptEntree = 0;
	let tabId = []
	let elementReadOnly = document.querySelectorAll("select[disabled]")

	inputTabMulti.forEach(entree => entree.addEventListener("change", () =>{
		let id_input = parseInt(entree.id.split('_')[5])
		let nbCol = parseInt(entree.id.split('_')[1])

		// SI L'INPUT N'EST PAS VIDE, N'EST PAS PRESENTE DANS LE TABLEAU DES IDENTIFIANTS, ET EST UN NOMBRE
		if ((inputEntree.value !== '') && (tabIdInputEntree.indexOf(idInputEntree) === -1) && !isNaN(inputEntree.value)) {
			comptEntree +=1
			tabIdInputEntree.push(idInputEntree)
		}

		// SI J'ENLEVE UN ELEMENT : L'INPUT NE DOIT PAS ETRE UN NOMBRE, ET DOIT ETRE DEJA PRESENT DANS tabId. CE PARAMETRE PERMET D'EVITER DE CUMULER LES DECREMENTATION DE comptEntree
		else if (isNaN(inputEntree.value) && (tabIdInputEntree.indexOf(idInputEntree) !== -1)) {
			// JE RETIRE 1 A comptEntree
			comptEntree -=1
			// JE RETIRE L'IDENTFIANT DE L'INPUT CIBLE DU TABLEAU AVEC UNE FONCTION QUE J'AI ECRITE EN HAUT
			tabIdInputEntree.remove(idInputEntree);
		}

		// JE PARCOURS CHAQUE ELEMENT DE elementReadOnly. S'IL Y A UNE CORRESPONDANCE ENTRE L'IDENTIFIANT DE L'ENTREE ET DU TABLEAU, JE MARQUE LA MEME VALEUR
		for (var i = 0; i < elementReadOnly.length; i++) {
			if (parseInt(elementReadOnly[i].id.split('_')[5]) === id_input) {
				// elementReadOnly[i].value = (1 / entree.value).toFixed(2)
				elementReadOnly[i].selectedIndex = convertValueToInverse(parseInt(entree.value))
			}
		}

		// SI TOUS LES INPUT EDITABLES NE SONT ENTRES....
		if (comptEntree < ((nbrClass.value * nbrClass.value - nbrClass.value) / 2)) {
			conteneurAllWithoutCritere[2].style.visibility = 'hidden'
			conteneurAllWithoutCritere[3].style.visibility = 'hidden'
			document.getElementById("alerteChamps").style.display = 'block'
			document.getElementById("alerteCr").style.display = 'none'
		}

		// SI TOUS LES INPUT EDITABLES SONT ENTRES...
		if (comptEntree === ((nbrClass.value * nbrClass.value - nbrClass.value) / 2)) {
			getColumnValues(inputTabMulti)
			document.getElementById("alerteChamps").style.display = 'none'
			document.getElementById("alerteCr").style.display = 'block'
			conteneurAllWithoutCritere[2].style.visibility = 'visible'
			conteneurAllWithoutCritere[3].style.visibility = 'visible'
			// document.getElementById("conteneurInfos").style.visibility = 'visible'
			// document.getElementsByClassName("titre")[2].style.visibility = 'visible'
		}
	}))
}

// function controlInput(inputEntree, idInputEntree, tabIdInputEntree, comptEntree){
// 	// SI L'INPUT N'EST PAS VIDE, N'EST PAS PRESENTE DANS LE TABLEAU DES IDENTIFIANTS, ET EST UN NOMBRE
// 	if ((inputEntree.value !== '') && (tabIdInputEntree.indexOf(idInputEntree) === -1) && !isNaN(inputEntree.value)) {
// 		comptEntree +=1
// 		tabIdInputEntree.push(idInputEntree)
// 	}

// 	// SI J'ENLEVE UN ELEMENT : L'INPUT NE DOIT PAS ETRE UN NOMBRE, ET DOIT ETRE DEJA PRESENT DANS tabId. CE PARAMETRE PERMET D'EVITER DE CUMULER LES DECREMENTATION DE comptEntree
// 	else if (isNaN(inputEntree.value) && (tabIdInputEntree.indexOf(idInputEntree) !== -1)) {
// 		// JE RETIRE 1 A comptEntree
// 		comptEntree -=1
// 		// JE RETIRE L'IDENTFIANT DE L'INPUT CIBLE DU TABLEAU AVEC UNE FONCTION QUE J'AI ECRITE EN HAUT
// 		tabIdInputEntree.remove(idInputEntree);
// 	}
// }

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