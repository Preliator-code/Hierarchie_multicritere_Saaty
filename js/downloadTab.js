let csv;

function convertCsv(){
	// CONVERTIR L'OBJET EN TABLEAU DE TABLEAUX
	const data = jsonCompoFinale.map(obj => [
        obj.numeroCompo,
        obj.compositionPersonnes,
        obj.scoreEquipe
    ]);

    // CREER MES CHAMPS
	const fields = ['Numero_Compo', 'Personnes', 'Score_equipe'];

	// CREER UN OBJET CONFIG AVEC TOUTE LES CONFIGURATIONS POSSIBLES
	let config = {
		quotes: false, //or array of booleans
		quoteChar: '"',
		escapeChar: '"',
		delimiter: ";",
		header: true,
		newline: "\r\n",
		skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
		columns: null //or array of strings
	}

	// CREER LE CSV
	csv = Papa.unparse({
        data,
        fields
    }, config);
}

function exportCSV(){
	// CONVERTIR LE CSV EN OBJET "blob JS"
	const blob = new Blob([csv]);

	// CREER UNE BALISE DE LIEN HYPERTEXTE POUR L'OBJET blob 
    const a = document.createElement('a');
	a.href = URL.createObjectURL(blob, { type: 'text/plain' });

	// DONNER UN NOM AU CSV
	a.download = 'Optimisation_des_groupes.csv';

	// GENERER LE CLIC SUR LE LIEN. JE DOIS AJOUTER LA BALISE AU DOM, SIMULER LE CLIC, ET SUPPRIMER LA BALISE HYPERLIEN DU DOM
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}