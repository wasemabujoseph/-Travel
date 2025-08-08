
# Diraasti — Course Section (دراستي - قسم المواد)

A modern multi-language (Arabic / English) React + Vite app tailored for **Tawjihi 2008** students.  
Features:
- Subject dashboards with topics, resources, notes, progress.
- Local persistence + optional Firebase Authentication (Google) and Firestore sync.
- RTL-first Arabic UI and English support (i18n).
- Tailwind CSS for a modern professional look.
- Printable monthly "تقرير تقدم المواد".
- Export / import JSON backup.

---

## What's included
- Full source code (React + Tailwind)
- `curatedResources.json` with sample curated links for كيمياء، أحياء، إنجليزي متقدم
- Firebase setup placeholders and `firebaseInit.js`
- `README` deployment instructions for GitHub Pages

---

## Quick start (local)

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open the app at the address shown by Vite (usually http://localhost:5173)

---

## Firebase (optional sync across devices)

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable **Authentication → Sign-in method → Google**.
3. Create a Firestore database (start in test mode for development).
4. Copy your Firebase config and paste into `.env.local` (see `.env.example`).

Example `.env.local`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=1:xxx:web:yyy
```

> Note: Keep these values secret in private repos.

---

## Deploy to GitHub Pages

1. Create a repo on GitHub and push this project.
2. Build:
```bash
npm run build
```
3. Serve the `dist` folder using GitHub Pages by pointing Pages source to `gh-pages` branch or using a workflow to push `dist` to `gh-pages`. (Alternatively use `pages` action.)

---

## File Structure (important)
```
/public
/src
  /components
  /pages
  i18n.js
  firebaseInit.js
tailwind.config.cjs
postcss.config.cjs
package.json
README.md
```

---

## License
MIT



## CI/CD
A GitHub Actions workflow is included at `.github/workflows/deploy.yml` to build and deploy `dist/` to GitHub Pages when you push to `main`.

## Notes on Firebase sync
The app now saves `subjects` to Firestore under document `users/{uid}`. Ensure you enable Firestore & Google Sign-In and set environment variables in `.env.local`.
