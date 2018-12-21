/********************************************************
 ************************ PATRICK ***********************
 ************************ CAMILLE ***********************
 ********************************************************/

function debutJeu() {
    // Saisie du Pseudo
    localStorage.setItem('pseudo' , '');
    while (localStorage.pseudo == '') {
        localStorage.pseudo = window.prompt('Entrez votre pseudo', 'Humain');
    }

    // Saisie du montant de la cagnotte
    localStorage.setItem('cagnotte', 0);
    while (localStorage.cagnotte < 100){
        localStorage.cagnotte = window.prompt('Entrez votre cagnotte' ,100);
        }
    self.location.href = 'jeu.html';
}

// Definition zone de clic
toucheJouer = document.getElementById('boutonJouer');
toucheJouer.addEventListener('click', debutJeu);
