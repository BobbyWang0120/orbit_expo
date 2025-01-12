/**
 * Firebase Configuration
 * 
 * This file initializes Firebase services for the application:
 * - Firebase Core
 * - Authentication with AsyncStorage persistence
 * - Cloud Firestore database
 * 
 * Note: Make sure to enable these services in your Firebase Console
 * before using them in the application.
 */

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Export initialized services
export { app, auth, db };
