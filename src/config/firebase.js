// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB8TOFfOZOZd4B-58mL64EGrQbo93Xlvqo',
  authDomain: 'rami-d5c58.firebaseapp.com',
  databaseURL: 'https://rami-d5c58-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rami-d5c58',
  storageBucket: 'rami-d5c58.firebasestorage.app',
  messagingSenderId: '257371398522',
  appId: '1:257371398522:web:8261bb997563fb7466b6c3',
  measurementId: 'G-R10PFC38J6',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
