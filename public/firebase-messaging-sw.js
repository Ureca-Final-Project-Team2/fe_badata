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

// 배포된 사이트의 실제 도메인
const SITE_URL = 'https://badata.vercel.app';

// Firebase FCM 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
  // 포그라운드 메시지인지 확인 (앱이 닫혀있을 때 포그라운드 메시지가 백그라운드로 표시되는 것 방지)
  if (payload.data?.messageType === 'foreground' || payload.data?.isForeground === 'true') {
    return;
  }

  const notificationTitle = payload.data && payload.data.title ? payload.data.title : 'BADATA 알림';

  const notificationOptions = {
    body: payload.data?.content || '새로운 소식이 있습니다!',
    icon: '/assets/logo-badata.png',
    badge: '/assets/logo-badata.png',
    tag: 'badata-notification', // 고정 태그로 중복 방지
    requireInteraction: true,
    data: {
      url: payload.data?.click_action ?? '/',
    },
    actions: [
      {
        action: 'open',
        title: '열기',
      },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 일반적인 푸시 이벤트 처리 (백그라운드 알림용)
self.addEventListener('push', (event) => {
  if (event.data) {
    const payload = event.data.json();

    // FCM에서 온 메시지는 onBackgroundMessage에서 처리되므로 건너뛰기
    if (payload.from?.includes('fcm')) {
      return;
    }

    // 포그라운드 메시지인지 확인
    if (payload.data?.messageType === 'foreground' || payload.data?.isForeground === 'true') {
      return;
    }

    const title = payload.data?.title || 'BADATA 알림';
    const options = {
      body: payload.data?.content || '새로운 알림이 도착했습니다.',
      icon: '/assets/logo-badata.png',
      badge: '/assets/logo-badata.png',
      tag: 'badata-notification', // 고정 태그로 중복 방지
      requireInteraction: true,
      data: {
        url: payload.data?.click_action ?? '/',
      },
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
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  // 전체 URL 생성 (상대 경로인 경우)
  const fullUrl = targetUrl.startsWith('http') ? targetUrl : `${SITE_URL}${targetUrl}`;

  // 알림 클릭 시 앱으로 이동
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 탭이 있으면 포커스
      for (const client of clientList) {
        if (client.url.includes(SITE_URL) || client.url.includes('localhost:3000')) {
          client.navigate(fullUrl);
          return client.focus();
        }
      }
      // 열린 탭이 없으면 새 탭에서 열기
      return clients.openWindow(fullUrl);
    }),
  );
});
