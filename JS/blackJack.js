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
let cagnotte = document.querySelector("#cagnotte");
let mise1 = document.querySelector("#mise1");
let mise2 = document.querySelector("#mise2");


let couleurs = ["d", "s", "h", "c"];
let valeurs = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let poids = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
let niveauPaquet = 0; //varirable intermédiaire pour gérer l'indice du paquet
let indicePaquet = 0; //variable pour mémoriser la place dans le paquet
let jeuAAfficher = "";
let jeuDouble = false;
let messageFin = "";
let indice = 0;
let splitMise = 0;
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


/*Création du paquet de cartes - chasue carte a un poids (pour le calcul des points), une couleur (pique coeur
trèfle ou carreau), une valeur (2,3,4.. J, Q,K et A) pour gérer le double/split et l'affichage des cartes
et le fichier gif associé */


class Carte {
    constructor(poids, valeur, couleur, gif) {
        this.poids = poids;
        this.valeur = valeur;
        this.couleur = couleur;
        this.gif = gif;
    }
};
let k = 0;
let paquet = [];

//Création du paquet de cartes

for (let i = 0; i < couleurs.length; i++) {

    for (let j = 0; j < valeurs.length; j++) {
        let gif = "IMAGES/" + valeurs[j] + couleurs[i] + ".gif";
        paquet[k] = new Carte(poids[j], valeurs[j], couleurs[i], gif);
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
    messFin.innerHTML = messageFin;
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
    mise1.innerHTML = "";
    niveauPaquet = 0; //varirable intermédiaire pour gérer l'indice du paquet
    indicePaquet = 0; //variable pour mémoriser la place dans le paquet
    jeuDouble = false;
    indice = 0;
}

/*Distribution des cartes en paramètres :
- qui = joueur ou BOT
- combien = nombre de cartes
- jeu = pour différencier le jeu 1 et le jeu 2 en cas de split ou double
- ou = zone où seront affichées les cartes
 */
function distribuer(qui, combien, jeu, ou) {
    console.log("distribuer");
    niveauPaquet = indicePaquet;

    if (jeuDouble == true) {
        qui.poidsJeu = 0;
        for (let i = niveauPaquet; i < (niveauPaquet + combien); i++) {
            jeu.push(paquet[i]);
            indicePaquet += 1;
        }
        for (let j = 0; j < jeu.length; j++) {
            qui.poidsJeu += jeu[j].poids;
        }
    }
    if (jeu == "joueur.jeu2") { //si on est en split ou double et qu'on distribue sur le jeu 2
        qui.poidsJeu2 = 0;
        for (let i = niveauPaquet; i < (niveauPaquet + combien); i++) {
            jeu.push(paquet[i]);
            indicePaquet += 1;
        }
        for (let j = 0; j < jeu.length; j++) {
            qui.poidsJeu2 += jeu[j].poids;
        }
        afficherJeu(jeu, ou);
        calculPoids(jeu);

    } else {
        qui.poidsJeu = 0;
        for (let i = niveauPaquet; i < (niveauPaquet + combien); i++) {
            jeu.push(paquet[i]);
            indicePaquet += 1;
        }
        for (let j = 0; j < jeu.length; j++) {
            qui.poidsJeu += jeu[j].poids;
        }
        afficherJeu(jeu, ou);
        calculPoids(jeu);

    }
}

/* Affichage des jeux avec pour paramètres :
- jeu = quel jeu est à afficher Jeu BOT, jeu1 ou jeu2
- ou = a quel emplacement afficher le jeu
 */
function afficherJeu(jeu, ou) {
    console.log("afficherJeu");
    jeuAAfficher = "";
    for (let i = 0; i < jeu.length; i++) {
        jeuAAfficher += `<img src="${jeu[i].gif}">`;

    }
    document.getElementById(`${ou}`).innerHTML = jeuAAfficher;
}

/* Affichage des boutons avec pour paramètres :
- bouton = pour le bouton à cibler : passe, carte, split, double etc...
- affichage = "block" pour afficher et "none" pour masquer
 */
function afficherBouton(bouton, affichage) {
    bouton.style.display = affichage;
}

/* vérification sur la première distribution s'il y a une paire pour proposer split ou double*/
function controleDouble(jeu) {
    console.log("controleDouble");
    if ((jeu[0].valeur === jeu[1].valeur)) //si le joueur a 2 cartes identiques, on affiche split et double
    {
        jeuDouble = true;
        afficherBouton(split, "block");
        afficherBouton(double, "block");
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    } else {
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    }
};

/* Vérification du poids du jeu pour proposer les boutons de distribution tant que possible */
function calculPoids(jeu) {
    console.log("calculPoids");
    if (joueur.poidsJeu < 21) {
        // si le poids du jeu est inférieur à 21, on peut continuer à demander des cartes
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "block");
        afficherBouton(passe, "block");
    }
    if ((joueur.poidsJeu == 21) && (jeu.length == 2)) { // si on a 21 sur 2 cartes alors BlackJack
        messageFin = "BLACKJACK <br>";
        joueur.mise = joueur.mise * 1.5;
        resultatJeu(bot.poidsJeu, joueur.poidsJeu);
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
    }
    if (joueur.poidsJeu > 21) {
        console.log("Jeu Joueur sup à 21");
        //si le poids du jeu joueur est supérieur à 21 et que l'on a 1 AS
        for (let i = 0; i < jeu.length; i++) {
            if (jeu[i].valeur === "A") {
                joueur.poidsJeu -= 10; // alors l'as prend la valeur 1
                break;
            }
        }
        afficherBouton(split, "none");
        afficherBouton(double, "none");
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");

        // le jeu s'arrête pour le joueur
        // on commence alors la distribution pour le BOT
        while (bot.poidsJeu < 17) {
            distribuer(bot, 1, bot.jeu, "jeuBot");
        }
        // quand tout le monde est servi, on vérifie les jeux
        resultatJeu(bot.poidsJeu, joueur.poidsJeu);
        if (double == true) { //si l'on est sur un jeu double (split ou double) on vérifie le 2nd jeu
            resultatJeu(bot.poidsJeu, joueur.poidsJeu2);
        }
    }
}

