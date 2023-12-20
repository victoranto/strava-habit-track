import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBm1C1TuZs6AEYLTO9VT8DZ0zueqb0Ars0",
  authDomain: "strava-habit-track.firebaseapp.com",
  projectId: "strava-habit-track",
  storageBucket: "strava-habit-track.appspot.com",
  messagingSenderId: "869737213590",
  appId: "1:869737213590:web:c5724ad1fc82ac25a19cb7"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);