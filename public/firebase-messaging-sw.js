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

// Firebase FCM 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data && payload.data.title ? payload.data.title : 'BADATA 알림';

  const notificationOptions = {
    body: payload.data?.content || '새로운 소식이 있습니다!',
    icon: '/assets/logo-badata.png',
    badge: '/assets/logo-badata.png',
    tag: `badata-bg-${Date.now()}`,
    requireInteraction: true,
    data: {
      url: payload.data?.click_action ?? '/',
    },
  };

  console.log('FCM 알림 표시:', notificationTitle, notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 일반적인 푸시 이벤트 처리 (백그라운드 알림용)
self.addEventListener('push', (event) => {
  console.log('푸시 이벤트 수신:', event);

  if (event.data) {
    const payload = event.data.json();
    console.log('푸시 데이터:', payload);

    const title = payload.data?.title || 'BADATA 알림';
    const options = {
      body: payload.data?.content || '새로운 알림이 도착했습니다.',
      icon: '/assets/logo-badata.png',
      badge: '/assets/logo-badata.png',
      tag: `badata-push-${Date.now()}`,
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: '열기',
        },
      ],
    };

    console.log('푸시 알림 표시:', title, options);
    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('알림 클릭됨:', event);

  event.notification.close();

  // 알림 클릭 시 앱으로 이동
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 탭이 있으면 포커스
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          return client.focus();
        }
      }
      // 열린 탭이 없으면 새 탭에서 열기
      return clients.openWindow('/');
    }),
  );
});
