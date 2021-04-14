function setHeader(inputTabEnTete, tabEnTeteMulti, tabEnTetePoids){
	inputTabEnTete.forEach(inputTete => inputTete.addEventListener("input", () =>{
		let comptPositionMulti = 0
		let comptPositionPoids = 1
		let numeroEnTete = parseInt(inputTete.id.substring(5,70)) + 1
		tabEnTeteMulti.forEach(tabTete => {
			// S'IL Y A CORRESPONDANCE ENTRE L'IDENTIFIANT COUPE DE L'INPUT D'EN TETE ET LA VARIABLE INCREMENTEE
			if ((comptPositionMulti === numeroEnTete) || (comptPositionMulti === parseInt(nbrClass.value) + numeroEnTete)) {
				// SI L'INPUT D'EN TETE EST VIDE, JE REPLACE LA VALEUR PAR DEFAUT
				if (inputTete.value.length === 0) {
					tabTete.innerHTML = `Critère ${((numeroEnTete - 1) < 9) ? ('0' + (numeroEnTete)) : numeroEnTete}`
				}
				// SINON, JE PLACE CE QUE ECRIS L'UTILISATEUR
				else{
					tabTete.innerHTML = inputTete.value
				}
			}
			// J'INCREMENTE LA VARIABLE POUR POUVOIR PARCOURIR L'ENSEMBLE DES ENTETES
			comptPositionMulti += 1
		})
		tabEnTetePoids.forEach(tabTete => {
			// S'IL Y A CORRESPONDANCE ENTRE L'IDENTIFIANT COUPE DE L'INPUT D'EN TETE ET LA VARIABLE INCREMENTEE
			if ((comptPositionPoids === numeroEnTete) || (comptPositionPoids === parseInt(nbrClass.value) + numeroEnTete)) {
				// SI L'INPUT D'EN TETE EST VIDE, JE REPLACE LA VALEUR PAR DEFAUT
				if (inputTete.value.length === 0) {
					tabTete.innerHTML = `Critère ${((numeroEnTete - 1) < 9) ? ('0' + (numeroEnTete)) : numeroEnTete}`
				}
				// SINON, JE PLACE CE QUE ECRIS L'UTILISATEUR
				else{
					tabTete.innerHTML = inputTete.value
				}
			}
			// J'INCREMENTE LA VARIABLE POUR POUVOIR PARCOURIR L'ENSEMBLE DES ENTETES
			comptPositionPoids += 1
		})
	}))
}