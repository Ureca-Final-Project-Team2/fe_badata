importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBySuNvoDxAYIKSC6Cwuj1jRcKZv5fTshM',
  authDomain: 'badata-174aa.firebaseapp.com',
  projectId: 'badata-174aa',
  storageBucket: 'badata-174aa.firebasestorage.app',
  messagingSenderId: '1043735944676',
  appId: '1:1043735944676:web:19b9712ddcf94b60d9bbf1',
  measurementId: 'G-C098SZY5NP',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // data payload에서 값 꺼내기
  const notificationTitle = payload.data && payload.data.title ? payload.data.title : 'IXI 알림';
  const notificationOptions = {
    body: payload.data && payload.data.content ? payload.data.content : '새로운 소식이 있습니다!',
    icon: '/ixi-u.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
});
