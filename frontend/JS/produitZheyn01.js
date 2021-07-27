//Déclaration des variables
let categorie ="cameras";
let id = "5be9c4c71c9d440000a730e9" ;


//in
fetch('http://localhost:3000/api/' + categorie+"/"+id)
.then(function(reponse){
    return reponse.json();
})
.then(function(data){

    let prix = document.querySelector(".price");
    let price = data.price / 100;
    /*const name = document.querySelector("#leproduit h5");
    name.textContent = data.name;*/ 
    document.querySelector("#leproduit h5").textContent = data.name;
    document.querySelector("#leproduit p").textContent = data.description;
    document.querySelector("#leproduit img ").src = data.imageUrl;
    prix.textContent = data.price / 100 + "€";
})