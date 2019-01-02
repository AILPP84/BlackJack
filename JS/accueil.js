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
dosBlue.addEventListener("click", function(){
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

boutonJouer.addEventListener('click', function (){
    formulaire.style.display = "flex";
    animation.style.display = "none";
    document.querySelector("#valider").addEventListener("click",function(){

        localStorage.setItem("pseudo",document.querySelector("#pseudo").value);
        localStorage.setItem("cagnotte",document.querySelector("#cagnotte").value);

        document.location.href="jeu.html";
    });
});

