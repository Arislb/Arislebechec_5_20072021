let categorie ="cameras"

fetch('http://localhost:3000/api/' + categorie)
.then(function(reponse){
    return reponse.json();
})
.then (function(data){
    console.log(data);


//Delcaration de la variable "prodAddLstorage" dans laquelle on trouve les key/value qui sont dans le localstorage.
//++JSON.parse convertie les données au format JSON qui sont dans le local storage en objet JS.
let prodAddLstorage =  JSON.parse(localStorage.getItem("danspanier"))

//--------------------------------------------VISUEL DES PRODUIT DANS LE PANIER------------------------

// Emplacement du code HTML injecter
const contenuHtml2 = document.querySelector("#contenupanier");


let structureproduitpanier = [];
//Si le panier est vide: Aucun produit dans le panier.
if (prodAddLstorage === null) {
    const paniervide =`
    <tr>
    <th colspan="5">Aucun produit</th>
</tr>
    `;
    contenuHtml2.innerHTML = paniervide;
} else {
    //Si le panier n'est pas vide : Afficher les produits 
    //let structureproduitpanier = [];
    

    for (let k = 0; k < prodAddLstorage.length; k++) {
        console.log(prodAddLstorage);
        
        structureproduitpanier = structureproduitpanier +` <tr>
        <th scope="row">${[k+1]}</th>
        <td>${prodAddLstorage[k].nomproduit}</td>
        <td>${prodAddLstorage[k].optionproduit}</td>
        <td>${prodAddLstorage[k].prix}</td>
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
for (let s = 0; s < prodAddLstorage.length; s++) {
    let prixproduitdupanier = prodAddLstorage[s].prix;
    //Mettre les prix recuprer dans le tableau/variable "Sommedupanier"
    sommedupanier.push(prixproduitdupanier);
    
}
//Addtionner les pris qu'il y a dans le tableau"sommedupanier" avec la méthode .reducer
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixtotal = sommedupanier.reduce(reducer,0);

document.querySelector(".prix-total").textContent = prixtotal;


//-------------------------------Gestion formulaire---------------------------------------

//-------------------Bouton de commande-------------------
const btn_commande = document.querySelector(".btn-commande");

btn_commande.addEventListener("click", (e)=>{
    //e.preventDefault;

//variable pour les formulaires
    let firstname = document.querySelector("#fname").value;
    let lastname = document.querySelector("#lname").value;
    let adress = document.querySelector("#inputadresse").value;
    let city = document.querySelector("#inputville").value;
    /* let email = document.querySelector("").value; */

    //recuperation des valeur du formulaire.
    const contact = {
        firstName: firstname,
        lastName: lastname,
        address: adress,
        city: city,
        email: document.querySelector("#inputmail").value,
        };

    const bcommande = {
        prodAddLstorage,
        prixtotal,
        contact,
    };

//-----------------------------------------------VALIDATION DU FORMULAIRE------------------------------------------------

//FONCTION de controle et d'alert lié au formulaire

//fonction regex qui controle le prenom nom et ville.
const regexPNV = (value) =>{
    return /^[A-Za-z\s-]{3,20}$/.test(value);
};
// fonction regex qui controle lemail
const regexmail = (value) =>{
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};
//fonction regex qui controle l'adresse 
const regexadress = (value) =>{
return /^[A-Za-z0-9\s]{5,50}$/.test(value);
};

//fonction pour l'alert en cas d'erreur
const pnvinval =(value)=>{
    return value + `: Chiffre et symbole ne sont pas autorisé dans ce champ,3 caractères minimum`
};

// --- Controle des valeur mise dans le formulaire en true or false. 
function control_name() {
    const valfname = contact.firstName;
    if(regexPNV(valfname)){
    return true;
    }else{
    
    pnvinval("Nom")
    return false;
    }
    };

function control_lastname() {
    const vallname = contact.lastName;
    if(regexPNV(vallname)){
    return true;
    }else{
   
    pnvinval("Prenom")
    return false;
    }
    };

function control_city(){
    const valcity = contact.city;
    if(regexPNV(valcity)){
    return true;
    }else{
    
    pnvinval("Ville")
    return false;
    }
};

function control_mail(){
    const valmail = contact.email;
    if(regexmail(valmail)){
        return true;
        }else{
        alert("L'email n'est pas valide")
        return false;
        }
};

function control_adress(){
    const valadress = contact.address;
    if(regexadress(valadress)){
        return true;
        }else{
        alert("L'adresse n'est pas valide")
        return false;
        }
};

//---------------------------------------------FIN VALIDATION DU FORMULAIRE---------------

if (control_name() && control_lastname() && control_city() && control_mail() && control_adress()) {
    localStorage.setItem("bcommande", JSON.stringify(bcommande));

//-----Envois de la commande dans backend.

//recupération des ID produit pour un tableau.
produitIdCommande = [];
for (let i = 0; i < prodAddLstorage.length; i++) {
    let produitId = prodAddLstorage[i].id_produit;
    //Mettre les id recuprer dans le tableau/variable "produitIdCommande"
    produitIdCommande.push(produitId);
    
}


let commandback = {
    products: produitIdCommande,
    contact: contact,
}

fetch("http://localhost:3000/api/"+categorie+"/order",{
    method: "POST",
    body: JSON.stringify(commandback),
    headers: {
        "Content-Type":"application/json"
    }
})
/*.then ((breponse)=>{

}) */
.then(function(breponse){
    return breponse.json();
})
.then(function(bdata){
    console.log(bdata);
    localStorage.setItem("ID_order", JSON.stringify(bdata));
    localStorage.removeItem("danspanier");
    window.location.href = "confirmation.html";
})




}else{
    alert("Veuillez bien remplir le formulaire")
}
//localStorage.setItem("bcommande", JSON.stringify(bcommande));

//--------------------------------
})


})