import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBySuNvoDxAYIKSC6Cwuj1jRcKZv5fTshM',
  authDomain: 'badata-174aa.firebaseapp.com',
  projectId: 'badata-174aa',
  storageBucket: 'badata-174aa.firebasestorage.app',
  messagingSenderId: '1043735944676',
  appId: '1:1043735944676:web:19b9712ddcf94b60d9bbf1',
  measurementId: 'G-C098SZY5NP',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { getToken, messaging, onMessage };
