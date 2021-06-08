

function affiche(valeur)
{
    document.write('<p> Dragon :'+valeur.HPDragon+" Heros:"+valeur.HPPlayer+'</p>')
}

function afficheJeu(valeur)
{
    //document.write('<p> Dragon :'+valeur.HPDragon+" Heros:"+valeur.HPPlayer+'</p>')
    document.write('<div class="game-state">');
    document.write('<figure class="game-state_player">');
    if (valeur.HPPlayer > jeuInit.HPPlayer * 30/100){
        document.write('<img src="images/knight.png" alt="Chevalier">');
    }
    else{
        document.write('<img src="images/knight-wounded.png" alt="Chevalier">'); 
    }
    document.write('<figcaption>'+Math.round(valeur.HPPlayer)+'</figcaption>');
    document.write('<meter min="0" max="100" value="'+valeur.HPPlayer+'">'+valeur.HPPlayer+'points</meter>');
    document.write('</figure>');
    document.write('<figure class="game-state_player">');
    if (valeur.HPDragon > jeuInit.HPDragon * 30/100){
        document.write('<img src="images/dragon.png" alt="Dragon">');
    }
    else{
        document.write('<img src="images/dragon-wounded.png" alt="Dragon">');
    }
    document.write('<figcaption>'+Math.round(valeur.HPDragon)+'</figcaption>');
    document.write('<meter min="0" max="100" value="'+valeur.HPDragon+'">'+valeur.HPDragon+'points</meter>');
    document.write('</figure>');
    document.write('</div>');
}

function afficheEnlevePointDragon(dommage){
    document.write('<figure class="game-round">');
    document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
    document.write('<figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' +Math.round(dommage.HPDragon)+ ' points de dommage !</figcaption>');
    document.write('</figure>');
}

function afficheEnlevePointPlayer(dommage){
    document.write('<figure class="game-round">');
    document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
    document.write('<figcaption>Le dragon prend l\'initiative, vous attaque et vous inflige '+ Math.round(dommage.HPPlayer)+' points de dommage !</figcaption>');
    document.write('</figure>');
}

function throwDices(dices, sides)
{
    let sum = 0;

    //boucle pour chaque dès
    for(let i = 0; i<dices; i++){
        //lancer aléatoire di 1 à sides
        let val = getRandomInteger(1, sides);
        //j'ajoute à somme le résultat obtenu
        sum += val;
    }
    return sum;
}

function initializeGame(choix){
    //Demande niveau de difficulté
    //let choix = "3";
    let game={};
    switch (choix){
        case "1":
            // En mode facile :
            game.HPDragon = 100 + throwDices(5, 10);
            game.HPPlayer = 100 + throwDices(10, 10); 
            break;
        
        case "2":
            //Niveau normale
            game.HPDragon = 100 + throwDices(10, 10);
            game.HPPlayer = 100 + throwDices(10, 10); 
            break;
            
        case "3":
            //En mode difficile :
            game.HPDragon = 100 + throwDices(10, 10);
            game.HPPlayer = 100 + throwDices(7, 10); 
            break;

        default:
            document.write("<p>Erreur : vous avez indiqué un niveau inconnue !</p>");
            break;
    }
    return game;
}

function initiative(personnage){
    let init={};
    
    //Calcul de l'initiative
    init.HPDragon = throwDices(10, 6);
    init.HPPlayer = throwDices(10, 6); 
    //- le **voleur** est rapide, son **initiative** est majorée de **1D6%**. Par exemple s'il lance 1D6 et qu'il obtient 4, il aura 4% de bonus.

    if (personnage == "voleur"){
        let maj = throwDices(1, 6) / 100;
        init.HPPlayer +=  init.HPPlayer*maj;
    }
    return init;
}

