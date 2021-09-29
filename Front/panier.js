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

    /*-----------------------------------------------------------------------*/

    /*création du formulaire de commande*/
    const form = document.createElement('form');
    productPage.appendChild(form);
    form.className = 'form';

    /*création titre formulaire de commande*/
    const formH1 = document.createElement('h1');
    form.appendChild(formH1);
    formH1.textContent = "Pour valider votre commande, merci de remplir ce formulaire : ";

    /*-----------------------------------------------------------------------*/

    /*création div last_name*/
    const DivLastName = document.createElement('div');
    form.appendChild(DivLastName);
    DivLastName.className = 'last_name';

    /*création label last_name*/
    const LabelLastName = document.createElement('label');
    DivLastName.appendChild(LabelLastName);
    LabelLastName.setAttribute('for','last_name');
    LabelLastName.textContent = 'Votre prénom : ';

   /*création input last_name*/
    const InputLastName = document.createElement('input');
    DivLastName.appendChild(InputLastName);
    InputLastName.setAttribute('type', 'text');
    InputLastName.setAttribute('class', 'name');
    InputLastName.setAttribute('placeholder', 'Bernard');
    InputLastName.name = "Prénom"
    InputLastName.required = true;

    /*création fonctions de validité prénom, nom, ville*/
    function isValid(value) {
      return /^[A-Z-a-z\s]{3,40}$/.test(value);
    };

    /*Validité du prénom*/
    InputLastName.addEventListener("change", function (event) {
      if (isValid(InputLastName.value)) {
      } 
      else {
          alert("Aucun chiffre ou symbole n'est autorisé.")
          event.preventDefault()
      }
    });

    /*-----------------------------------------------------------------------*/
    
    /*création div first_name*/
    const DivFirstName = document.createElement('div');
    form.appendChild(DivFirstName);
    DivFirstName.className = 'first_name';

    /*création label first_name*/
    const LabelFirstName = document.createElement('label');
    DivFirstName.appendChild(LabelFirstName);
    LabelFirstName.setAttribute('for','last_name');
    LabelFirstName.textContent = 'Votre nom : ';

    /*création input first_name*/
    const InputFirstName = document.createElement('input');
    DivFirstName.appendChild(InputFirstName);
    InputFirstName.setAttribute('type', 'text');
    InputFirstName.setAttribute('class', 'name');
    InputFirstName.setAttribute('placeholder', 'Dupond');
    InputFirstName.name = "Nom"
    InputFirstName.required = true;

   /*Validité du nom*/
    InputFirstName.addEventListener("change", function (event) {
      if (isValid(InputFirstName.value)) {
      } 
      else {
          alert("Aucun chiffre ou symbole n'est autorisé.")
          event.preventDefault()
      }
    });
  
    /*-----------------------------------------------------------------------*/

    /*création div adress_mail*/
    const DivAdressMail = document.createElement('div');
    form.appendChild(DivAdressMail);
    DivAdressMail.className = 'adress_mail';

    /*création label adress_mail*/
    const LabelAdressMail = document.createElement('label');
    DivAdressMail.appendChild(LabelAdressMail);
    LabelAdressMail.setAttribute('for','adress_mail');
    LabelAdressMail.textContent = 'Votre adresse mail : ';

    /*création input adress_mail*/
    const InputAdressMail = document.createElement('input');
    DivAdressMail.appendChild(InputAdressMail);
    InputAdressMail.setAttribute('type', 'email');
    InputAdressMail.setAttribute('class', 'name');
    InputAdressMail.setAttribute('placeholder', 'dupontbernard@gmail.com');
    InputAdressMail.name = "Nom"
    InputAdressMail.required = true;

    /*création fonctions de validité mail*/
    function validMail(value) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))|(".+")@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    };


     /*Validité du mail*/
     InputAdressMail.addEventListener("change", function (event) {
      if (validMail(InputAdressMail.value)) {
      } 
      else {
          alert("Veuillez saisir une adresse mail valide")
          event.preventDefault()
      }
    });

    /*-----------------------------------------------------------------------*/

    /*création div adress*/
    const DivAdress = document.createElement('div');
    form.appendChild(DivAdress);
    DivAdress.className = 'adress';

    /*création label adress*/
    const LabelAdress = document.createElement('label');
    DivAdress.appendChild(LabelAdress);
    LabelAdress.setAttribute('for','adress');
    LabelAdress.textContent = 'Votre adresse : ';

    /*création input adress*/
    const InputAdress = document.createElement('input');
    DivAdress.appendChild(InputAdress);
    InputAdress.setAttribute('type', 'text');
    InputAdress.setAttribute('class', 'name');
    InputAdress.setAttribute('placeholder', '38 Rue Neuve');
    InputAdress.name = "Nom";
    InputAdress.required = true;

    /*création fonctions de validité adresse*/
    function validAddress(value) {
      return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    };

    /*Validité de l'adresse*/
    InputAdress.addEventListener("change", function (event) {
      if (validAddress(InputAdress.value)) {
      } 
      else {
          alert("Aucun chiffre ou symbole n'est autorisé.")
          event.preventDefault()
      }
    });

    /*-----------------------------------------------------------------------*/

    /*création div city*/
    const DivCity = document.createElement('div');
    form.appendChild(DivCity);
    DivCity.className = 'city';

    /*création label city*/
    const LabelCity = document.createElement('label');
    DivCity.appendChild(LabelCity);
    LabelCity.setAttribute('for','city');
    LabelCity.textContent = 'Votre ville : ';

    /*création input city*/
    const InputCity = document.createElement('input');
    DivCity.appendChild(InputCity);
    InputCity.setAttribute('type', 'text');
    InputCity.setAttribute('class', 'name');
    InputCity.setAttribute('placeholder', 'Paris');
    InputCity.name = "Nom";
    InputCity.required = true;

  /*Validité de la ville*/
    InputCity.addEventListener("change", function (event) {
      if (isValid(InputCity.value)) {
      } 
      else {
          alert("Aucun chiffre ou symbole n'est autorisé.")
          event.preventDefault()
      }
    });

    /*-----------------------------------------------------------------------*/

    /*création bouton formulaire*/
    let formButton = document.createElement('button');
    form.appendChild(formButton);
    formButton.className = 'form_button';
    formButton.textContent ='Valider votre panier';

/*-----------------------------------------------------------------------*/

    /*envoi des données panier + contact au serveur si le formulaire est valide*/
    formButton.addEventListener("click", function (event) {
      if (isValid(InputLastName.value) && isValid(InputFirstName.value) && validAddress(InputAdress.value) && isValid(InputCity.value) && validMail(InputAdressMail.value)){
          event.preventDefault();

          /*envoi du prix total au localStorage*/
          localStorage.setItem('totalPrice', totalPrice);
          const storagePrice = localStorage.getItem('totalPrice');
          console.log(storagePrice);

          /*Création de l'objet "contact"*/
          let contact = {
              lastName: InputLastName.value,
              firstName: InputFirstName.value,
              address: InputAdress.value,
              city: InputCity.value,
              email: InputAdressMail.value,
          }
          console.log(contact);

          /*création du tableau "products" (id des oursons du panier)*/
                let products = [];
                for (storedTeddy of storedTeddies) {
                    let productsId = storedTeddy.teddyId;
                    products.push(productsId);
                }
                console.log(products);

          /*création d'un objet regroupant "contact" et "produits"*/
          let send = {
              contact,
              products,
          }
          console.log(send);

          

      }

  })
    
}
 
  