// Fonction mise : on définit la valeur de la mise et on affiche la cagnotte
function miser(combien) {
    joueur.mise = combien;
}

/* comparaison des scores et affichage du message Résultat avec pour paramètres :
- bot = poids du jeu du BOT
- joueur = poids du jeu du joueur
 */
function resultatJeu(poidsBot, poidsJoueur) {
// si le score de la banque est supérieur à 21
    if (poidsBot > 21) {
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
        afficherBouton(rejouer, "block");
        joueur.cagnotte += joueur.mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        localStorage.setItem("cagnotte", joueur.cagnotte);
        messageFin += "Vous avez gagné!!! Voici votre gain : <br>";
        indice = parseInt(Math.random(0, 18) * 10);
        messageFin += blagues[indice];

//si le score du joueur dépasse 21 alors le joueur a perdu
    } else if (poidsJoueur > 21) {
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
        afficherBouton(rejouer, "block");
        poidsJoueur.cagnotte -= joueur.mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        localStorage.setItem("cagnotte", joueur.cagnotte);
        messageFin = "Dommage, vous avez perdu";

//si le score du joueur est inférieur à celui de la banque, alors le joueur a perdu
    } else if (poidsBot > poidsJoueur) {
        afficherBouton(rejouer, "block");
        joueur.cagnotte -= joueur.mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        messageFin = "Dommage, vous avez perdu";

//si le score du joueur est supérieur à celui de la banque, alors le joueur a gagné
    } else if (poidsJoueur >= poidsBot) {
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
        afficherBouton(rejouer, "block");
        joueur.cagnotte += joueur.mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        localStorage.setItem("cagnotte", joueur.cagnotte);
        messageFin += "Vous avez gagné!!! Voici votre gain : <br>";
        indice = parseInt(Math.random(0, 18) * 10);
        messageFin += blagues[indice];

// si le score du joueur est égal à 21, le joueur a gagné
    } else if (poidsJoueur == 21) {
        afficherBouton(carte, "none");
        afficherBouton(passe, "none");
        afficherBouton(rejouer, "block");
        joueur.cagnotte += joueur.mise;
        cagnotte.innerHTML = joueur.cagnotte + "€";
        localStorage.setItem("cagnotte", joueur.cagnotte);
        messageFin = "Vous avez gagné!!! Voici votre gain : <br>";
        indice = parseInt(Math.random(0, 18) * 10);
        messageFin += blagues[indice];
    }
    messFin.innerHTML = messageFin;
}

