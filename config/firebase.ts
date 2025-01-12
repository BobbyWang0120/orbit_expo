import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4e6vSKzvoybnH6kS5O8AwspxGV4gbAaE",
  authDomain: "orbit-react-native.firebaseapp.com",
  projectId: "orbit-react-native",
  storageBucket: "orbit-react-native.firebasestorage.app",
  messagingSenderId: "579445155029",
  appId: "1:579445155029:web:9d2e01bb5c0d54b245ee5c",
  measurementId: "G-WS2Y0TX058"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
