let formulaire = document.querySelector(".formulaire");
let boutonJouer = document.querySelector("#boutonJouer");
let dosCarte = document.getElementsByName("dosCarte");
let animation = document.querySelector(".animation");
let cagnotte = document.querySelector("#cagnotte");
let alerteCagnotte = document.querySelector("#alerte");

let alerte = "";

window.onload = function () {
    alerte = "";
    alerteCagnotte.innerHTML = alerte;
};
function rafraichirPage() {
    window.location.replace("index.html");
};

boutonJouer.addEventListener('click', function (){
    formulaire.style.display = "flex";
    animation.style.display = "none";
    document.querySelector("#valider").addEventListener("click",function(){

        for (let i = 0; i < dosCarte.length; i++) {
            if (dosCarte[i].checked){
                localStorage.setItem("dos",`${dosCarte[i].value}_back`);
            }
        }
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

