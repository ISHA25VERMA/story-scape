import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSrigfASuMSwsjvrggYpsmpi9xm2R_J6w",
  authDomain: "story-scape-71cc8.firebaseapp.com",
  projectId: "story-scape-71cc8",
  storageBucket: "story-scape-71cc8.appspot.com",
  messagingSenderId: "579856738367",
  appId: "1:579856738367:web:fb67e120c6d5072037308a",
  measurementId: "G-8GCER3WN3P",
};

const firebaseApp = initializeApp(firebaseConfig);
export const imageDB = getStorage(firebaseApp);
