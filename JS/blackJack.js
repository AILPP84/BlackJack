// Liaison des boutons avec les variables JS
let split = document.querySelector("#split");
let double = document.querySelector("#double");
let carte = document.querySelector("#carte");
let passe = document.querySelector("#passe");
let mise10 = document.querySelector("#mise10");
let mise20 = document.querySelector("#mise20");
let mise50 = document.querySelector("#mise50");
let mise100 = document.querySelector("#mise100");
let demarrer = document.querySelector("#valider");
let rejouer = document.querySelector("#rejouer");
let messFin = document.querySelector("#messageFin");
let messFinJ1 = document.querySelector("#messFinJeu1");
let messFinJ2 = document.querySelector("#messFinJeu2");
let cagnotte = document.querySelector("#cagnotte");
let mise1 = document.querySelector("#mise1");
let mise2 = document.querySelector("#mise2");
let annulerMise = document.querySelector("#annuler");
let selectionJeu1 = document.querySelector("#jeu1Joueur");
let selectionJeu2 = document.querySelector("#jeu2Joueur");
let zoneJeu = document.querySelector(".joueur");
let zoneJeu1 = document.querySelector(".joueur1");
let zoneJeu2 = document.querySelector(".joueur2");

let couleurs = ["d", "s", "h", "c"];
let valeurs = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
// let valeurs = ["10", "10", "10", "4", "6", "6", "8", "8", "10", "10", "Q", "Q", "A"];
let poids = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
let niveauPaquet = 0; //varirable intermédiaire pour gérer l'indice du paquet
let indicePaquet = 0; //variable pour mémoriser la place dans le paquet
let jeuAAfficher = "";
let jeuDouble = false;
let messageFin = "";
let indice = 0;
let splitMise = 0;
let memoriseGagnant = "";
let jeuEnCours = 0;
let finTour = false;
let blagues = ["Deux volcans discutent :<br>" + "Mais dis-moi, t'aurais pas arrêté de fumer ?",
    " Comment appelle t-on une fleur qui prend sa graine à moitié ?<br>" + "Une migraine.",
    "Quelles sont les lettres qui sont toujours aux toilettes: <br>" + "Ce sont les lettres WC et PQ",
    "J'ai cru que Mozart était mort mais mozzarella",
    "Banane commence par un B mais normalement ça commence par un N<br>" + "(Normalement commence par un N)",
    "Un volcan déménage à côté d'une colline et lui demande : <br>" + "ça te dérange pas si je fume?",
    "Qu'est ce qui pleure quand ont lui tourne la tête ?<br>" + "Un robinet ",
    "Quel est le comble pour un professeur de musique ?<br>" + "Mettre des mauvaises notes",
    "Des oeufs sont rangés dans un frigo. Un oeuf demande à son partenaire :<br>" + "- Mais pourquoi as-tu des poils ?<br>" +
    "- Parce-que je suis un kiwi connard !",
    "Ce matin, j'ai voulu faire une blague sur le Super U, mais elle n'a pas Supermarché !",
    "Un petit nuage se promène avec sa maman dans le ciel.<br>" +
    "Tout à coup, il s'arrête en se tortillant :\n" + "- J'ai envie de faire pluie-pluie, maman !",
    "Que dit un chien quand il cherche quelque chose et qu'il ne trouve pas ?<br>" + "Je suis tombé sur un os.",
    "Quel super héros donne le plus vite l'heure ?<br>" + "Speed heure man ! ( spider man )",
    "Quelles sont les lettres qui se voient le moins ?<br>" + "FAC (effacer)",
    "Quelle sont les lettres qui bougent tout le temps ?<br>" + "AJT (agiter)",
    "Qui du marin ou de l'aviateur écrit le moins ?<br>" + "Réponse : le marin car il a jeté l'ancre !",
];


/*Création du paquet de cartes - chaque carte a un poids (pour le calcul des points), une couleur (pique coeur
trèfle ou carreau), une valeur (2,3,4.. J, Q,K et A) pour gérer le double/split et l'affichage des cartes
et le fichier gif associé */


