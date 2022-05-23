var img_carte=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

var etat=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 			// Etat des cartes: 0 pour les dos de cartes, 1 pour les cartes retournées, 2 pour les cartes trouvées
var carte_retourne=[];

var nb_paire_trouve=0;

var carte=document.getElementById("jeu").getElementsByTagName("img");

var score=0;
document.getElementById("score").innerHTML=score;

var compteur_win_lose=0;

for(var i=0;i<carte.length;i++){
	carte[i].num_carte=i; 								// Ajout de la propriété num_carte à l'objet img
	carte[i].onclick=function(){						// Ajout de la fonction controle jeu au clic de chaque img
		controleJeu(this.num_carte);
	}                      
}

initialiseJeu();

function majAffichage(num_carte){										// Fonction d'actualisation de l'affichage en fonction de l'état des cartes
	document.getElementById("score").innerHTML=score;
	switch(etat[num_carte]){
		case 0:
			carte[num_carte].src="img/dos2carte.jpg";
			break;
		case 1:
			carte[num_carte].src="img/c"+img_carte[num_carte]+".jpg";
			break;
		case 2:
			carte[num_carte].style.visibility="hidden";
			break;
	}
}

function rejouer(){													// Fonction de fin de partie
	if(score<0){
		alert("Tu n'es vraiment pas doué, ton score minable est de "+score+" points!");
	}
	if(score>=0 && score<=75){
		alert("C'est pas trop mal, ton score est de "+score+" points!");
	}
	if(76<=score && score<=150){
		alert("Bien joué, ton score est de "+score+" points!");
	}
	if(151<=score){
		alert("GG t'es trop fort, ton score est de "+score+" points!");
	}
	location.reload();
}

function initialiseJeu(){										// Fonction d'initialisation du jeu, le tableau img_carte changeme l'index des valeurs aléatoirement
	for(var position=img_carte.length-1; position>=1; position--){
		var RNG=Math.floor(Math.random()*(position+1));
		var save=img_carte[position];					// sauvegarde de img_carte[position]										|
		img_carte[position]=img_carte[RNG];				// img_carte[position] devient img_carte[RNG]								| En gros on inverse
		img_carte[RNG]=save;							// et pour garder tous le temps 2 valeur identique dans img_carte[], 		| img_carte[position] et img_carte[RNG]
														// img_carte[RNG] devient img_carte[position] (la position sauvegarder)		|
	}
}

function controleJeu(num_carte){		// fonction principale du jeu

	if(carte_retourne.length<2){

		if(etat[num_carte]==0){
			etat[num_carte]=1;
			carte_retourne.push(num_carte);			// rajoute a carte_retourne num_carte
			majAffichage(num_carte);
		}

		if(carte_retourne.length==2){
			var new_etat=0;														// le nouvel etat passe a 0 de base
			if(img_carte[carte_retourne[0]]==img_carte[carte_retourne[1]]){		// si les 2 cartes retournées sont identique leur nouvel etat sera 2
				new_etat=2;
				nb_paire_trouve++;
				if(compteur_win_lose<0){			// si le compteur_win_lose est négatif, il repasse à 0
					compteur_win_lose=0;
				}
				if(compteur_win_lose==0){
					score+=12;
				}
				if(compteur_win_lose==1){
					score+=24;
				}
				if(compteur_win_lose>=2){
					score+=48;
				}
				compteur_win_lose+=1;
			}

			else{											// si on perd
				if(compteur_win_lose>0){			// si le compteur_win_lose est positif, il repasse à 0
					compteur_win_lose=0;
				}
				if(compteur_win_lose==0){
					score-=2;
				}
				if(compteur_win_lose==-1){
					score-=4;
				}
				if(compteur_win_lose==-2){
					score-=8;
				}
				if(compteur_win_lose==-3){
					score-=16;
				}
				if(compteur_win_lose<=-4){
					score-=32;
				}
				compteur_win_lose-=1;
			}

			etat[carte_retourne[0]]=new_etat;
			etat[carte_retourne[1]]=new_etat;

			setTimeout(function(){
				majAffichage(carte_retourne[0]);
				majAffichage(carte_retourne[1]);
				carte_retourne=[];
				if(nb_paire_trouve==8){
					rejouer();
				}
			},500);					// decal de 500 ms avant majAffichage pour avoir le temps de voir la 2ème carte retourné
		}
	}
}