// recupération des produit de L'API. D
fetch('http://localhost:3000/api/cameras')
.then(function(reponse){
    return reponse.json();
})
//Alternatif d'appelle de fonction : .then((reponse) => { return reponse.json()});
.then (function(data){
    console.log(data);
let name = data[0].name;
console.log(name);

let contener = document.querySelector(".test")
let div = document.createElement("div");
div.innerHTML = `<p>Je suis la div créer ${name} </p>`;

contener.appendChild(div);

})
//Alternatif d'apelle de fonction : .then((data) =>{console.log(data);})

// recupération des produit de L'API. F








