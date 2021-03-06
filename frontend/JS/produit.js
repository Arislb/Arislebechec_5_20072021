//Déclaration des variables
let categorie ="cameras";
//recupérer l'ID d'un produit
const urlid = window.location.search ;
const idproduit = urlid.slice(1) ;
console.log(idproduit);



fetch('http://localhost:3000/api/' + categorie+"/"+idproduit)
.then(function(reponse){
    return reponse.json();
})
.then(function(data){

//-----------------------------Visuel des element la page------------------------------------

// Position des elements texte changé.
    document.querySelector("#leproduit h5").textContent = data.name;
    document.querySelector("#leproduit p").textContent = data.description;
    document.querySelector("#leproduit img ").src = data.imageUrl;
    document.querySelector(".price").textContent = data.price / 100 + "€";
//Déclaration d'une variable pour le tableau des optiond<;
    let options = data.lenses ;

// Boucle pour afficher les options
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        let numoption = option ;
        let positionopt = document.querySelector("#leproduit select");
        positionopt.innerHTML +=`
        <option value="${numoption}">${option}</option>
        `
    }
    
//----------------------Gestion du panier---------------------------------------------------------

// Recupération des informations selectionnée a envoyer au panier.

//selection de la liste des options du produit.
//const  idselection = document.querySelector(".form-select");
//const choixoption = idselection.value;


//recuparation Bouton Ajouter au panier  ! 

const btn_envoyerpanier = document.querySelector("#leproduit button");

//Ecouter le bouton pour envoyer au panier ----------------------------------Addeventlistener du bouton ajouter au panier.
    btn_envoyerpanier.addEventListener("click", (event)=>{
    event.preventDefault();
    //selection de la liste des options du produit.
    const  idselection = document.querySelector(".form-select");
    const choixoption = idselection.value;

    //Récupération des valeurs lié au produit pour le panier.
        let ficheproduit = {
            nomproduit: data.name,
            id_produit: idproduit,
            optionproduit: choixoption,
            quantite: 1,
            prix: data.price /100
        };


//-----------------------------------------Local Storage----------------------------------
//
//---------------Stocker la récupération des valeur de la ficheproduit dans le local storage----

//Delcaration de la variable "prodAddLstorage" dans laquelle on trouve les key/value qui sont dans le localstorage.
//++JSON.parse convertie les données au format JSON qui sont dans le local storage en objet JS.
let prodAddLstorage =  JSON.parse(localStorage.getItem("danspanier"))

//fonction ajouter le produit au panier/Localstorage
const ajoutleproduitlocalstorage = () => {
    prodAddLstorage.push(ficheproduit);
//++JSON.stringify convertie les données format JS en format JSON
    localStorage.setItem("danspanier",JSON.stringify(prodAddLstorage));
}

//fonction pour aller au panier ou rester sur la page après l'ajout au panier.
const popapresachat = () =>{
    if (window.confirm(`${data.name} option :${choixoption} a été rajouté au panier.
    Voulez-vous aller au panier ?`)) {
        window.location.href = "panier.html"
    } else {
        window.location.href = "#"
    }
}

//s'il y a déjà des produits d'enregistré dans le LocalS.
    if (prodAddLstorage) {
        ajoutleproduitlocalstorage();
        popapresachat();
        console.log(prodAddLstorage);
} 
//s'il n'y a pas du tout de produit enregistré dans le LocalS.
    else {
        prodAddLstorage = [];
        ajoutleproduitlocalstorage();
        popapresachat();
        console.log(prodAddLstorage);

}
})


})