class Carte {
    constructor(poids, valeur, couleur, gif, dos) {
        this.poids = poids;
        this.valeur = valeur;
        this.couleur = couleur;
        this.gif = gif;
        this.dos = dos;
    }
};
let k = 0;
let paquet = [];

//Création du paquet de cartes

for (let i = 0; i < couleurs.length; i++) {

    for (let j = 0; j < valeurs.length; j++) {
        let gif = "IMAGES/" + valeurs[j] + couleurs[i] + ".gif";
        let dos = "IMAGES/" + localStorage.getItem("dos") + ".jpg";
        paquet[k] = new Carte(poids[j], valeurs[j], couleurs[i], gif, dos);
        k++;
    }
}

// initialisation du jeu : la fonction sera appellée au chargement de la page et lorsque l'on appuie sur rejouer
function initialiser() {
    k = 0;
    joueur.cagnotte = parseInt(localStorage.getItem("cagnotte"));
    niveauPaquet = 0;
    indicePaquet = 0;
    jeuDouble = false;
    indice = 0;
    jeuAAfficher = "";
    messageFin = "";
    joueur.mise = 0;
    joueur.jeu = [];
    joueur.jeu2 = [];
    joueur.mise1 = 0;
    joueur.mise2 = 0;
    joueur.poidsJeu = 0;
    joueur.poidsJeu2 = 0;
    bot.jeu = [];
    bot.poidsJeu = 0;
    checkBoxJeu = "";
    jeuDouble = false;
    messFin.innerHTML = messageFin;
    messFinJ1.innerHTML = messageFin;
    messFinJ2.innerHTML = messageFin;
    document.querySelector("#jeu1Joueur").innerHTML = jeuAAfficher;
    document.querySelector("#jeu2Joueur").innerHTML = jeuAAfficher;
    document.querySelector("#jeuBot").innerHTML = jeuAAfficher;
    cagnotte.innerHTML = joueur.cagnotte + "€";
    afficherBouton(split, "none");
    afficherBouton(double, "none");
    afficherBouton(carte, "none");
    afficherBouton(passe, "none");
    afficherBouton(mise10, "block");
    afficherBouton(mise20, "block");
    afficherBouton(mise50, "block");
    afficherBouton(mise100, "block");
    afficherBouton(demarrer, "block");
    afficherBouton(rejouer, "none");
    afficherBouton(annulerMise, "none");
    mise1.innerHTML = "";
    mise2.innerHTML = "";
    selectionJeu1.style.border = "none";
    selectionJeu2.style.border = "none";
    niveauPaquet = 0; //varirable intermédiaire pour gérer l'indice du paquet
    indicePaquet = 0; //variable pour mémoriser la place dans le paquet
    indice = 0;
    finTour = false;
}

/*Distribution des cartes en paramètres :
- qui = joueur ou BOT
- combien = nombre de cartes
- jeu = pour différencier le jeu 1 et le jeu 2 en cas de split ou double
- ou = zone où seront affichées les cartes
 */
function distribuer(quelJeu, combien) {
    console.log("distribuer");
    niveauPaquet = indicePaquet;
    for (let i = niveauPaquet; i < (niveauPaquet + combien); i++) {
        quelJeu.push(paquet[i]);
        indicePaquet += 1;
    }
}


/* Affichage des jeux avec pour paramètres :
- jeu = quel jeu est à afficher Jeu BOT, jeu1 ou jeu2
- ou = a quel emplacement afficher le jeu
 */
function afficherJeu(qui, jeu, ou) {
    jeuAAfficher = "";
    console.log("Ca passe dans la fonction afficher jeu");
    if ((qui.pseudo === "BOT") && (finTour === false)) {
        console.log("affichage du jeu du BOT");
        for (let i = 0; i < jeu.length; i++) {
            jeuAAfficher += `<img src="${jeu[i].dos}">`;
            console.log(jeuAAfficher);
        }
        document.getElementById(`${ou}`).innerHTML = jeuAAfficher;
    } else if ((qui.pseudo === "BOT") && (finTour === true)) {
        for (let i = 0; i < jeu.length; i++) {
            jeuAAfficher += `<img src="${jeu[i].gif}">`;
            console.log(jeuAAfficher);
        }
        document.getElementById(`${ou}`).innerHTML = jeuAAfficher;
    } else {
        for (let i = 0; i < jeu.length; i++) {
            jeuAAfficher += `<img src="${jeu[i].gif}">`;
            console.log(jeuAAfficher);
        }
        document.getElementById(`${ou}`).innerHTML = jeuAAfficher;
    }
}

