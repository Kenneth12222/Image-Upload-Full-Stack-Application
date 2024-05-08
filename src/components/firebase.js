import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'; // Import getStorage instead of getFirestorage
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD06SuXLZO2QhEXLp6vjUrP0rf-PRCHPRE",
  authDomain: "uploadfiles-3563f.firebaseapp.com",
  projectId: "uploadfiles-3563f",
  storageBucket: "uploadfiles-3563f.appspot.com",
  messagingSenderId: "500357083321",
  appId: "1:500357083321:web:5473de2075c885e4c62b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Export Firestore
export const storage = getStorage(app); // Use getStorage to access Firebase Storage
export { auth, db }; // Export Firebase Authentication and Firestore

export default app;