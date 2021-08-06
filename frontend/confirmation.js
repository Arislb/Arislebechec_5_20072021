
let bilanCommande = JSON.parse(localStorage.getItem("bcommande"))
let idCommande = JSON.parse(localStorage.getItem("ID_order"))

console.log(bilanCommande);
console.log(idCommande.orderId);

//---------------------Visuel de la commande dans confirmation---------------------

//emplacement de L'iD_order 
document.querySelector("#idcommande").textContent = idCommande.orderId;
const contenuHtml = document.querySelector("#listecommande")
console.log(contenuHtml)

let lesproduits= bilanCommande.produitenregistredanslocalstorage;

console.log(lesproduits);

for (let i = 0; i < lesproduits.length; i++) {
    contenuHtml.innerHTML +=`<div> <p>-test ${lesproduits[i].nomproduit}</p>
    </div>`
}

contenuHtml.innerHTML += `
<p>Prix total de la commande: ${bilanCommande.prixtotal}€</p>`