/* Affichage des boutons avec pour paramètres :
- bouton = pour le bouton à cibler : passe, carte, split, double etc...
- affichage = "block" pour afficher et "none" pour masquer
 */
function afficherBouton(bouton, affichage) {
    bouton.style.display = affichage;
}


/* vérification sur la première distribution s'il y a une paire pour proposer split ou double*/
function controle1erTour(jeu) {
    console.log(jeu);
    if (jeu[0].valeur === jeu[1].valeur) //si le joueur a 2 cartes identiques, on affiche split et double
    {
        console.log("jeu Double détecté");
        jeuDouble = true;
        afficherBouton(split, "block");
        afficherBouton(double, "block");
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    } else if (jeu[0].poids + jeu[1].poids === 21) {
        console.log("blackJack détecté");
        messageFin = "BLACKJACK <br>";
        joueur.mise = parseInt(joueur.mise) * 3 / 2;
        resultatJeu(0, 21, joueur.mise,messFin);
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
    } else if (joueur.poidsJeu < 21) {
        console.log("passe dans une autre boucle");
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    }
};

/* Calcul du poids du jeu */
function calculPoids(quelJeu,qui) {
    quelPoids = 0;
    for (let i = 0; i < quelJeu.length; i++) {
        quelPoids += quelJeu[i].poids;
        if (qui.pseudo ==  localStorage.getItem("pseudo"))
            if ((quelJeu[i].valeur == "A") && (quelPoids > 21)) {
                quelPoids -= 10; // alors l'as prend la valeur 1
        }
    }
    return (quelPoids);
}
/* Vérification du jeu */
function verifierJeu(quelJeu, quelPoids) {

    /*Vérification du jeu pour proposer les boutons de distribution tant que possible */
    if ((quelPoids < 21) && (jeuDouble == false)) {
        console.log("fonction verifier Jeu");
        // si le poids du jeu est inférieur à 21, on peut continuer à demander des cartes
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    }

    if (quelPoids > 21) {
        //si le poids du jeu joueur est supérieur à 21 et que l'on a 1 AS
        for (let i = 0; i < quelJeu.length; i++) {
            if (quelJeu[i].valeur === "A") {
                quelPoids -= 10; // alors l'as prend la valeur 1
            }
        }
        if (quelPoids >= 21) {
            cagnotte.innerHTML = joueur.cagnotte + "€";
            // localStorage.setItem("cagnotte", joueur.cagnotte);
            // messageFin = "Dommage, vous avez perdu";
            if ((jeuDouble == true) && (jeuEnCours == 1)) {
                jeuEnCours = 2;
                selectionJeu1.style.border = "none";
                selectionJeu2.style.border = "5px solid greenyellow";
            } else {
                afficherBouton(split, "none");
                afficherBouton(double, "none");
                afficherBouton(carte, "none");
                afficherBouton(passe, "none");
                while (bot.poidsJeu < 17) {
                    distribuer(bot.jeu, 1);
                    bot.poidsJeu = calculPoids(bot.jeu,bot);
                }
                finTour = true;
                afficherJeu(bot, bot.jeu, "jeuBot");
                console.log("appel Resultat JEU");
                resultatJeu(bot.poidsJeu, joueur.poidsJeu, joueur.mise,messFin);
            }

        }

    }

}


/* comparaison des scores et affichage du message Résultat avec pour paramètres :
- bot = poids du jeu du BOT
- joueur = poids du jeu du joueur
- mise = la mise en cours associée au jeu en cours
- ou = l'endroit ou afficher le message de résultat
 */
