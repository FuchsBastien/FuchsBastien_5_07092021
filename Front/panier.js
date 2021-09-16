/*récupération données localStorage*/
let storedTeddies = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedTeddies);

/*-----------------------------------------------------------------------*/

/*récupération div product_page*/
const productPage = document.getElementById('product_page');

/*-----------------------------------------------------------------------*/

/*création div total_basket*/
const totalBasket = document.createElement('div');
productPage.appendChild(totalBasket);
totalBasket.className = 'total_basket';

/*création h1 totalBasket*/
const totalBasketh1 = document.createElement('h1');
totalBasket.appendChild(totalBasketh1);
totalBasketh1.textContent='Vos oursons : ';

/*-----------------------------------------------------------------------*/

/*si le panier est vide*/
if (storedTeddies == null || storedTeddies.length === 0){
    /*création p total_basket*/
   const emptyBasket = document.createElement('div');
   totalBasket.appendChild(emptyBasket);
   emptyBasket.textContent='Votre panier est vide';
}

/*si le panier est rempli*/
else {
  /*variable prix*/
  let i = 0;
  
  for (let storedTeddy of storedTeddies) {
    /*création div each_teddy*/
    const eachTeddy = document.createElement('div');
    totalBasket.appendChild(eachTeddy);
    eachTeddy.className = 'each_teddy';

    /*création div each_teddy_detail*/
    const eachTeddyDetail = document.createElement('div');
    eachTeddy.appendChild(eachTeddyDetail);
    eachTeddyDetail.textContent = storedTeddy.quantity + " " + storedTeddy.teddyName + ","+ storedTeddy.teddyColor;

    /*creation div each_teddy_price*/
    const eachTeddyPrice = document.createElement('div');
    eachTeddy.appendChild(eachTeddyPrice);
    eachTeddyPrice.className = 'each_teddy_price';
    /*création id pour chaque teddy en fonction de la variable i*/
    eachTeddyPrice.id = i++;
    eachTeddyPrice.textContent = storedTeddy.teddyPrice +" euros ";

   /*-----------------------------------------------------------------------*/

    /*création bouton suppression d'un teddy*/
    const teddyDelete = document.createElement('button');
    eachTeddyPrice.appendChild(teddyDelete);
    teddyDelete.className = 'teddy_Delete';
    teddyDelete.title = 'Supprimer cet article ?';

    /*création icone bouton suppression d'un teddy*/
    const TeddyDeleteIcon = document.createElement('i');
    teddyDelete.appendChild(TeddyDeleteIcon);
    TeddyDeleteIcon.className = 'fas fa-trash-alt';
  }

   /*-----------------------------------------------------------------------*/

   /*récupération article associé au bouton suppression*/
   let teddyDelete = document.getElementsByClassName ('teddy_Delete');
   for (let i = 0 ; i < teddyDelete.length; i++) {
     teddyDelete[i].addEventListener('click' , function (event) { 
           event.preventDefault();
           let id = this.closest('.each_teddy_price').id;
 
           /*on supprime l'article du local storage*/
           storedTeddies.splice(id, 1);
 
           //on enregistre le nouveau localStorage
           localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
           JSON.parse(localStorage.getItem('newArticle'));
 
           alert('Cet article a bien été supprimé !');
           window.location.href = "panier.html";   
       })
     }
 
  /*-----------------------------------------------------------------------*/
      
      /*calcul du montant total*/
      let calculPrice = []
      for (storedTeddy of storedTeddies) {
          let article = storedTeddy.teddyPrice;
          calculPrice.push(article);
          console.log(calculPrice);
      };

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalPrice = calculPrice.reduce(reducer, 0);
      console.log(totalPrice);

      /*-----------------------------------------------------------------------*/
      
      /*création paragraphe montant total*/
      const total = document.createElement('p');
      totalBasket.appendChild(total);
      total.className = 'total';
      total.textContent = "Montant total : " + totalPrice + " euros";

      /*-----------------------------------------------------------------------*/

      /*création d'un bouton pour vider le panier*/
      const garbage = document.createElement('button');
      totalBasket.appendChild(garbage);
      garbage.className = 'icon_garbage';

      const cartLink = document.createElement('a');
      garbage.appendChild(cartLink);
      cartLink.href = "panier.html";
      cartLink.id = "cart_link"
      cartLink.title = 'Vider le panier';
      cartLink.textContent = "Vider mon panier ";

      const icon = document.createElement('i');
      cartLink.appendChild(icon);
      icon.className = 'fas fa-trash-alt'

      garbage.addEventListener("click", function (event) {
          event.preventDefault();
          localStorage.removeItem('newArticle');
          alert('Votre panier a bien été vidé !')
          window.location.href = "panier.html";
      });



}
 
  
