let formulaire = document.querySelector(".formulaire");
let boutonJouer = document.querySelector("#boutonJouer");
let dosCarte = document.getElementsByName("dosCarte");
let animation = document.querySelector(".animation");
let tableauDosCarte = [
    document.getElementById('dosBlue'),
    document.getElementById('dosBlack'),
    document.getElementById('dosGreen'),
    document.getElementById('dosRed'),
    document.getElementById('dosYellow'),
    document.getElementById('dosPurple')
];
let tableauCorrespondanceDos = ["blue_back", "Gray_back", "Green_back", "Red_back", "Yellow_back", "purple_back"];
localStorage.setItem("choixDos", 0); // Selectionne le dos de carte bleue par défaut
tableauDosCarte[localStorage.choixDos].style.transform = "translateY(-10px)";
localStorage.dos = tableauCorrespondanceDos[localStorage.choixDos];
let cagnotte = document.querySelector("#cagnotte");
let alerteCagnotte = document.querySelector("#alerte");
let alerte = "";

function lireCookie() {
    let c = document.cookie;    // Récupère le tableau des cookies
    c = c.split(';');
    localStorage.setItem('pseudo', c[0].substring(7, c[0].length));
    localStorage.setItem('cagnotte', c[1].substring(10, c[1].length));
    document.getElementById('pseudo').value = localStorage.pseudo;
    document.getElementById('cagnotte').value = localStorage.cagnotte;
// // Ajoute le signe égale virgule au nom
//     // pour la recherche
//     var nom2 = nom + "=";
//     // Array contenant tous les cookies
//     var arrCookies = document.cookie.split(';');
//     // Cherche l'array pour le cookie en question
//     for(var i=0;i < arrCookies.length;i++) {
//         var a = arrCookies[i];
// // Si c'est un espace, enlever
//         while (a.charAt(0)==' ') {
//             a = a.substring(1,a.length);
//         }
//         if (c.andexOf(nom2) == 0) {
//             return a.substring(nom2.length,a.length);
//         }
//     }
//     // Aucun cookie trouvé
//     return null;
}

function afficheSelectionDos() {
    for (i = 0; i < tableauDosCarte.length; i++) {
        tableauDosCarte[i].style.transform = "translateY(0px)";
    }
    tableauDosCarte[localStorage.choixDos].style.transform = "translateY(-10px)";
    localStorage.dos = tableauCorrespondanceDos[localStorage.choixDos];
}
/**
 * Selection du dos de carte
 */

// Selection du dos bleu
document.getElementById('dosBlue').addEventListener("click", function(){
//     document.querySelector('.dos').addEventListener("click", function (e) {
//         localStorage.dos = e.path[2].childElementCount - 1;
//         console.log(e.path[2].childElementCount - 1);
    localStorage.choixDos = 0;
    afficheSelectionDos();
});

// Selection du dos gris
document.getElementById('dosBlack').addEventListener("click", function () {
    localStorage.choixDos = 1;
    afficheSelectionDos();
});

// Selection du dos vert
document.getElementById('dosGreen').addEventListener("click", function () {
    localStorage.choixDos = 2;
    afficheSelectionDos();
});

// Selection du dos rouge
document.getElementById('dosRed').addEventListener("click", function () {
    localStorage.choixDos = 3;
    afficheSelectionDos();
});

// Selection du dos jaune
document.getElementById('dosYellow').addEventListener("click", function () {
    localStorage.choixDos = 4;
    afficheSelectionDos();
});

// Selection du dos violet
document.getElementById('dosPurple').addEventListener("click", function () {
    localStorage.choixDos = 5;
    afficheSelectionDos();
});
window.onload = function () {
    alerte = "";
    alerteCagnotte.innerHTML = alerte;
};
function rafraichirPage() {
    window.location.replace("index.html");
};

document.getElementById("charger").addEventListener('click', function(){
    lireCookie()
});

boutonJouer.addEventListener('click', function (){
    formulaire.style.display = "flex";
    animation.style.display = "none";
    document.querySelector("#valider").addEventListener("click",function(){

        if (cagnotte.value < 100){
            alerte = "Vous devez saisir un montant de cagnotte supérieur à 100.";
            alerteCagnotte.style.backgroundColor = "white";
            alerteCagnotte.style.color ="red";
            alerteCagnotte.innerHTML = alerte ;
            setInterval(function (){
                rafraichirPage()}, 3000);
        }
        else {

            localStorage.setItem("pseudo", document.querySelector("#pseudo").value);
            localStorage.setItem("cagnotte", cagnotte.value);
            window.location.replace("jeu.html");
        }

    });
});
