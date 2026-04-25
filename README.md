# Memory Game

## Description

Jeu Memory développé en HTML, CSS et JavaScript.
Le projet a évolué avec l’ajout de nouvelles fonctionnalités comme le score, le compteur de coups, l’utilisation d’images au lieu des emojis et une animation de retournement des cartes.

## Technologies

* HTML
* CSS
* JavaScript

## Fonctionnalités

* Retourner les cartes
* Vérifier les paires
* Ajout d’un score qui augmente lorsqu’une paire est trouvée
* Ajout d’un compteur de coups (incrémenté à chaque tentative)
* Remplacement des emojis par des images
* Animation de retournement des cartes avec effet 3D (rotateY)
* Mélange aléatoire des cartes
* Blocage des clics pendant la vérification (lockBoard)

## Lien du projet

https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/

## Difficultés

* Gérer l’état de deux cartes retournées
* Empêcher l’utilisateur de cliquer plusieurs fois rapidement
* Implémenter le système de score et de coups
* Intégrer des images dynamiques dans les cartes
* Créer une animation fluide en CSS

## Solutions

* Utilisation de variables firstCard et secondCard
* Utilisation de lockBoard pour bloquer les interactions
* Utilisation de setTimeout pour gérer le délai
* Utilisation de dataset pour comparer les cartes
* Manipulation du DOM pour mettre à jour score et coups
* Utilisation de transform: rotateY pour l’animation
