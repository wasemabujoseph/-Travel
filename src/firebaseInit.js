// Optional Firebase initialization if you want auth or realtime DB later.
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

export default app;
