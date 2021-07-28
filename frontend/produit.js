//Déclaration des variables
let categorie ="cameras";
//recupérer l'ID d'un produit
const urlid = window.location.search ;
const id = urlid.slice(1) ;
console.log(id);



fetch('http://localhost:3000/api/' + categorie+"/"+id)
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
    console.log(options);
// Boucle pour afficher les options
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        let numoption = i+1;
        let positionopt = document.querySelector("#leproduit select");
        positionopt.innerHTML +=`
        <option value="${numoption}">${option}</option>
        `
    }
    
//----------------------Gestion du panier---------------------------------------------------------

// Recupération des informations selectionnée a envoyer au panier.

//selection de la liste des options du produit.
const  idselection = document.querySelector(".form-select");
const choixoption = idselection.value;
console.log(choixoption);

//recuparation Bouton Ajouter au panier  ! 

const btn_envoyerpanier = document.querySelector("#leproduit button");
console.log(btn_envoyerpanier);

//Ecouter le bouton pour envoyer au panier 
    btn_envoyerpanier.addEventListener("click", (event)=>{
    event.preventDefault();
    //selection de la liste des options du produit.
    const  idselection = document.querySelector(".form-select");
    const choixoption = idselection.value;
    console.log(choixoption);
    
    //Récupération des valeurs lié au produit pour le panier.
        let ficheproduit = {
            nomproduit: data.name,
            id_produit: id,
            optionproduit: choixoption,
            quantite: 1,
            prix: data.price /100
        }
        console.log(ficheproduit);
    })


})