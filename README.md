# Jeu Memory — Commit Final

> **Projet Web · PI2**
> Auteur : **Mohamed Dhiya Ben Nasser**
> Email : [dhiya1234.live.fr4@gmail.com](mailto:dhiya1234.live.fr4@gmail.com)

---

## Nom et description du projet

**Jeu Memory** est un jeu de mémoire interactif développé en HTML / CSS / JavaScript . Le joueur retourne des paires de cartes en un minimum de coups et de temps. Le projet intègre trois niveaux de difficulté, des cartes spéciales avec effets, une musique de fond personnalisée par niveau, des sons d'effets générés en temps réel, et un design professionnel de type glassmorphism.

---

## Structure du projet

```
memory-game/
│
├── index.html            # Structure HTML
├── style.css             # Design professionnel
├── script.js             # Logique complète + sons d'effets Web Audio
├── README.md             # Ce fichier
│
├── background.png        # Image de fond
│
├── music_easy.mp3        #Musique niveau Facile
├── music_medium.mp3      #Musique niveau Moyen
├── music_hard.mp3        #Musique niveau Difficile
│
├── images/               # Niveau Facile    → img1.png à img7.png
├── images1/              # Niveau Moyen     → img1.png à img12.png
└── images2/              # Niveau Difficile → img1.png à img18.png
```

---

## Niveaux de difficulté

| Niveau | Grille | Paires images | Spéciales | Total cartes |
|---|---|---|---|---|
| Facile | 4 × 5 | 7 | 3 | 20 |
| Moyen | 5 × 6 | 12 | 3 | 30 |
| Difficile | 6 × 7 | 18 | 3 | 42 |

---

## Fonctionnalités principales

- **3 niveaux de difficulté** — Facile, Moyen, Difficile avec grilles et images dédiées
- **Cartes spéciales** avec effets uniques :

| Carte | Effet |
|---|---|
| Joker | Révèle toutes les cartes non trouvées pendant 2 secondes |
| Indice | Trouve et révèle une paire cachée pendant 1,8 secondes |
| Shuffle | Mélange toutes les cartes non encore trouvées |

- **Musique de fond par niveau** — un fichier MP3 différent selon le niveau, démarre au premier clic et s'arrête à la victoire
- **Sons d'effets Web Audio** — flip, match, erreur, carte spéciale, victoire, générés en temps réel sans fichier externe
- **Statistiques en temps réel** — score, coups, chronomètre, meilleur score par niveau (localStorage)
- **Layout sans scroll** — tout le jeu est visible sans défilement, cartes redimensionnées avec `min()`
- **Particules animées** en arrière-plan
- **Écran de victoire** animé avec récapitulatif de la partie
- **Bouton mute** pour couper le son à tout moment

---

## Technologies utilisées

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique compacte |
| **CSS3** | Glassmorphism, animations, no-scroll, responsive |
| **JavaScript ES6** | Logique du jeu, manipulation DOM |
| **Web Audio API** | Génération des sons d'effets en temps réel |
| **HTML Audio API** | Lecture de la musique de fond par niveau |
| **localStorage** | Sauvegarde du meilleur score par niveau |
| **Google Fonts** | Cinzel Decorative + Rajdhani |

---

## Lancer le projet

 **Démo en ligne :** [https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/](https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/)

Pour lancer en local :
1. Cloner ou télécharger le dossier
2. Placer les images dans `images/`, `images1/`, `images2/`
3. Placer les fichiers `music_easy.mp3`, `music_medium.mp3`, `music_hard.mp3` à la racine
4. Ouvrir `index.html` via **Live Server** (VS Code) ou tout serveur local

> Un serveur local est requis — les navigateurs bloquent les ressources locales en mode `file://`.

---

##  Nouveautés explorées

Durant ce projet, j'ai découvert et exploré plusieurs concepts nouveaux :

- **Web Audio API** — génération de sons programmatiques (oscillateurs, enveloppes de gain, types d'ondes) sans aucun fichier audio externe
- **CSS Glassmorphism** — effet de verre dépoli avec `backdrop-filter: blur()`, `rgba`, et bordures semi-transparentes
- **Perspective 3D CSS** — animation de retournement de cartes avec `transform-style: preserve-3d`, `backface-visibility`, et `rotateY`
- **Layout no-scroll** — conception d'une interface qui tient entièrement dans la fenêtre avec `height: 100vh`, `flex: 1`, et `min()` pour les tailles de cartes
- **localStorage** — persistance des données entre sessions sans base de données
- **Particules CSS/JS** — création d'effets visuels dynamiques avec des éléments positionnés aléatoirement et des animations keyframes

---

## Difficultés rencontrées

1. **Compteur de coups incorrect au démarrage** — le jeu affichait 27 ou 31 coups dès le chargement sans avoir joué
2. **Musique qui ne s'arrête pas** — la musique de fond continuait à jouer même après `stopBgMusic()`, notamment lors du changement de niveau ou de la victoire
3. **Layout avec scroll** — le plateau de jeu dépassait la hauteur de l'écran et forçait l'utilisateur à faire défiler la page
4. **Listeners qui s'accumulent** — utiliser `addEventListener` sur des cartes recréées à chaque partie provoquait des clics multiples enregistrés sur une même carte
5. **Cartes spéciales après Shuffle** — les cartes reconstruites lors du mélange perdaient leur gestionnaire d'événements

---

## Solutions apportées

1. **Compteur de coups** — le bug venait de `buildBoard()` appelé deux fois à l'initialisation (une fois directement, une fois via `resetGame()`), ce qui corrompait l'état. Corrigé en remplaçant l'appel direct par `resetGame()` uniquement, et en ajoutant une garde dans `setDifficulty()` pour éviter un reset inutile
2. **Musique** — le système `bgStopFlag` était insuffisant car les `setTimeout` déjà planifiés continuaient de s'exécuter. Remplacé par un système d'identifiant de boucle `bgLoopId` : chaque nouvelle boucle reçoit un ID unique, et toute boucle dont l'ID ne correspond plus à l'ID courant s'arrête immédiatement
3. **Layout no-scroll** — redimensionnement des cartes avec `min(px, vw)`, passage à `flex: 1` pour le plateau, et `overflow: hidden` sur le body
4. **Listeners** — remplacement de `addEventListener('click', flipCard)` par `card.onclick = flipCard`, qui écrase toujours le handler précédent et garantit un seul listener par carte
5. **Cartes après Shuffle** — même correction `card.onclick = flipCard` appliquée dans `activateShuffle()` après reconstruction du HTML des cartes

---

*Projet PI2 — © 2025 Mohamed Dhiya Ben Nasser*
