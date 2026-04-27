# 🎮 Memory Game

## Description

Jeu Memory développé en HTML, CSS et JavaScript pur (sans frameworks ni bibliothèques externes).
Le projet évolue progressivement commit par commit avec l'ajout de nouvelles fonctionnalités visuelles et interactives.

## Technologies

* HTML5
* CSS3 (animations, keyframes, transitions, CSS Grid)
* JavaScript (DOM, événements, Web Audio API)

## Fonctionnalités

### Commit 1 — Base du jeu

* Plateau de jeu avec cartes retournables
* Vérification des paires
* Mélange aléatoire des cartes
* Blocage des clics pendant la vérification (`lockBoard`)

### Commit 2 — Amélioration

* Score incrémenté à chaque paire trouvée
* Compteur de coups
* Remplacement des emojis par des images
* Animation de retournement 3D (`rotateY`)

### Commit 3 — Expérience utilisateur ✨

* Image d'arrière-plan personnalisée avec overlay sombre pour la lisibilité
* Animations du titre (effet cascade + pulsation)
* Sons avec Web Audio API :

  * Son au clic
  * Son de réussite
  * Son d’échec
* Bouton Reset (réinitialisation du jeu)

## Structure des fichiers

memory_game/
├── index.html
├── style.css
├── script.js
├── background.jpg
├── images/
│   ├── img1.png
│   ├── img2.png
│   ├── img3.png
│   ├── img4.png
│   ├── img5.png
│   ├── img6.png
│   ├── img7.png
│   └── img8.png
└── README.md

## Lien du projet

https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/

## Difficultés rencontrées

* Gérer les états des cartes
* Empêcher les clics multiples
* Implémenter score et coups
* Ajouter des animations fluides
* Gérer les sons sans fichiers audio externes

## Solutions

* Variables `firstCard` et `secondCard`
* Variable `lockBoard`
* `setTimeout` pour le timing
* Manipulation du DOM
* CSS `transform: rotateY`
* Web Audio API pour les sons
