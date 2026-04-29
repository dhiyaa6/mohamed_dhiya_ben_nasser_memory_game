# 🃏 Jeu Memory — Commit Final 

> **Projet Web · PI2**
> Auteur : **Mohamed Dhiya Ben Nasser**
> Email : [dhiya1234.live.fr4@gmail.com](mailto:dhiya1234.live.fr4@gmail.com)

---

## 📋 Description

Jeu de mémoire interactif en HTML / CSS / JavaScript . Le joueur retourne des paires de cartes en un minimum de coups et de temps. Version finale avec layout sans scroll, cartes spéciales, musique de fond personnalisée par niveau (fichiers audio), et sons d'effets Web Audio.

---

## 🗂️ Structure du projet

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
├── music_easy.mp3        # 🎵 Votre musique pour le niveau Facile
├── music_medium.mp3      # 🎵 Votre musique pour le niveau Moyen
├── music_hard.mp3        # 🎵 Votre musique pour le niveau Difficile
│
├── images/               # Niveau Facile    → img1.png à img7.png
├── images1/              # Niveau Moyen     → img1.png à img12.png
└── images2/              # Niveau Difficile → img1.png à img18.png
```

---

## 🎮 Niveaux de difficulté

| Niveau | Grille | Paires images | Spéciales | Total cartes |
|---|---|---|---|---|
| 😊 Facile | 4 × 5 | 7 | 3 | 20 |
| 😐 Moyen | 5 × 6 | 12 | 3 | 30 |
| 😈 Difficile | 6 × 7 | 18 | 3 | 42 |

Chaque niveau charge ses propres images depuis un dossier dédié :
- **Facile** → `images/img1.png` … `img7.png`
- **Moyen** → `images1/img1.png` … `img12.png`
- **Difficile** → `images2/img1.png` … `img18.png`

---

## 🃏 Cartes spéciales

| Carte | Effet |
|---|---|
| 🃏 Joker | Révèle toutes les cartes non trouvées pendant 2 secondes |
| 🔍 Indice | Trouve et révèle une paire cachée pendant 1,8 secondes |
| 🔀 Shuffle | Mélange toutes les cartes non encore trouvées |

---

## 🎵 Musique de fond

La musique de fond est désormais chargée depuis mes propres fichiers audio — un fichier par niveau.

| Fichier | Niveau |
|---|---|
| `music_easy.mp3` | 😊 Facile |
| `music_medium.mp3` | 😐 Moyen |
| `music_hard.mp3` | 😈 Difficile |

La musique démarre automatiquement au premier clic, change quand on change de niveau, et s'arrête à la fin de la partie. Le bouton 🔊 / 🔇 permet de couper le son à tout moment.

> Pour changer les noms de fichiers, modifiez simplement l'objet `LEVEL_MUSIC` dans `script.js`.

---

## 🔊 Sons d'effets

Les effets sonores sont générés en temps réel via la **Web Audio API** (aucun fichier externe requis) :

| Effet | Déclencheur |
|---|---|
| Flip | Retournement d'une carte |
| Match | Paire trouvée |
| Fail | Mauvaise paire |
| Special | Carte spéciale activée |
| Hint | Indice révélé |
| Win | Victoire |

---

## 📊 Statistiques

- ⭐ **Score** — nombre de paires trouvées
- 🎯 **Coups** — nombre de retournements effectués
- ⏱ **Temps** — chrono depuis le premier clic
- 🏆 **Meilleur** — sauvegardé par niveau via `localStorage` 

---

## 🖥️ Technologies

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique compacte |
| **CSS3** | Glassmorphism, animations, no-scroll |
| **JavaScript ES6** | Logique, DOM, Web Audio API |
| **Web Audio API** | Sons d'effets uniquement |
| **HTML Audio** | Musique de fond par niveau |
| **localStorage** | Meilleur score persistant par niveau |
| **Google Fonts** | Cinzel Decorative + Rajdhani |

---

## 🚀 Lancer le projet

https://dhiyaa6.github.io/mohamed_dhiya_ben_nasser_memory_game/

## 📦 Historique des commits

| Hash      | Date         | Description                                                                 |
|-----------|--------------|-----------------------------------------------------------------------------|
| `3bd4e1b` | Apr 25, 2026 | Initial memory game                                                         |
| `90e0add` | Apr 25, 2026 | Add README file                                                             |
| `1034070` | Apr 25, 2026 | Update project link in README                                               |
| `913ca2b` | Apr 25, 2026 | Enhance game with score, moves, flip animation and images instead of emojis |
| `6acb2e9` | Apr 25, 2026 | Enhance README with detailed project information                            |
| `811b25d` | Apr 28, 2026 | feat: custom background image, Web Audio sounds, title animations, reset button |
| `a80cf04` | Apr 28, 2026 | feat: custom background image, Web Audio sounds, title animations, reset button |
| `7025069` | Apr 28, 2026 | trigger rebuild                                                             |
| **`c6857b9`** ✅ | **Apr 29, 2026** | **Final Version Project**                                       |

---

*Projet PI2 — © 2025 Mohamed Dhiya Ben Nasser*
