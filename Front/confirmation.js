/*récupération du prix total de la commande*/
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);

/*-----------------------------------------------------------------------*/

/* récupération de l'id de la commande*/
let orderId = localStorage.getItem('responseOrder');
console.log(orderId);


/*-----------------------------------------------------------------------*/

/*récupération div product_page*/
const productPage = document.getElementById('product_page');


/*-----------------------------------------------------------------------*/

/*création div teddy_confirm*/
const teddyConfirm = document.createElement('div');
productPage.appendChild(teddyConfirm);
teddyConfirm.className = 'teddy_confirm';


/*création teddy_confirm_p*/
const teddy_confirm_p = document.createElement('h2');
teddyConfirm.appendChild(teddy_confirm_p);
teddy_confirm_p.textContent = "Récapitulatif de votre commande";

/*création teddy_confirm_order*/
const teddy_confirm_order = document.createElement('p');
teddyConfirm.appendChild(teddy_confirm_order);
teddy_confirm_order.textContent = "Numéro de commande : " + orderId;

/*création teddy_confirm_total*/
const teddy_confirm_total = document.createElement('p');
teddyConfirm.appendChild(teddy_confirm_total);
teddy_confirm_total.textContent = "Montant total : " + totalPrice + " euros";


/*-----------------------------------------------------------------------*/

/*création div note_of_thanks*/
const noteOfThanks = document.createElement('div');
productPage.appendChild(noteOfThanks);
noteOfThanks.className = 'note_of_thanks';

/*création p1*/
const teddyP1 = document.createElement('p');
noteOfThanks.appendChild(teddyP1);
teddyP1.textContent = "Nous vous remercions pour votre commande !";

/*création p2*/
const teddyP2 = document.createElement('p');
noteOfThanks.appendChild(teddyP2);
teddyP2.textContent = "Vos oursons vous seront bientôt expédiés";

/*création p3*/
const teddyP3 = document.createElement('p');
noteOfThanks.appendChild(teddyP3);
teddyP3.textContent = "A très bientôt chez Orinoco ! ";


/*-----------------------------------------------------------------------*/

/*Efface localStorage*/
localStorage.clear();




