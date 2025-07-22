package com.boi.carelendar;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class FcmPushService {

    public String sendMessageToToken(String targetToken, String title, String body) throws Exception {
        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(
                        Notification.builder()
                                .setTitle(title)
                                .setBody(body)
                                .build()
                )
                .build();

        return FirebaseMessaging.getInstance().send(message);
    }
}
