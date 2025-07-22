package com.boi.carelendar.entity;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Pet과 다대일 관계: 한 pet에는 여러 일정이 있을 수 있음
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    @JsonBackReference  // 직렬화할 때 pet 객체는 무시합니다.
    private Pet pet;

    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}