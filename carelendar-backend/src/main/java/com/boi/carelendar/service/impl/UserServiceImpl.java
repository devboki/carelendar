package com.boi.carelendar.service.impl;


import com.boi.carelendar.repository.ButlerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService {

    private final ButlerRepository butlerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        var u = butlerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        System.out.println(">> loadUserByUsername called with email: " + email);
        System.out.println(">> Found user: " + u.getEmail());
        System.out.println(">> Encoded pw: " + u.getPassword());

        // 최소 권한 1개 이상
        var authorities = (u.getRole() == null || u.getRole().isEmpty())
                ? "USER"
                : u.getRole();
        return org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail())
                .password(u.getPassword()) // 이미 해시
                .authorities(authorities)
                .build();
    }

}
