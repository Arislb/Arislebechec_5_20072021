let categorie ="cameras"

fetch('http://localhost:3000/api/' + categorie)
.then(function(reponse){
    return reponse.json();
})
.then (function(data){
    console.log(data);


//Delcaration de la variable "produitenregistredanslocalstorage" dans laquelle on trouve les key/value qui sont dans le localstorage.
//++JSON.parse convertie les données au format JSON qui sont dans le local storage en objet JS.
let produitenregistredanslocalstorage =  JSON.parse(localStorage.getItem("danspanier"))

//--------------------------------------------VISUEL DES PRODUIT DANS LE PANIER------------------------

// Emplacement du code HTML injecter
const contenuHtml2 = document.querySelector("#contenupanier");
console.log(contenuHtml2);

let structureproduitpanier = [];
//Si le panier est vide: Aucun produit dans le panier.
if (produitenregistredanslocalstorage === null) {
    const paniervide =`
    <tr>
    <th colspan="5">Aucun produit</th>
</tr>
    `;
    contenuHtml2.innerHTML = paniervide;
} else {
    //Si le panier n'est pas vide : Afficher les produits 
    //let structureproduitpanier = [];
    

    for (let k = 0; k < produitenregistredanslocalstorage.length; k++) {
        console.log(produitenregistredanslocalstorage);
        
        structureproduitpanier = structureproduitpanier +` <tr>
        <th scope="row">${[k+1]}</th>
        <td>${produitenregistredanslocalstorage[k].nomproduit}</td>
        <td>${produitenregistredanslocalstorage[k].optionproduit}</td>
        <td>${produitenregistredanslocalstorage[k].prix}</td>
        <td></td>
    </tr>
        
        `;
    
    }

    // injection du html dans la page panier 
    contenuHtml2.innerHTML = structureproduitpanier +`
    <tr>
                            <th scope="row">Prix total : </th>
                            <th colspan="2" class="prix-total"></th>
                            <td colspan="2"><button class="btn-supprimer-all">Vider le panier</button></td>
                        </tr>
    `;
    
}

//-------------------------------------------GESTION DU BOUTON DELETE-------------------------------------------

//Selection des réferences de tous  les boutons btn-supprimer
 let btn_supprimer = document.querySelectorAll(".btn-supprimer");
 
 //selection de L'ID a supprimer en fonction du bouton.

/// ***********GESTION DU BOUTON DELETE ALL PANIER*************************

//La selection de la référence du bouton "btn_supprimer_all".

const btn_supprimer_all =  document.querySelector(".btn-supprimer-all")

// Suppression  de la key "danspanier" dans le local storage.
btn_supprimer_all.addEventListener("click", (e)=>{
    e.preventDefault;

    //.removeItem pour vider le local storage 
    localStorage.removeItem("danspanier");
    //alerte pour actualiser la page
    window.location.reload() ;
})


// ----------------------------------------Somme total des produits du panier-----------------------------

//Declaration des variables pour les prix present dans le panier
let sommedupanier = [];

//recuperer les prix du panier;
for (let s = 0; s < produitenregistredanslocalstorage.length; s++) {
    let prixproduitdupanier = produitenregistredanslocalstorage[s].prix;
    //Mettre les prix recuprer dans le tableau/variable "Sommedupanier"
    sommedupanier.push(prixproduitdupanier);
    
}
//Addtionner les pris qu'il y a dans le tableau"sommedupanier" avec la méthode .reducer
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const Prixtotal = sommedupanier.reduce(reducer,0);

document.querySelector(".prix-total").textContent = Prixtotal;
})