package com.boi.carelendar.config;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;


@Configuration
@ConfigurationProperties(prefix = "app.jwt")
@Getter @Setter
public class JwtConfig {

    private String secret;

    @PostConstruct
    public void init() {
        System.out.println(">> Loaded JWT secret: " + secret);
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("JWT secret not set");
        }
    }

    @Bean
    NimbusJwtEncoder jwtEncoder(){
        System.out.println(">> JWT secret from @Value: " + secret); // <- 이거 찍어봐
        byte[] key = resolveSecret(secret);
        // HMAC 대칭키: encoder는 ImmutableSecret<byte[]>
        return new NimbusJwtEncoder(new com.nimbusds.jose.jwk.source.ImmutableSecret<>(key));
    }

    @Bean
    JwtDecoder jwtDecoder() {
        byte[] key = resolveSecret(secret);
        javax.crypto.SecretKey sk = new javax.crypto.spec.SecretKeySpec(key, "HmacSHA256");
        return org.springframework.security.oauth2.jwt.NimbusJwtDecoder
                .withSecretKey(sk)
                .macAlgorithm(org.springframework.security.oauth2.jose.jws.MacAlgorithm.HS256)
                .build();
    }

    private static byte[] resolveSecret(String raw) {
        // 1) Base64로 보이면 디코딩
        try {
            byte[] decoded = java.util.Base64.getDecoder().decode(raw);
            if (decoded.length >= 32) return decoded; // 충분히 길면 사용
        } catch (IllegalArgumentException ignore) { /* Base64 아님 */ }

        // 2) 평문 문자열이면 UTF-8 바이트 사용
        byte[] utf8 = raw.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        if (utf8.length < 32)
            throw new IllegalStateException("HS256 키는 최소 32바이트 이상이어야 함. 현재=" + utf8.length + "B");
        return utf8;
    }
}


