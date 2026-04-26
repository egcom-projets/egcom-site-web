# Site Web EGCOM

Site web professionnel pour EGCOM - Entreprise de BTP spécialisée en construction, rénovation et management de projets.

## 🚀 Technologies

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Serverless**: Netlify Functions (Node.js)
- **Email**: Resend API
- **Hébergement**: Netlify

## 📁 Structure du Projet

```
site internet/
├── index.html              # Page d'accueil
├── services.html           # Page services
├── mots-du-pdg.html       # Message du PDG
├── realisations.html      # Portfolio projets
├── a-propos.html          # À propos
├── contact.html           # Formulaire contact
├── admin/                 # Back-office admin
│   ├── login.html         # Connexion admin
│   ├── index.html         # Liste projets
│   └── edit-project.html  # Créer/modifier projet
├── assets/
│   ├── css/
│   │   └── styles.css     # Styles globaux
│   ├── js/
│   │   ├── supabase-client.js
│   │   ├── main.js        # Scripts publics
│   │   └── admin.js       # Scripts admin
│   └── images/            # Images du site
├── netlify/
│   └── functions/
│       └── contact-submit.js  # API contact
├── netlify.toml           # Config Netlify
├── package.json
└── .env.example
```

## 🔧 Installation Locale

### 1. Cloner/Télécharger le projet

Le projet est déjà dans: `C:\Users\lcamara\Documents\Informatiques EGCOMP\site internet`

### 2. Installer les dépendances

```bash
cd "C:\Users\lcamara\Documents\Informatiques EGCOMP\site internet"
npm install
```

### 3. Configuration Supabase

**Votre projet Supabase est déjà configuré:**
- URL: `https://bdalhwzrbvnnibtsqsni.supabase.co`
- Tables: `projects`, `contact_messages`
- Storage: bucket `projects`

**Pour créer un compte admin:**

1. Allez sur https://bdalhwzrbvnnibtsqsni.supabase.co
2. Dans le menu "Authentication" → "Users" → "Add user"
3. Créez un utilisateur avec votre email et mot de passe
4. Utilisez ces identifiants pour vous connecter sur `/admin/login.html`

### 4. Configuration Resend (Email)

1. Créez un compte sur https://resend.com (gratuit)
2. Obtenez votre API Key
3. Créez un fichier `.env` à la racine:

```env
SUPABASE_URL=https://bdalhwzrbvnnibtsqsni.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
RESEND_API_KEY=votre_resend_api_key
```

**Pour obtenir la Service Role Key:**
- Allez dans Supabase → Settings → API
- Copiez la "service_role" key (⚠️ Ne jamais la partager publiquement)

### 5. Tester en local

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:8888`

## 🌐 Déploiement sur Netlify

### Méthode 1: Via GitHub (Recommandée)

1. **Créer un repo GitHub**
   ```bash
   cd "C:\Users\lcamara\Documents\Informatiques EGCOMP\site internet"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/egcom-website.git
   git push -u origin main
   ```

2. **Connecter à Netlify**
   - Allez sur https://app.netlify.com
   - "Add new site" → "Import from Git"
   - Sélectionnez votre repo GitHub
   - Build settings:
     - **Build command**: (laisser vide)
     - **Publish directory**: `.`
   - Cliquez "Deploy site"

3. **Configurer les variables d'environnement**
   - Dans Netlify: Site settings → Environment variables
   - Ajoutez:
     - `SUPABASE_URL` = `https://bdalhwzrbvnnibtsqsni.supabase.co`
     - `SUPABASE_SERVICE_ROLE_KEY` = votre clé (depuis Supabase)
     - `RESEND_API_KEY` = votre clé Resend

4. **Redéployer**
   - Allez dans "Deploys" → "Trigger deploy"

### Méthode 2: Drag & Drop

1. Allez sur https://app.netlify.com
2. Glissez-déposez le dossier `site internet` sur Netlify
3. Configurez les variables d'environnement (étape 3 ci-dessus)

