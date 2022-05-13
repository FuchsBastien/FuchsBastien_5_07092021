//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

async function getTeddies () {

    try {
        /*récupération api*/
        let response = await fetch("http://localhost:3000/api/teddies/" + id);
        if (response.ok) {
          let teddy = await response.json();  
           console.log (teddy); 

           /*récupération main teddies_detail*/
          const teddyMain = document.getElementById ('teddy_main');

          /*création h1 teddy_main*/
          const teddyMainH2 = document.createElement('h2');
          teddyMain.appendChild(teddyMainH2);
          teddyMainH2.textContent = teddy.name;

          /*création div teddy_detail_frame*/
          const teddyDetailFrame = document.createElement ('div');
          teddyMain.appendChild(teddyDetailFrame);
          teddyDetailFrame.className= 'teddy_detail_frame';

          /*création div teddy_detail*/
          const teddyDetail = document.createElement ('div');
          teddyDetailFrame.appendChild(teddyDetail);
          teddyDetail.className= 'teddy_detail';

          /*création image teddy_detail*/
          const teddyDetailPicture = document.createElement ('img');
          teddyDetail.appendChild(teddyDetailPicture);
          teddyDetailPicture.className= 'teddy_detail_picture';
          teddyDetailPicture.setAttribute('src', teddy.imageUrl);

          /*création div teddy_detail_description*/
          const teddyDetailDescription = document.createElement ('div');
          teddyDetailFrame.appendChild(teddyDetailDescription);
          teddyDetailDescription.className= 'teddy_detail_description';

           /*création description teddy_detail_description*/
          const teddyDescription =document.createElement ('div');
          teddyDetailDescription.appendChild(teddyDescription);
          teddyDescription.textContent=teddy.description;

          /*création prix teddy_detail_description*/
          const teddyPrix = document.createElement ('p');
          teddyDetailDescription.appendChild(teddyPrix);
          teddyPrix.textContent=teddy.price /100 + " euros";

          /*création choix couleur teddy_detail_description*/
          const form = document.createElement ('form');
          teddyDetailDescription.appendChild(form);

          const label = document.createElement ('label');
          form.appendChild(label);
          label.textContent= 'Couleur disponible : ';

          const select = document.createElement ('select');
          form.appendChild(select);
          select.setAttribute='name','color';
          select.setAttribute='id','color';

          /*ajout couleur teddy_detail_description*/
          const colors = teddy.colors;
          console.log(colors);

          for (i = 0; i < colors.length; i++) {
            const option = document.createElement('option');
            select.appendChild(option);
            option.textContent = colors[i];
            option.setAttribute("value", colors[i]);
          }

          /*-----------------------------------------------------------------------*/

          /*création bouton panier teddy_detail_description*/
          let teddyBasket = document.createElement('button');
          teddyDetailDescription.appendChild(teddyBasket);
          teddyBasket.textContent = 'ajouter au panier';
          teddyBasket.className = 'teddy_basket';

          /*récupération donnée et envoi au panier"*/
          teddyBasket.addEventListener ("click", function (choice) {
            choice.preventDefault();
          
            /*stockage des données du/des teddy souhaité dans localStorage*/
                let teddiesChoosen = {
                teddyName: teddy.name,
                teddyId: teddy._id,
                teddyColor: select.value,
                teddyPrice: teddy.price / 100,
                quantity: 1,
                };
                console.log(teddiesChoosen);

                    
                let storedTeddies = JSON.parse(localStorage.getItem('newArticle'));

                const teddyColor = select.value;

                if(storedTeddies) {
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } 
                    else {
                        window.location.href = "index.html";
                    }
                } 

                else {
                    storedTeddies = [];
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } 
                    else {
                        window.location.href = "index.html";
                    }
                }
            
              })     
        }

        else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    }

    catch (error) {
        alert("Erreur : " + error);
    }
}

 /*appel fonction */
getTeddies()


