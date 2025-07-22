importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC-8JOrK8h5SBVQimIxV7eWEqynLjRUr1Y",
  authDomain: "carelendar-62858.firebaseapp.com",
  projectId: "carelendar-62858",
  storageBucket: "carelendar-62858.appspot.com", // ✅ 수정
  messagingSenderId: "943385558297",
  appId: "1:943385558297:web:f624ee85c1e7687cd41988",
  measurementId: "G-5M9934DKL0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