/* Gestyion de l'affichage de la mise en cas de split
 */
function afficherMises(ou,quelleMise) {
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
    // pseudo: localStorage.getItem("pseudo"),
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
    nom: "BOT",
    jeu: [],
    poidsJeu: 0
}

// au chargement de la page, on lance l'initialisation qui remet les variables à 0
//et fait disparaitre les boutons split, double, passe, carte et rejouer
window.onload = function () {
    localStorage.setItem("cagnotte", 500);
    initialiser();

}


//début du jeu
demarrer.addEventListener("click", function () {
    // Melanger le paquet
    paquet.sort(function (a, b) {
        return 0.5 - Math.random()
    });
    cagnotte.innerHTML = joueur.cagnotte + "€";
    distribuer(joueur, 1, joueur.jeu, "jeu1Joueur");
    distribuer(bot, 1, bot.jeu, "jeuBot");
    distribuer(joueur, 1, joueur.jeu, "jeu1Joueur");
    distribuer(bot, 1, bot.jeu, "jeuBot");
    calculPoids(joueur.jeu);
    controleDouble(joueur.jeu);
    afficherBouton(mise10, "none");
    afficherBouton(mise20, "none");
    afficherBouton(mise50, "none");
    afficherBouton(mise100, "none");
    miser(joueur.mise);
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
    afficherJeu(joueur.jeu, "jeu1Joueur");
    afficherJeu(joueur.jeu2, "jeu2Joueur");
    distribuer(joueur, 1, joueur.jeu, "jeu1Joueur");
    distribuer(joueur, 1, joueur.jeu2, "jeu2Joueur");
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
    afficherMises(mise1, joueur.mise1);
    afficherMises(mise2, joueur.mise2);
    miser(joueur.mise);
    afficherBouton(split, "none");
    afficherBouton(double, "none");
    afficherJeu(joueur.jeu, "jeu1Joueur");
    afficherJeu(joueur.jeu2, "jeu2Joueur");
});

// demande de carte
carte.addEventListener("click", function () {
    if (jeuDouble == true) {
        distribuer(joueur, 1, joueur.jeu, "jeu1Joueur");
        distribuer(joueur, 1, joueur.jeu2, "jeu2Joueur");
    } else {
        distribuer(joueur, 1, joueur.jeu, "jeu1Joueur");
    }

});
// le bouton lance la distribution de carte pour le bot
// puis on compare les jeux pour déclarer  le vainqueur
passe.addEventListener("click", function () {
    while (bot.poidsJeu < 17) {
        distribuer(bot, 1, bot.jeu, "jeuBot");
    }
    resultatJeu(bot.poidsJeu, joueur.poidsJeu);
    if (double == true) {
        resultatJeu(bot.poidsJeu, joueur.poidsJeu2);
    }
});

mise10.addEventListener("click", function () {
    joueur.mise += 10;
    mise1.innerHTML += "<img src='IMAGES/jeton10.png' height='50px'>";

});

mise20.addEventListener("click", function () {
    joueur.mise += 20;
    mise1.innerHTML += "<img src='IMAGES/jeton20.png' height='50px%'>";

});

mise50.addEventListener("click", function () {
    joueur.mise += 50;
    mise1.innerHTML += "<img src='IMAGES/jeton50.png' height='50px'>";
});

mise100.addEventListener("click", function () {
    joueur.mise += 100;
    mise1.innerHTML += "<img src='IMAGES/jeton100.png' height='50px%'>";

});
