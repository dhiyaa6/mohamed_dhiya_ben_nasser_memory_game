# 🎮 Memory Game

## Description
Jeu Memory développé en HTML, CSS et JavaScript pur (sans frameworks ni bibliothèques externes).
Le projet évolue progressivement commit par commit avec l'ajout de nouvelles fonctionnalités visuelles et interactives.

## Technologies
- HTML5
- CSS3 (animations, keyframes, transitions, CSS Grid)
- JavaScript (DOM, événements, Web Audio API)

## Fonctionnalités

### Commit 1 — Base du jeu
- Plateau de jeu avec cartes retournables
- Vérification des paires
- Mélange aléatoire des cartes
- Blocage des clics pendant la vérification (`lockBoard`)

### Commit 2 — Amélioration
- Score incrémenté à chaque paire trouvée
- Compteur de coups
- Remplacement des emojis par des images
- Animation de retournement 3D (`rotateY`)

### Commit 3 — Expérience utilisateur ✨
- **Image d'arrière-plan** personnalisée avec overlay sombre pour la lisibilité
- **Animations du titre** : chaque lettre tombe en cascade et pulse entre deux couleurs en boucle
- **Sons** via Web Audio API (sans fichier externe) :
  - Son léger au retournement d'une carte 🔊
  - Mélodie courte quand une paire est trouvée ✅
  - Son sourd quand les cartes ne correspondent pas ❌
- **Bouton Reset** : remet le score et les coups à zéro, mélange à nouveau les cartes

## Structure des fichiers
```
memory_game/
├── index.html        ← Structure HTML
├── style.css         ← Design et animations
├── script.js         ← Logique du jeu et sons
├── background.jpg    ← Image d'arrière-plan personnalisée
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
```

## Lien du projet
🔗 https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/

## Nouveautés explorées (commit 3)
- **Web Audio API** : génération de sons synthétisés en JavaScript sans aucun fichier audio externe, en utilisant des oscillateurs et des `GainNode` pour contrôler le volume
- **CSS `animation-delay`** : créer un effet en cascade lettre par lettre sur le titre avec des délais progressifs
- **`body::before`** : pseudo-élément utilisé comme overlay sombre par-dessus l'image de fond
- **`background-attachment: fixed`** : effet de fond fixe
- Gestion de la politique navigateur audio avec `audioCtx.resume()` au premier clic utilisateur

## Difficultés rencontrées (commit 3)
- Faire jouer des sons sans fichiers `.mp3` ou `.wav`
- Synchroniser les animations des lettres avec des délais différents
- L'image de fond rendait le texte illisible
- Le contexte audio était bloqué au chargement de la page (politique navigateur)

