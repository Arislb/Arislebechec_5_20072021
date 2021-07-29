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
        <td>delete</td>
    </tr>
        
        `;
    
    }

    // injection du html dans la page panier 
    contenuHtml2.innerHTML = structureproduitpanier +`
    <tr>
                            <th scope="row">Prix total : </th>
                            <th colspan="3">100</th>
                            <td></td>
                        </tr>
    `;
    
}


})