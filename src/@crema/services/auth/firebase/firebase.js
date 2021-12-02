// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvZtGZS1GoW2RhbOAXqytKuhimhAOKYoY',
  authDomain: 'crema-69ef5.firebaseapp.com',
  projectId: 'crema-69ef5',
  storageBucket: 'crema-69ef5.appspot.com',
  messagingSenderId: '5009895487',
  appId: '1:5009895487:web:de60318e8a953dc20dc88a',
  measurementId: 'G-6ZFY14838Y',
};

// Initialize Firebase
console.log('파이어베이스 콜');
const fireBase = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBase);

const auth = getAuth();

export {auth, signInWithEmailAndPassword};
