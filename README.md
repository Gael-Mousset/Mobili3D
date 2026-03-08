# Mobili3D — MVP

> Plateforme de valorisation du mobilier professionnel d'entreprise avec visualisation 3D.

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# → http://localhost:5173
```

## 🔐 Identifiants démo

| Email               | Mot de passe |
|---------------------|--------------|
| demo@mobili3d.fr    | demo2026     |

## 📁 Structure du projet

```
src/
├── types/                  # Types TypeScript (Furniture, User, etc.)
│   └── index.ts
├── data/                   # Données mock et constantes
│   └── furniture.ts
├── hooks/                  # Custom hooks
│   └── useAuth.ts          # Authentification localStorage
├── components/
│   ├── ui/                 # Composants UI réutilisables
│   │   ├── StateBadge.tsx  # Badge état A/B/C
│   │   └── Stepper.tsx     # Stepper 4 étapes (style mockup)
│   ├── layout/             # Layout
│   │   ├── Sidebar.tsx     # Navigation latérale
│   │   └── AppLayout.tsx   # Wrapper pages authentifiées
│   └── three/              # Composants 3D
│       └── Scene3D.tsx     # Scène React Three Fiber
├── pages/
│   ├── LandingPage.tsx     # Page d'accueil publique
│   ├── LoginPage.tsx       # Connexion (fake auth)
│   ├── DashboardPage.tsx   # Tableau de bord
│   ├── CataloguePage.tsx   # Liste des meubles
│   ├── ScannerPage.tsx     # Wizard 4 étapes (scan → fiche)
│   └── Viewer3DPage.tsx    # Visualiseur 3D interactif
├── App.tsx                 # Router principal
├── main.tsx                # Point d'entrée
└── index.css               # Styles globaux + Tailwind
```

## 🛠 Stack technique

| Technologie         | Rôle                        |
|---------------------|-----------------------------|
| React 18            | Framework UI                |
| TypeScript          | Typage statique             |
| Vite 6              | Build tool                  |
| React Router 6      | Routing SPA                 |
| Tailwind CSS 3      | Styles utilitaires          |
| React Three Fiber   | Visualisation 3D            |
| @react-three/drei   | Helpers 3D (OrbitControls)  |
| Three.js            | Moteur 3D                   |
| Lucide React        | Icônes                      |

## 🎨 Design System

- **Background** : `#0a0a0a` (noir profond)
- **Surface** : `#141414`
- **Accent** : `#c8e630` (vert-lime chartreuse)
- **Typo display** : DM Sans (800/900)
- **Typo mono** : JetBrains Mono (prix, IDs)

## 📋 Fonctionnalités MVP

1. **Landing** — Valeurs du projet, CTA connexion
2. **Auth** — Fake auth avec localStorage
3. **Dashboard** — Stats, raccourcis
4. **Catalogue** — Grille filtrable, prix IA
5. **Scanner** — Wizard 4 étapes : Photos → Métadonnées → Traitement 3D → Fiche prête
6. **Visualiseur 3D** — Scène interactive, sélection de meubles

## 📦 Build production

```bash
npm run build    # → dist/
npm run preview  # Prévisualiser le build
```
