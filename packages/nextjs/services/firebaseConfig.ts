import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBDo62tQFlJhEYE-6i8KPMEiYY6kIesOjA",
  authDomain: "monad-cc-project.firebaseapp.com",
  databaseURL: "https://monad-cc-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "monad-cc-project",
  storageBucket: "monad-cc-project.firebasestorage.app",
  messagingSenderId: "676153241033",
  appId: "1:676153241033:web:69f4fb6dfeed4f6554cc18",
  measurementId: "G-30BGYWLRQ5",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default app;
