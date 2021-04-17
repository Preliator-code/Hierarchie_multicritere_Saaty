// RECUPERER LES DIV DE MA PAGE POUR POUVOIR LES AFFICHER/CACHER
let conteneurAllWithoutCritere = document.getElementsByClassName("conteneur")

// CONVERTIR EN LISTE
conteneurAllWithoutCritere = Array.prototype.slice.call(conteneurAllWithoutCritere)

// ENLEVER LA DIV QUI AFFICHE LE NOMBRE DE CRITERES (PAS NECESSAIRE DE CACHER/AFFICHER CELLE CI)
conteneurAllWithoutCritere.shift()

// JE SELECTIONNE LES AUTRES DIV
let conteneurEnTete = document.getElementById('conteneurTabEnTete');
let conteneurMulti = document.getElementById('conteneurTabMulti');
let conteneurTablePoids = document.getElementById('conteneurTablePoids').innerHTML;
let inputTabMulti;

// LE NOMBRE DE CLASSES ENTRE EST INFERIEUR A 3 ? JE LANCE L'UNE OU L'AUTRE FONCTION
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

	// JE CREE LA MATRICE ET PREPARE LE TABLEAU DE POIDS POUR POUVOIR MODIFIER EN TEMPS REEL LE NOM DES CRITERES EN MEME TEMPS QUE CEUX DE LA MATRICE
	prepareTabMulti();
	prepareTabWeight();

	// JE DONNE LA POSSIBILITE D'ENTRER LE NOM DE CHAQUE CRITERE AVEC UN EVENEMENT DE TYPE "input"
	setHeader(document.querySelectorAll(".entreeEnTete"), document.querySelectorAll("#tabMulti th"), document.querySelectorAll("#tabPoids .enTete"))

	// JE LANCE LA FONCTION QUI CONTROLE GENERALEMENT LES TABLEAUX
	controlMain()
}