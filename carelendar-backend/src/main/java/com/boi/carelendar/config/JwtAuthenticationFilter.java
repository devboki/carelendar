package com.boi.carelendar.config;

import com.boi.carelendar.service.impl.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtDecoder jwtDecoder;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        // 1) 로그인/헬스/프리플라이트는 무조건 패스
        String path = req.getServletPath();
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())
                || path.startsWith("/auth/")
                || "/actuator/health".equals(path)) {
            chain.doFilter(req, res);
            return;
        }

        // 2) 토큰 없으면 건드리지 말고 다음 필터로 (여기서 401 내지 말 것)
        String header = req.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }


        // 3) 토큰 있으면 검증만 하고 컨텍스트 세팅, 실패해도 401 쓰지 말고 통과
        String token = header.substring(7);
        try {
            Jwt jwt = jwtDecoder.decode(token);
            String email = jwt.getSubject();

            // scope: ["ROLE_USER","ROLE_ADMIN"] 또는 "ROLE_USER ROLE_ADMIN"
            List<String> scopes = jwt.getClaimAsStringList("scope");
            if (scopes == null) {
                String s = jwt.getClaimAsString("scope");
                scopes = (s != null) ? Arrays.asList(s.split("\\s+")) : List.of();
            }
            var authorities = scopes.stream().map(SimpleGrantedAuthority::new).toList();

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                var auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            SecurityContextHolder.clearContext(); // 검증 실패 시 컨텍스트만 비움
        }
        chain.doFilter(req, res);
    }
}
