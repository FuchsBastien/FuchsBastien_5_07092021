//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const id = urlParams.get('id');
console.log(id);


//let storedTeddies = null;
//console.log(storedTeddies);

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
            

            
            const label1 = document.createElement ('label');
            form.appendChild(label1);
            label1.textContent= 'Couleur disponible : ';

            const select1 = document.createElement ('select');
            form.appendChild(select1);
            select1.setAttribute='name','color';
            select1.setAttribute='id','color';

            /*ajout couleur teddy_detail_description*/
            const colors = teddy.colors;
            console.log(colors);

            for (i = 0; i < colors.length; i++) {
                const option = document.createElement('option');
                select1.appendChild(option);
                option.textContent = colors[i];
                option.setAttribute("value", colors[i]);
            }


            const label2 = document.createElement ('label');
            form.appendChild(label2);
            label2.textContent= 'Quantité : ';

            const select2 = document.createElement ('select');
            form.appendChild(select2);
            select2.setAttribute='name','quantity';
            select2.setAttribute='id','quantity';

            /*ajout quantité teddy_detail_description*/
            const quantity = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000];
            console.log(quantity);
        
            for (i = 0; i < quantity.length; i++) {
                const option2 = document.createElement('option');
                select2.appendChild(option2);
                option2.textContent = quantity[i]/1000;
                option2.setAttribute("value", quantity[i]);
            }

            /*-----------------------------------------------------------------------*/

            /*création bouton panier teddy_detail_description*/
            let teddyBasket = document.createElement('button');
            teddyDetailDescription.appendChild(teddyBasket);
            teddyBasket.textContent = 'ajouter au panier';
            teddyBasket.className = 'teddy_basket';



            /*récupération donnée et envoi au panier"*/
            teddyBasket.addEventListener ("click", function(e) {
                e.preventDefault();
            
                /*stockage des données du/des teddy souhaité dans localStorage*/
                let teddiesChoosen = {
                teddyName: teddy.name,
                teddyId: teddy._id,
                teddyColor: select1.value,
                teddyPrice: teddy.price / 100 * select2.value/1000,
                quantity: select2.value /1000,
                };
                console.log(teddiesChoosen);


                let storedTeddies = JSON.parse(localStorage.getItem('newArticle'));
                console.log(storedTeddies);


                let color = JSON.parse(localStorage.getItem('color'));

                //tableau localstorage plein
                if (storedTeddies === null) {
                    console.log("appliquer ajouterTeddy");
                    ajouterTeddy(teddiesChoosen, storedTeddies,color)
                }

                else {
                    console.log("appliquer rechercheTeddy");
                    rechercheTeddy(teddiesChoosen, storedTeddies, color)
                }

            })


            //ajouter 1er teddy 
            function ajouterTeddy(teddiesChoosen, storedTeddies, color) {
                storedTeddies = [];
                storedTeddies.push(teddiesChoosen) 
                localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                console.log(storedTeddies);
                color = [];
                color.push(teddiesChoosen.teddyColor + teddiesChoosen.teddyName)
                localStorage.setItem('color', JSON.stringify(color));
                console.log(color);

                window.confirm(teddiesChoosen.quantity +" " + teddiesChoosen.teddyName + " " + teddiesChoosen.teddyColor + ' a bien été ajouté à votre panier')

                
                //let teddyColor = select1.value;

                /*if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    //redirection vers la page panier
                    window.location.href = "panier.html";
                    } 
                else {
                    //redirection vers la page index
                    window.location.href = "index.html";
                }*/
            }


            //rechercher teddy équivalent (même Id et couleur)
            function rechercheTeddy(teddiesChoosen, storedTeddies, color) {
                console.log(teddiesChoosen);
                console.log(storedTeddies);
                let newPrice = teddiesChoosen.teddyPrice;
                let newQuantity = teddiesChoosen.quantity;

           
                for (let i = 0; i < storedTeddies.length; i++) {
                    const currentValue = storedTeddies[i]
                    console.log(currentValue);

                    //si équivalent on met à jour le teddy existant en quantité et prix
                    if (teddiesChoosen.teddyColor === currentValue.teddyColor &&  teddiesChoosen.teddyId === currentValue.teddyId) {  
                        newPrice = newPrice + currentValue.teddyPrice;
                        newQuantity = newQuantity + currentValue.quantity;
                        currentValue.teddyPrice = newPrice;
                        currentValue.quantity= newQuantity;
                        localStorage.setItem('newArticle', JSON.stringify(storedTeddies)); 

                        window.confirm(teddiesChoosen.quantity +" " + teddiesChoosen.teddyName + " " + teddiesChoosen.teddyColor + ' a bien été ajouté à votre panier')
                        
                        return                
                    } 

                    else {
                        //si pas équivalent et modèle teddy non enregistré dans le panier on continue l'itération
                        if (color.includes(teddiesChoosen.teddyColor + teddiesChoosen.teddyName )) {
                           continue 
                        }
                        //sinon on enregistre le modèle de Teddy et sa couleur
                        else {
                            storedTeddies.push(teddiesChoosen)
                            console.log(storedTeddies);
                            localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                            color.push(teddiesChoosen.teddyColor + teddiesChoosen.teddyName)
                            console.log(color);
                            localStorage.setItem('color', JSON.stringify(color));

                            window.confirm(teddiesChoosen.quantity +" " + teddiesChoosen.teddyName + " " + teddiesChoosen.teddyColor + ' a bien été ajouté à votre panier')
                            
                            return
                        }                       
                    }
                }    
            }

           /* if (ok.includes("correspondance")) {
                storedTeddies.push(teddiesChoosen)
                console.log(storedTeddies);
                localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                ok = [];
            }*/

                //ajouter teddy si pas teddy équivalent
                /*function ajouterTeddy(teddiesChoosen, storedTeddies) {
                    storedTeddies.push(teddiesChoosen)
                    console.log("ajouterTeddy est true");
                }*/
        


               /*//tableau local storage plein
               if (storedTeddies!==null) {
                   //si teddy équivalent appliquer la fonction
                    if (rechercheTeddy()==true){
                    rechercheTeddy()
                    console.log("appliquer rechercheteddy");
                    }
                    //si pas teddy équivalent appliquer la fonction ajouterteddy
                    else {
                    ajouterTeddy()
                    console.log("appliquer ajouterteddy");
                    }
               localStorage.setItem('newArticle', JSON.stringify(storedTeddies));   
               } 

               //tableau local storage vide
               else {
               storedTeddies = [];
               storedTeddies.push(teddiesChoosen);
               localStorage.setItem('newArticle', JSON.stringify(storedTeddies));   
               console.log(storedTeddies);
               }



               //rechercher teddy équivalent (même Id et couleur)
               function rechercheTeddy() {
                let newPrice = teddiesChoosen.teddyPrice;
                let newQuantity = teddiesChoosen.quantity;
             
                 for (let i = 0; i < storedTeddies.length; i++) {
                     const currentValue = storedTeddies[i]
     
                     if (teddiesChoosen.teddyColor === currentValue.teddyColor &&  teddiesChoosen.teddyId === currentValue.teddyId) {  
                     newPrice = newPrice + currentValue.teddyPrice;
                     newQuantity = newQuantity + currentValue.quantity;
                     currentValue.teddyPrice = newPrice;
                     currentValue.quantity= newQuantity;
                     console.log("rechercheteddy est true");
                     }  
                     
                     else {
                    console.log("rechercheteddy est false");
                    }
                   }              
                }
 
              //ajouter teddy si pas teddy équivalent
               function ajouterTeddy() {
                  storedTeddies.push(teddiesChoosen)
                  console.log("ajouterTeddy est true");
             }
 


              //function rechercheTeddy() { 
               /* let rep = storedTeddies.indexOf("5be9c8541c9d440000665243")
                console.log(rep + 'je suis avant le -1' );
               const found = storedTeddies.find(teddiesChoosen.teddyId == "5be9c8541c9d440000665243");
               console.log(found);
              
               
               if (rep!==1){
                    console.log(rep+ 'je suis dans le -1');
                    if (storedTeddies[rep].teddyColor === teddiesChoosen.teddyColor){
                        let insertTeddy = new Object ()
                        console.log(insertTeddy);
                        insertTeddy.teddyName = teddy.name, insertTeddy.teddyId = teddy._id, insertTeddy.teddyColor=select1.value, insertTeddy.teddyPrice= storedTeddies[rep].teddyPrice + (teddy.price / 100 * select2.value/1000),
                        insertTeddy.quantity = storedTeddies[rep].quantity  + (select2.value /1000)
                        storedTeddies [rep] = insertTeddy
                        console.log(storedTeddies)
                    }
                    else {
                     storedTeddies.push (teddiesChoosen);
                     console.log(storedTeddies)
                    }
                }
                else {
                storedTeddies.push(teddiesChoosen);
                console.log(storedTeddies)
                }
              }*/



               /*const teddyColor = select1.value;

                if(storedTeddies) {
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        //redirection vers la page panier
                        //window.location.href = "panier.html";
                    } 
                    else {
                        //redirection vers la page index
                        //window.location.href = "index.html";
                    }
                }

                else {
                    storedTeddies = [];
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                         //redirection vers la page panier
                        //window.location.href = "panier.html";
                    } 
                    else {
                        //redirection vers la page index
                        //window.location.href = "index.html";
                    }
                }
            }) */
            
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


