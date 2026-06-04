# Mon Dou‘a Adéquat

L’application qui te conseille le bon dou‘a au bon moment.

## 🚀 Lancement du projet

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 💾 Stockage Local (IndexedDB)

L'application utilise **IndexedDB** via la bibliothèque `idb` pour stocker :
- Les invocations enregistrées (`savedDuas`)
- L'historique des recherches (`history`)
- Les préférences utilisateur (`preferences`)

Le service de stockage se trouve dans `lib/storage.ts`.

## 🤖 Assistant IA

L'assistant est actuellement simulé par un service mocké dans `features/ai/ai-service.ts`.

### Comment brancher une API réelle ?

1. Modifiez `features/ai/ai-service.ts`.
2. Remplacez le contenu de `analyzeNeed` par un appel `fetch` vers votre backend ou directement vers l'API Gemini.
3. Assurez-vous que la réponse respecte le format `AIResponse` défini dans `types/index.ts`.

Exemple :
```typescript
analyzeNeed: async (inputText: string): Promise<AIResponse> => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ text: inputText })
  });
  return response.json();
}
```

## 🎨 Thèmes

L'architecture supporte plusieurs thèmes basés sur des variables CSS et l'attribut `data-theme`.

### Comment ajouter un thème ?

1. Ajoutez votre thème dans `app/globals.css` :
   ```css
   [data-theme='mon-nouveau-theme'] {
     --primary: #hexcolor;
     --primary-foreground: #ffffff;
   }
   ```
2. Ajoutez l'identifiant du thème dans le type `Theme` dans `types/index.ts`.
3. Ajoutez le thème dans la liste des thèmes de la page `app/settings/page.tsx` pour qu'il apparaisse dans l'interface.

## 🌍 Langues (i18n)

L'application supporte le Français, l'Anglais et l'Arabe (avec support RTL).

### Comment ajouter une langue ?

1. Ajoutez les traductions dans `lib/i18n.ts`.
2. Ajoutez l'identifiant de la langue dans le type `Language` dans `types/index.ts`.
3. Ajoutez la langue dans la liste des langues de la page `app/settings/page.tsx`.

## 📱 Mobile-First

L'application est conçue avec une approche mobile-first :
- Navigation par onglets en bas (`BottomNav`).
- Barre supérieure fixe (`TopBar`).
- Largeur maximale contrainte sur desktop pour garder l'aspect "app".
- Interactions tactiles optimisées (active states, scale effects).

## 🛠 Architecture

- `app/` : Routes Next.js
- `components/` : Composants UI et Layout réutilisables
- `features/` : Logique métier découpée par domaine (AI, Dua, Settings, etc.)
- `store/` : État global avec Zustand
- `lib/` : Utilitaires, stockage, i18n
- `types/` : Définitions TypeScript
- `data/` : Données statiques et mocks
