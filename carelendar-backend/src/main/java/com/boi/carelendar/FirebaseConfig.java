package com.boi.carelendar;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException {
        // Java 17에서는 Objects.requireNonNull 사용으로 null 방지
        InputStream serviceAccount = Objects.requireNonNull(
                getClass().getClassLoader().getResourceAsStream("firebase-service-account.json"),
                "firebase-service-account.json 파일을 classpath에서 찾을 수 없습니다."
        );

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // 중복 초기화 방지
        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        } else {
            return FirebaseApp.getInstance();
        }
    }
}
