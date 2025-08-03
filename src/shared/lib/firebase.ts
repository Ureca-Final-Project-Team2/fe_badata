// src/shared/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import {
  getToken as getFirebaseToken,
  getMessaging,
  isSupported,
  onMessage as onFirebaseMessage,
} from 'firebase/messaging';

import type { Messaging } from 'firebase/messaging';

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

let messaging: Messaging | null = null;

const initMessaging = async (): Promise<Messaging | null> => {
  if (typeof window !== 'undefined' && (await isSupported())) {
    if (!messaging) {
      messaging = getMessaging(app);
    }
    return messaging;
  }
  return null;
};

export { getFirebaseToken, initMessaging, onFirebaseMessage };
