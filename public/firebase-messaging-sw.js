importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBcUUcISK4q6cn61eP0NchclkBzpSmsjSA",
    authDomain: "fir-test-70883.firebaseapp.com",
    projectId: "fir-test-70883",
    storageBucket: "fir-test-70883.appspot.com",
    messagingSenderId: "611119766719",
    appId: "1:611119766719:web:b08c1c17ae7d6e9b997a0a",
    measurementId: "G-4D6XQ4TKWF"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