function resultatJeu(poidsBot, poidsJoueur, mise, ou) {

    //on calcule ensuite le poids du jeu de la banque

    if (poidsJoueur == 21) {
        console.log("poidsJoueur = 21");
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
        afficherBouton(rejouer, "block");
        joueur.cagnotte += mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        localStorage.setItem("cagnotte", joueur.cagnotte);
        indice = parseInt(Math.random(0, 18) * 10);
        messageFin += blagues[indice];

//si le score du joueur dépasse 21 alors le joueur a perdu
    } else {
        if (poidsJoueur > 21) {
            console.log("poidsJoueur > 21");
            afficherBouton(carte, "none");
            afficherBouton(passe, "none");
            afficherBouton(rejouer, "block");
            joueur.cagnotte -= mise;
            cagnotte.innerHTML = joueur.cagnotte + "€";
            localStorage.setItem("cagnotte", joueur.cagnotte);
            messageFin = "Dommage, vous avez perdu";

// si le score de la banque est supérieur à 21
        } else {

            if (poidsBot > 21) {
                console.log("poidsBot > 21");
                afficherBouton(carte, "none");
                afficherBouton(passe, "none");
                afficherBouton(rejouer, "block");
                joueur.cagnotte += mise;
                cagnotte.innerHTML = joueur.cagnotte + "€";
                localStorage.setItem("cagnotte", joueur.cagnotte);
                messageFin += "Vous avez gagné!!! Voici votre gain : <br>";
                indice = parseInt(Math.random(0, 18) * 10);
                messageFin += blagues[indice];


//si le score du joueur est inférieur à celui de la banque, alors le joueur a perdu
            } else {
                if (poidsBot > poidsJoueur) {
                    console.log("poidsBot > poidsJoueur");
                    afficherBouton(carte, "none");
                    afficherBouton(passe, "none");
                    afficherBouton(rejouer, "block");
                    joueur.cagnotte -= mise;
                    cagnotte.innerHTML = joueur.cagnotte + "€";
                    messageFin = "Dommage, vous avez perdu";

//si le score du joueur est supérieur à celui de la banque, alors le joueur a gagné
                } else {
                    if (poidsJoueur >= poidsBot) {
                        console.log("poidsJoueur >= poidsBot");
                        afficherBouton(carte, "none");
                        afficherBouton(passe, "none");
                        afficherBouton(rejouer, "block");
                        joueur.cagnotte += mise;
                        cagnotte.innerHTML = joueur.cagnotte + "€";
                        localStorage.setItem("cagnotte", joueur.cagnotte);
                        messageFin += "Vous avez gagné!!! Voici votre gain : <br>";
                        indice = parseInt(Math.random(0, 18) * 10);
                        messageFin += blagues[indice];
// si le score du joueur est égal à 21, le joueur a gagné
                    }
                }
            }
        }
    }
    ou.innerHTML = messageFin;
    messageFin ="";

}

/* Gestion de l'affichage de la mise en cas de split
 */
function afficherMises(ou, quelleMise) {
    splitMise = quelleMise;
    while (splitMise > 0) {
        if ((quelleMise / 100) >= 1) {
            splitMise -= 100;
            ou.innerHTML += "<img src='IMAGES/jeton100.png' height='50px'>";
        }
        if ((splitMise / 50) >= 1) {
            splitMise -= 50;
            ou.innerHTML += "<img src='IMAGES/jeton50.png' height='50px'>";
        }
        if ((splitMise / 20) >= 1) {
            splitMise -= 20;
            ou.innerHTML += "<img src='IMAGES/jeton20.png' height='50px'>";
        }
        if ((splitMise / 10) >= 1) {
            splitMise -= 10;
            ou.innerHTML += "<img src='IMAGES/jeton10.png' height='50px'>";
        }
        if ((splitMise / 5) >= 1) {
            splitMise -= 5;
            ou.innerHTML += "<img src='IMAGES/jeton5.png' height='50px'>";
        }
    }
};

/* Création du joueur avec :
- un pseudo,
- une cagnotte de départ ,
- la mise en cours ,
- le jeu de départ ,
- la décomposition du jeu en cas de possibilité de split ou double = jeu1 et jeu2
- la décompositionde la mise pour chaque jeu en cas de split ou double = mise1 et mise2
- le poids du jeu, à savoir la somme de ses cartes par poids et non par valeur
 */

let joueur = {
    pseudo: localStorage.getItem("pseudo"),
    cagnotte: localStorage.getItem("cagnotte"),
    mise: 0,
    jeu: [],
    jeu2: [],
    mise1: 0,
    mise2: 0,
    poidsJeu: 0,
    poidsJeu2: 0,
};

