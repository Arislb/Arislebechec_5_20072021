
let bilanCommande = JSON.parse(localStorage.getItem("bcommande"))
let idCommande = JSON.parse(localStorage.getItem("ID_order"))


//---------------------Visuel de la commande dans confirmation---------------------

//emplacement de L'iD_order 
document.querySelector("#idcommande").textContent = idCommande.orderId;
const contenuHtml = document.querySelector("#listecommande")


let lesproduits= bilanCommande.produitenregistredanslocalstorage;



for (let i = 0; i < lesproduits.length; i++) {
    contenuHtml.innerHTML +=`<div> <p>- ${lesproduits[i].nomproduit}, lentille :${lesproduits[i].optionproduit}  |  ${lesproduits[i].prix}€</p>
    </div>`
}

contenuHtml.innerHTML += `
<p>Prix total de la commande: ${bilanCommande.prixtotal}€</p>`

