package com.boi.carelendar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Butler{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String description;

    private String role;

    @OneToMany
    @JoinColumn(name = "pet_id")
    private List<Pet> pet;
}
