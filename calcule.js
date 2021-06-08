
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)

function affiche(valeur)
{
    document.write('<p> Dragon :'+valeur.HPDragon+" Heros:"+valeur.HPPlayer+'</p>')
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

function damages(){
    let dam={};
    dam.HPDragon = throwDices(3, 6);
    dam.HPPlayer = throwDices(3, 6);
    return dam;
}

function initializeGame(){
    //Demande niveau de difficulté
 /*   facile HPDragon
        HPPlayer

        normale HPDragon
        HPPlayer
    difficile HPDragon
    HPPlayer*/
    let game={};

    game.HPDragon = 100 + throwDices(5, 10);
    game.HPPlayer = 100 + throwDices(10, 10); 
    return game;
}

function initiative(){
    let init={};
    //Calcul de l'initiative
    init.HPDragon = throwDices(10, 6);
    init.HPPlayer = throwDices(10, 6); 
    return init;
}

/*function showGameState(){
    affiche les PV et images de chaque joueur
}*/



//on commence le tour par le numéro 1
let tour = 0; 
let jeu = {};
jeu = initializeGame(); //Initialisation
document.write("Valeur Initiale :");
affiche(jeu);



document.write("On commence le jeux");
do
{
    tour++;
    document.write("Numéro de tour"+tour+"<br>");

    //Initiative
    //let heros = throwDices(10, 6);
    //let dragon = throwDices(10, 6);
    let initiat = {};
    initiat = initiative(); //prendre l'Initiative
    document.write("Initiative :");
    affiche(initiat);
   
     //calcule du dommage en jeu normale
    let dommage=damages(); 
    document.write("Taux de dommage :");
    affiche(dommage);

    //si le heros a l'initiative supérieur
    if (initiat.HPPlayer > initiat.HPDragon){
        //on enlève de point au dragon
        jeu.HPDragon -= dommage.HPDragon; 
        //pvDragon =  pvDragon - dommage; 
    }
    else {
        //on enlève de point au heros
        jeu.HPPlayer -= dommage.HPPlayer;
    }

    document.write("Point de jeux:");
    affiche(jeu);
    
} while(jeu.HPDragon>0 && jeu.HPPlayer>0);

document.write("on sort du boucle")
if (jeu.HPDragon>0){
    document.write("Le Dragon a gagné avec :");
    document.write(jeu.HPDragon);
}
else{
    document.write("Le Heros a gagné avec :");
    document.write(jeu.HPPlayer);
    
}