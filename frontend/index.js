let categorie ="teddies"

// recupération des produit de L'API. D
fetch('http://localhost:3000/api/' + categorie)
.then(function(reponse){
    return reponse.json();
})
//Alternatif d'appelle de fonction : .then((reponse) => { return reponse.json()});
.then (function(data){
    console.log(data);


for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let imageUrl = data[i].imageUrl;
    let description = data[i].description; 
    let price = data[i].price / 100;
    let idproduit = data[i]._id;
    let contener = document.querySelector("#allproduit")
    let div = document.createElement("div");
    div.innerHTML = `
                    <div class="col">
                            <div class="card">
                                <img src=${imageUrl}>
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${description}</p>
                                    <a href="./produit.html?${idproduit}" class="btn btn-primary">${price}€</a>
                                </div>
                            </div>
                    </div>
                    `;
    contener.appendChild(div);
}
})
//Alternatif d'apelle de fonction : .then((data) =>{console.log(data);})

// recupération des produit de L'API. F