## 📝 Utilisation

### Accès Public
- **Site**: `https://votre-site.netlify.app`
- Pages: Accueil, Services, Mot du PDG, Réalisations, À propos, Contact

### Accès Admin
- **URL**: `https://votre-site.netlify.app/admin/login.html`
- Connectez-vous avec les identifiants créés dans Supabase
- Gérez vos projets (créer, modifier, supprimer)
- Uploadez des images

### Ajouter un Projet

1. Connectez-vous à l'admin
2. Cliquez "Nouveau Projet"
3. Remplissez le formulaire:
   - Titre (requis)
   - Lieu
   - Année
   - Catégorie (Construction, Rénovation, Management, Autre)
   - Description
   - Image de couverture
4. Cliquez "Enregistrer"

Le projet apparaîtra automatiquement sur la page "Réalisations" du site public.

## 🎨 Personnalisation

### Couleurs (dans `assets/css/styles.css`)

```css
:root {
    --primary-blue: #003366;    /* Bleu marine */
    --primary-red: #8B1A1A;     /* Rouge bordeaux */
    --accent-red: #C41E3A;      /* Rouge accent */
}
```

### Logo

Remplacez le texte "EGCOM" dans le header par votre logo:
- Ajoutez votre logo dans `assets/images/logo.png`
- Modifiez dans chaque page HTML:

```html
<div class="logo">
    <a href="index.html">
        <img src="assets/images/logo.png" alt="EGCOM" style="height: 40px;">
    </a>
</div>
```

### Images

Ajoutez vos images dans `assets/images/`:
- `hero-building.jpg` (image hero page d'accueil)
- `ceo-photo.jpg` (photo du PDG)
- `service-*.jpg` (images services)
- `about-team.jpg` (photo équipe)

## 🔒 Sécurité

- ✅ RLS activée sur Supabase (Row Level Security)
- ✅ Clés API sécurisées (variables d'environnement)
- ✅ Authentification admin via Supabase Auth
- ✅ HTTPS automatique avec Netlify

## 📧 Configuration Email

Le formulaire de contact envoie automatiquement un email à `egcom.projets23@gmail.com` via Resend.

Pour changer l'adresse de réception, modifiez dans `netlify/functions/contact-submit.js`:

```javascript
to: ['votre-nouvelle-adresse@example.com']
```

## 🆘 Support

### Problèmes courants

**Les projets ne s'affichent pas:**
- Vérifiez que vous avez créé au moins un projet dans l'admin
- Ouvrez la console du navigateur (F12) pour voir les erreurs

**Le formulaire de contact ne fonctionne pas:**
- Vérifiez que `RESEND_API_KEY` est configurée dans Netlify
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correcte

**Impossible de se connecter à l'admin:**
- Vérifiez que vous avez créé un utilisateur dans Supabase Auth
- Vérifiez l'email et le mot de passe

## 📊 Base de Données

### Table `projects`
- `id` (UUID)
- `title` (TEXT)
- `location` (TEXT)
- `year` (INTEGER)
- `category` (TEXT: construction, renovation, management, autre)
- `description` (TEXT)
- `cover_image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Table `contact_messages`
- `id` (UUID)
- `name` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `project_type` (TEXT)
- `city` (TEXT)
- `budget` (TEXT)
- `message` (TEXT)
- `created_at` (TIMESTAMP)

## 🎯 Prochaines Étapes

1. ✅ Créer un compte admin dans Supabase
2. ✅ Obtenir une clé API Resend
3. ✅ Déployer sur Netlify
4. ✅ Configurer les variables d'environnement
5. ✅ Ajouter vos images et logo
6. ✅ Créer vos premiers projets
7. ✅ Tester le formulaire de contact
8. ✅ Configurer un nom de domaine personnalisé (optionnel)

---

**Développé avec Windsurf + Supabase + Netlify**