// Création du Bot avec : un nom et le jeu
let bot = {
    pseudo: "BOT",
    jeu: [],
    poidsJeu: 0
}

// au chargement de la page, on lance l'initialisation qui remet les variables à 0
//et fait disparaitre les boutons split, double, passe, carte et rejouer
window.onload = function () {
    initialiser();

}


//début du jeu
demarrer.addEventListener("click", function () {
    // Melanger le paquet
    paquet.sort(function (a, b) {
        return 0.5 - Math.random()
    });
    cagnotte.innerHTML = joueur.cagnotte + "€";
    distribuer(joueur.jeu, 1);
    distribuer(bot.jeu, 1);
    distribuer(joueur.jeu, 1);
    distribuer(bot.jeu, 1);
    controle1erTour(joueur.jeu);
    afficherJeu(joueur, joueur.jeu, "jeu1Joueur");
    afficherJeu(bot, bot.jeu, "jeuBot");
    joueur.poidsJeu = calculPoids(joueur.jeu,joueur);
    console.log("poids jeu joueur apres fonction = " + joueur.poidsJeu);
    bot.poidsJeu = calculPoids(bot.jeu,bot);
    console.log("poids jeu bot apres fonction = " + bot.poidsJeu);
    verifierJeu(joueur.jeu, joueur.poidsJeu);
    afficherBouton(annulerMise, "none");
    afficherBouton(mise10, "none");
    afficherBouton(mise20, "none");
    afficherBouton(mise50, "none");
    afficherBouton(mise100, "none");
    afficherBouton(demarrer, "none");
});

rejouer.addEventListener("click", function () {
    initialiser();
});

//Gestion des actions sur les boutons

/* le split génère 2 jeux basés sur chacune des 2 cartes
    et partage la mise de départ en 2 */
split.addEventListener("click", function () {
    joueur.jeu[0] = joueur.jeu[0];
    joueur.jeu2.push(joueur.jeu[1]);
    joueur.jeu.splice(1, 1);
    joueur.mise1 = joueur.mise / 2;
    joueur.mise2 = joueur.mise / 2;
    mise1.innerHTML = "";
    afficherMises(mise1, joueur.mise1);
    afficherMises(mise2, joueur.mise2);
    afficherBouton(split, "none");
    afficherBouton(double, "none");
    distribuer(joueur.jeu, 1);
    joueur.poidsJeu = calculPoids(joueur.jeu,joueur);
    distribuer(joueur.jeu2, 1)
    joueur.poidsJeu2 = calculPoids(joueur.jeu2,joueur);
    afficherJeu(joueur,joueur.jeu,"jeu1Joueur");
    afficherJeu(joueur,joueur.jeu2,"jeu2Joueur");
    jeuEnCours = 1;
    selectionJeu2.style.border = "none";
    selectionJeu1.style.border = "5px solid greenyellow";

});

/* le double génère 2 jeux basés sur chacune des 2 cartes
   et double la mise de départ */
double.addEventListener("click", function () {
    joueur.jeu[0] = joueur.jeu[0];
    joueur.jeu2.push(joueur.jeu[1]);
    joueur.jeu.splice(1, 1);
    joueur.mise1 = joueur.mise;
    joueur.mise2 = joueur.mise;
    joueur.mise += joueur.mise;
    mise1.innerHTML = "";
    zoneJeu.style.flexDirection = "row";
    afficherMises(mise1, joueur.mise1);
    afficherMises(mise2, joueur.mise2);
    afficherBouton(split, "none");
    afficherBouton(double, "none");
    distribuer(joueur.jeu, 1);
    distribuer(joueur.jeu2, 1);
    afficherJeu(joueur,joueur.jeu,"jeu1Joueur");
    afficherJeu(joueur,joueur.jeu2,"jeu2Joueur");
    joueur.poidsJeu = calculPoids(joueur.jeu,joueur);
    joueur.poidsJeu2 = calculPoids(joueur.jeu2,joueur);
    verifierJeu(joueur.jeu, joueur.poidsJeu);
    jeuEnCours = 1;
    selectionJeu2.style.border = "none";
    selectionJeu1.style.border = "5px solid greenyellow";

});

