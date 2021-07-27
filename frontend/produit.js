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

// Position des elements texte changé.
    document.querySelector("#leproduit h5").textContent = data.name;
    document.querySelector("#leproduit p").textContent = data.description;
    document.querySelector("#leproduit img ").src = data.imageUrl;
    document.querySelector(".price").textContent = data.price / 100 + "€";
//Déclaration d'une variable pour le tableau des optiond<;
    let options = data.lenses ;
// Boucle pour afficher les options
    for (let i = 0; i < options.length; i++) {
        console.log(options);
        let option = options[i];
        let numoption = i+1;
        let positionopt = document.querySelector("#leproduit select");
        positionopt.innerHTML +=`
        <option value="${numoption}">${option}</option>
        `
    }
    
})