import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const vapidKey =
  "BBYwsmJt0nxJIHKcNhCL13Xs8cUha5u0Tomi2TJdAa77La5dnBnDp79wfvqIfOxuTz9KPNxnWrxTMPBgs2gB68A";

function App() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, { vapidKey })
          .then((currentToken) => {
            if (currentToken) {
              console.log("✅ FCM Token:", currentToken);
            } else {
              console.warn("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("❌ Error retrieving token:", err);
          });
      }
    });

    onMessage(messaging, (payload) => {
      console.log("🔔 Foreground message received:", payload);
      //alert(`🔔 ${payload.notification.title} - ${payload.notification.body}`);
    });
  }, []);

  return <div className="App">🔥 FCM 테스트 중입니다</div>;
}

export default App;
