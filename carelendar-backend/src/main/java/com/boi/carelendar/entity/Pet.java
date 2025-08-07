package com.boi.carelendar.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.google.firebase.database.annotations.NotNull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "pet_seq_gen")
    @SequenceGenerator(name = "pet_seq_gen", sequenceName = "PET_SEQ", allocationSize = 1)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String species;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    @JsonManagedReference  // 직렬화 시 schedules를 포함합니다.
    private List<Schedule> schedules;
    
}