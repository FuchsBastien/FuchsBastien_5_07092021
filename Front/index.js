async function appelerapi(){

    /*try {*/
        /*récupération api*/
        let response = await fetch("http://localhost:3000/api/teddies")
        if (response.ok) {
          let teddies = await response.json();  
           console.log (teddies); 

          for (let teddy of teddies) {
            /*récupération id teddies*/
            const teddiesDiv = document.getElementById('teddies');
            /*création div teddy_frame*/
            const teddyFrame = document.createElement('div');
            teddiesDiv.appendChild(teddyFrame);
            teddyFrame.className = 'teddy_frame';
            /*création div teddy*/
            const teddiesClass = document.createElement('div');
            teddyFrame.appendChild(teddiesClass);
            teddiesClass.className = 'teddy';
            /*création lien teddy*/
            const teddiesLink = document.createElement('a');
            teddiesClass.appendChild(teddiesLink);
            teddiesLink.href = "produit.html";
            teddiesLink.className = "teddy_details";
            /*création image teddy*/
            const teddyImg = document.createElement('img');
            teddiesLink.appendChild(teddyImg);
            teddyImg.className = 'teddy_picture';
            teddyImg.setAttribute('src', teddy.imageUrl);
            /*création div teddy_description*/
            const teddyDescription = document.createElement('div');
            teddyFrame.appendChild(teddyDescription);
            teddyDescription.className = 'teddy_description';
            /*création h3 teddy_description*/
            const h3TeddyDescription = document.createElement('h3');
            teddyDescription.appendChild(h3TeddyDescription);
            h3TeddyDescription.textContent = teddy.name;
            /*création p teddy_description*/
            const pTeddyDescription = document.createElement('h3');
            teddyDescription.appendChild(pTeddyDescription);
            pTeddyDescription.textContent = teddy.price /100 + " euros";
         }
        }
        else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    /*}

    catch (error) {
        alert("Erreur : " + error);
    }*/
}


appelerapi();


/*const getTeddies =  async function() {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');
        if (response.ok) {
            let teddies = await response.json();
            console.log(teddies);
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

getTeddies();*/




/*function appelerapi(){
    fetch("http://localhost:3000/api/teddies")
    
    .then(function(res){
      if (res.ok) {
      return res.json();   
      }
    })

   .then(function(value) {
    console.log(value);
    document.querySelector (".nom").innerText= value[0].name;
    document.querySelector (".image").src= value[0].imageUrl;
    document.querySelector (".prix").innerText= value[0].price;
   })

  .catch(function(err) {

  });
}


appelerapi()*/