function damages(choix,personnage){
    let dam={};
     //Demande niveau de difficulté
 
    dam.HPDragon = throwDices(3, 6);
    dam.HPPlayer = throwDices(3, 6);
    switch (choix){
        case "1":
            // En mode facile :
            //*le dragon attaque alors  Niveau facile : les points de dommages pour le joueur sont minorés de 2D6%.
            dam.HPPlayer -= dam.HPPlayer * Math.round(throwDices(2, 6)/100); 
            //le joueur attaque Niveau facile : les points de dommages du dragon sont majorés de 2D6%.
            dam.HPDragon += dam.HPDragon * Math.round(throwDices(2, 6)/100);
            break;
        
        case "2":
            //Niveau normale
            // ne change rien
            break;
            
        case "3":
            //En mode difficile :
            //si le dragon attacque Niveau difficile : les points de dommages du joueur sont majorés de 1D6%.
            dam.HPPlayer += Math.round(dam.HPPlayer * throwDices(1, 6)/100);
            //si le joueur attaque Niveau difficile : les points de dommages du dragon sont minorés de 1D6%.
            dam.HPPDragon -= Math.round(dam.HPDragon * throwDices(1, 6)/100); 
            break;

        default:
                document.write("<p>Erreur : vous avez indiqué un niveau inconnue !!!</p>");
                break;
    }

    if (personnage=="chevalier"){
        //- l'attaque du dragon contre le **chevalier** est minorée de **1D10%**, car son armure le protège.
        console.log('avant dammage player');
        console.log(dam.HPPlayer);
        let m = throwDices(1, 10)/100;
        console.log(m);
        dam.HPPlayer -= dam.HPPlayer * m;
        console.log('après dammage player');
        console.log(dam.HPPlayer);
    }

    if (personnage=="mage"){
    //- l'attaque du **mage** est majorée de **1D10%**, il possède un sort de boule de feu très puissant.
    //donc le dommage du dragon est majorée de 1D10%*
    console.log('avant dammage player');
        console.log(dam.HPPlayer);
        let m = throwDices(1, 10)/100;
        console.log(m);
        dam.HPPDragon += dam.HPDragon * m; 
        console.log('après dammage player');
        console.log(dam.HPPlayer);
    }

    return dam;
}

function resultatCombat(jeu){
    if (jeu.HPDragon>0){
        document.write('<figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption>');
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
    }
    else{
        document.write('<figcaption>Vous avez gagné le combat, le dragon est carbonisé !</figcaption>');
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');  
    }   
}  
/*L'idée est de proposer au joueur parmis 3 classes de personnages :
- **chevalier**
- **voleur**
- **mage**

Chaque classe a une particularité :
- le **voleur** est rapide, son **initiative** est majorée de **1D6%**. Par exemple s'il lance 1D6 et qu'il obtient 4, il aura 4% de bonus.
- l'attaque du dragon contre le **chevalier** est minorée de **1D10%**, car son armure le protège.
- l'attaque du **mage** est majorée de **1D10%**, il possède un sort de boule de feu très puissant.*/

//main
    let jeu = {};
    const jeuInit = {};

    //choix du niveau
    let choix; 
    do{
        choix= window.prompt('Choisir le niveau du jeux :');
        choix = choix.toLowerCase();
    }while(choix !="1" && choix !="2" && choix !="3");
    document.write("<p>Niveau de jeu :"+choix);

    //choix du personnage
    let personnage;
    do{
        personnage = window.prompt('Choisir le personnage :');
        personnage = personnage.toLowerCase();
    }while(personnage !="chevalier" && personnage !="voleur" && personnage !="mage");
    document.write(" Le personnage :"+personnage+"</p>");

    jeu = initializeGame(choix); //Initialisation

    //enregistrer la valeur initiale des personnages afinde faire le calcule de % de vie 
    jeuInit.HPDragon = jeu.HPDragon;
    jeuInit.HPDragon = jeu.HPDragon;

    //<!-- Affichage de l Etat initial du jeu -->
    document.write('<div class="game-state">');
    document.write('<figure class="game-state_player">');
    document.write('<img src="images/knight.png" alt="Chevalier">');
    document.write('<figcaption>'+jeu.HPDragon+'</figcaption>');
    document.write('<meter min="0" max="100" value="100">100 points</meter>');
    document.write('</figure>');
    document.write('<figure class="game-state_player">');
    document.write('<img src="images/dragon.png" alt="Dragon">');
    document.write('<figcaption>'+jeu.HPPlayer+'</figcaption>');
    document.write('<meter min="0" max="100" value="100">100 points</meter>');
    document.write('</figure>');
    document.write('</div>');


    //on commence le tour par le numéro 1
    let tour = 0; 
    document.write("On commence le jeux");
    do
    {
        tour++;
        document.write("<h3>Tour n°"+tour+"</h3>");

        //Initiative
        let initiat = {};
        initiat = initiative(personnage); //prendre l'Initiative

        //calcule du dommage en jeu normale
        let dommage=damages(choix,personnage); 

        //si le heros a l'initiative supérieur
        if (initiat.HPPlayer > initiat.HPDragon){
            //on enlève de point au dragon
            jeu.HPDragon -= dommage.HPDragon;
            afficheEnlevePointDragon(dommage);
        }
        else {
            //on enlève de point au heros
            jeu.HPPlayer -= dommage.HPPlayer;
            afficheEnlevePointPlayer(dommage);
        }

        document.write("Point de jeux:");
        afficheJeu(jeu);

    } while(jeu.HPDragon>0 && jeu.HPPlayer>0);

    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure class="game-end"></figure>');
    resultatCombat(jeu);
    document.write('</figure>');
    document.write('</footer>');