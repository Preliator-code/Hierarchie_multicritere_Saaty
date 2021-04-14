function controlMain(){
	let comptEntree = 0;
	let tabId = []
	let elementReadOnly = document.querySelectorAll("select[disabled]")

	inputTabMulti.forEach(entree => entree.addEventListener("change", () =>{
		let id_input = parseInt(entree.id.split('_')[5])
		let nbCol = parseInt(entree.id.split('_')[1])

		controlInput(entree, id_input, tabId, comptEntree)

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

function controlInput(inputEntree, idInputEntree, tabIdInputEntree, comptEntree){
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
}




// inputTabMulti = returnInputTabMulti()
// console.log(inputTabMulti);



