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

// FONCTION POUR FAIRE LA SOMME D'UN TABLEAU
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

// FONCTION POUR ENLEVER LES VALEURS VIDES D'UN TABLEAU
function removeEmptyValues(tab){
	for (var i = 0; i < (tab.length); i++) {
		tab[i] = tab[i].filter(n => n)
	}
	return tab
}

// FONCTION POUR CONVERTIR 2 TABLEAUX EN 1 TABLEAU A DOUBLE DIMENSIONS
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
	return removeEmptyValues(tabColumnValue)
}


function convertValueToInverse(entree){
	switch (entree) {
		case 1:
			return 10
			break;
		case 2:
			return 11
			break;
		case 3:
			return 12
			break;
		case 4:
			return 13
			break;
		case 5:
			return 14
			break;
		case 6:
			return 15
			break;
		case 7:
			return 16
			break;
		case 8:
			return 17
			break;
		case 9:
			return 9
			break;
		case 10:
			return 1
			break;
		case 11:
			return 2
			break;
		case 12:
			return 3
			break;
		case 13:
			return 4
			break;
		case 14:
			return 5
			break;
		case 15:
			return 6
			break;
		case 16:
			return 7
			break;
		case 17:
			return 8
			break;
	}
}


function convertValueToReal(entree){
	switch (entree) {
		case 1:
			return 9
			break;
		case 2:
			return 8
			break;
		case 3:
			return 7
			break;
		case 4:
			return 6
			break;
		case 5:
			return 5
			break;
		case 6:
			return 4
			break;
		case 7:
			return 3
			break;
		case 8:
			return 2
			break;
		case 9:
			return 1
			break;
		case 10:
			return 1/9
			break;
		case 11:
			return 1/8
			break;
		case 12:
			return 1/7
			break;
		case 13:
			return 1/6
			break;
		case 14:
			return 1/5
			break;
		case 15:
			return 1/4
			break;
		case 16:
			return 1/3
			break;
		case 17:
			return 1/2
			break;
	}
}