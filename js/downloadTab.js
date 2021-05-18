let csv;

function convertCsv(){
	// CONVERTIR L'OBJET EN TABLEAU DE TABLEAUX
	const data = toExportObject.map(obj => [
        obj.critName,
        obj.weightCrit,
    ]);

    // CREER MES CHAMPS
	const fields = ['Nom_Criteres', 'Poids'];

	// CREER UN OBJET CONFIG AVEC TOUTE LES CONFIGURATIONS POSSIBLES
	let config = {
		quotes: false, //or array of booleans
		quoteChar: '"',
		escapeChar: '"',
		delimiter: ";",
		header: true,
		encoding: "UTF-8",
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
	convertCsv()

	// CONVERTIR LE CSV EN OBJET "blob JS"
	const blob = new Blob([csv]);

	// CREER UNE BALISE DE LIEN HYPERTEXTE POUR L'OBJET blob 
    const a = document.createElement('a');
	a.href = URL.createObjectURL(blob, { type: 'text/plain' });

	// DONNER UN NOM AU CSV
	a.download = 'Criteres_et_poids.csv';

	// GENERER LE CLIC SUR LE LIEN. JE DOIS AJOUTER LA BALISE AU DOM, SIMULER LE CLIC, ET SUPPRIMER LA BALISE HYPERLIEN DU DOM
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}