// demande de carte
carte.addEventListener("click", function () {

        if (jeuEnCours == 1) {
            distribuer(joueur.jeu, 1);
            afficherJeu(joueur, joueur.jeu, "jeu1Joueur");
            joueur.poidsJeu = calculPoids(joueur.jeu,joueur);
            verifierJeu(joueur.jeu, joueur.poidsJeu);
        }
        else if (jeuEnCours == 2) {
            distribuer(joueur.jeu2, 1);
            afficherJeu(joueur, joueur.jeu2, "jeu2Joueur");
            joueur.poidsJeu2 = calculPoids(joueur.jeu2,joueur);
            verifierJeu(joueur.jeu2, joueur.poidsJeu2);
        }
    else {
        distribuer(joueur.jeu, 1);
        afficherJeu(joueur, joueur.jeu, "jeu1Joueur");
        joueur.poidsJeu = calculPoids(joueur.jeu,joueur);
        verifierJeu(joueur.jeu, joueur.poidsJeu);
    }

});
// le bouton lance la distribution de carte pour le bot
// puis on compare les jeux pour déclarer  le vainqueur
passe.addEventListener("click", function () {
        if (jeuEnCours == 1) {
            jeuEnCours = 2;
            selectionJeu1.style.border = "none";
            selectionJeu2.style.border = "5px solid greenyellow";
        }
        else if (jeuEnCours == 2) {
            while (bot.poidsJeu < 17) {
                distribuer(bot.jeu, 1);
                bot.poidsJeu = calculPoids(bot.jeu,bot);
            }
            finTour = true;
            afficherJeu(bot, bot.jeu, "jeuBot");
            console.log("appel Resultat JEU");
            resultatJeu(bot.poidsJeu, joueur.poidsJeu, joueur.mise1,messFinJ1);
            resultatJeu(bot.poidsJeu, joueur.poidsJeu2, joueur.mise2,messFinJ2);
        }
    else {
        while (bot.poidsJeu < 17) {
            distribuer(bot.jeu, 1);
            bot.poidsJeu = calculPoids(bot.jeu,bot);
        }
        finTour = true;
        afficherJeu(bot, bot.jeu, "jeuBot");
        console.log("appel Resultat JEU");
        resultatJeu(bot.poidsJeu, joueur.poidsJeu, joueur.mise,messFin);
    }


});

/******************************************
 *******GESTION DE LA FONCTION MISE *******
 ******************************************/


mise10.addEventListener("click", function () {
    if (joueur.cagnotte >= 10) {
        joueur.mise += 10;
        joueur.cagnotte -= 10;
        afficherBouton(annulerMise, "block");
        mise1.innerHTML += "<img src='IMAGES/jeton10.png' height='50px'>";
        cagnotte.innerHTML = joueur.cagnotte + "€";
    }
});

mise20.addEventListener("click", function () {
    if (joueur.cagnotte >= 20) {
        joueur.mise += 20;
        joueur.cagnotte -= 20;
        afficherBouton(annulerMise, "block");
        mise1.innerHTML += "<img src='IMAGES/jeton20.png' height='50px'>";
        cagnotte.innerHTML = joueur.cagnotte + "€";
    }
});

mise50.addEventListener("click", function () {
    if (joueur.cagnotte >= 50) {
        joueur.mise += 50;
        joueur.cagnotte -= 50;
        afficherBouton(annulerMise, "block");
        mise1.innerHTML += "<img src='IMAGES/jeton50.png' height='50px'>";
        cagnotte.innerHTML = joueur.cagnotte + "€";
    }
});

mise100.addEventListener("click", function () {
    if (joueur.cagnotte >= 100) {
        joueur.mise += 100;
        joueur.cagnotte -= 100;
        afficherBouton(annulerMise, "block");
        mise1.innerHTML += "<img src='IMAGES/jeton100.png' height='50px%'>";
        cagnotte.innerHTML = joueur.cagnotte + "€";
    }
});

annulerMise.addEventListener("click", function () {
    afficherBouton(annulerMise, "none");
    joueur.mise = 0;
    mise1.innerHTML = "";
});

