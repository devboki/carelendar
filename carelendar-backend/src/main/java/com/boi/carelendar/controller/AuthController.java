package com.boi.carelendar.controller;

import com.boi.carelendar.config.JwtConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;

record LoginRequest(@JsonProperty("email") String email, @JsonProperty("password")String password) {}
record TokenResponse(String accessToken, long expiresIn) {}

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final JwtConfig jwtConfig;

    @Value("${app.jwt.issuer}") String issuer;
    @Value("${app.jwt.access-token-ttl}") Duration ttl;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest req) {
        System.out.println(">> login() called with email: " + req.email());
        System.out.println(">> login() request password >>>>>> " + req.password());
        System.out.println(">> Trying authentication...");

        Authentication auth = null;

        try {
             auth = authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken.unauthenticated(req.email(), req.password()));

            var now = Instant.now();
            var claims = JwtClaimsSet.builder()
                    .issuer(issuer).issuedAt(now).expiresAt(now.plus(ttl))
                    .subject(req.email())
                    .claim("scope", auth.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority).toList())
                    .build();

            // ★ HS256 헤더를 명시해서 대칭키를 선택하게 만든다
            var header = JwsHeader.with(MacAlgorithm.HS256).build();

            String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();

            return ResponseEntity.ok(new TokenResponse(token, ttl.getSeconds()));

        }catch (Exception e){
            System.out.println(">> AUTH FAILED: " + e.getClass().getName());
            e.printStackTrace();  // 꼭 넣어봐
            throw e; // 401 리턴 유지
        }
    }
}

