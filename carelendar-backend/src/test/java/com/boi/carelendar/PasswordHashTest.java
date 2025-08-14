package com.boi.carelendar;


import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class PasswordHashTest {

    @Test
    void testMatchHashedPassword() {
        // 실제 DB에 저장된 해시값 (예: 아래 값은 1234 해시)
        String hashedPassword = "$2a$10$lX2Uw2jnpJpZHjvpPFV5uu4QiLMO6Q3K5G6wXgeLPtXUNx5Al9YF2";

        // 평문 비밀번호
        String rawPassword = "1234";

        PasswordEncoder encoder = new BCryptPasswordEncoder();

        boolean matches = encoder.matches(rawPassword, hashedPassword);

        System.out.println("비밀번호 일치 여부: " + matches);

        assertTrue(matches, "1234는 해당 해시와 일치해야 함");
    }

    @Test
    void generateNewHash() {
        String rawPassword = "1234";
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode(rawPassword);
        System.out.println("Generated hash: " + hash);
    }
}
