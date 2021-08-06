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
const prixtotal = sommedupanier.reduce(reducer,0);

document.querySelector(".prix-total").textContent = prixtotal;


//-------------------------------Gestion formulaire---------------------------------------

//-------------------Bouton de commande-------------------
const btn_commande = document.querySelector(".btn-commande");

btn_commande.addEventListener("click", (e)=>{
    e.preventDefault;

//variable pour les formulaires
    let firstname = document.querySelector("#fname").value;
    console.log(firstname);
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
        }
        console.log("ici le contact"+contact);

    const bcommande = {
        produitenregistredanslocalstorage,
        prixtotal,
        contact,
    }
    console.log(bcommande);

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
    console.log(valfname);
    return true;
    }else{
    
    pnvinval("Nom")
    console.log("ICIC FAUX prénom");
    return false;
    }
    };

function control_lastname() {
    const vallname = contact.lastName;
    console.log(vallname);
    if(regexPNV(vallname)){
        console.log(vallname);
    return true;
    }else{
   
    pnvinval("Prenom")
    console.log("ICIC FAUX nom");
    return false;
    }
    };

function control_city(){
    const valcity = contact.city;
    if(regexPNV(valcity)){
    console.log(valcity);
    return true;
    }else{
    
    pnvinval("Ville")
    console.log("ICIC FAUXville");
    return false;
    }
};

function control_mail(){
    const valmail = contact.email;
    if(regexmail(valmail)){
        console.log(valmail);
        return true;
        }else{
        alert("L'email n'est pas valide")
        console.log("ICIC FAUX mail");
        return false;
        }
};

function control_adress(){
    const valadress = contact.address;
    console.log(valadress);
    if(regexadress(valadress)){
        console.log(valadress);
        return true;
        }else{
        alert("L'adresse n'est pas valide")
        console.log("ICIC FAUX adress");
        return false;
        }
};

//---------------------------------------------FIN VALIDATION DU FORMULAIRE---------------

if (control_name() && control_lastname() && control_city() && control_mail() && control_adress()) {
    localStorage.setItem("bcommande", JSON.stringify(bcommande));
}else{
    alert("Veuillez bien remplir le formulaire")
}
//localStorage.setItem("bcommande", JSON.stringify(bcommande));

//--------------------------------
})


})