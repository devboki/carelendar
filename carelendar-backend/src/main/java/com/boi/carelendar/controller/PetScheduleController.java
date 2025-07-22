package com.boi.carelendar.controller;

import com.boi.carelendar.entity.Schedule;
import com.boi.carelendar.repository.ScheduleRepository;
import com.boi.carelendar.repository.PetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/pets")
public class PetScheduleController {

    private final ScheduleRepository scheduleRepository;
    private final PetRepository petRepository;

    public PetScheduleController(ScheduleRepository scheduleRepository, PetRepository petRepository) {
        this.scheduleRepository = scheduleRepository;
        this.petRepository = petRepository;
    }

    // ✅ 특정 반려동물의 스케줄 조회
    @GetMapping("/{petId}/schedules")
    public ResponseEntity<List<Schedule>> getSchedulesByPet(@PathVariable Long petId) {
        List<Schedule> schedules = scheduleRepository.findByPetId(petId);
        return ResponseEntity.ok(schedules);
    }

    // ✅ 반려동물 삭제 (스케줄 먼저 제거)
    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable Long petId) {
        if (!petRepository.existsById(petId)) {
            return ResponseEntity.notFound().build();
        }

        // 1. 해당 반려동물의 스케줄 모두 삭제
        scheduleRepository.deleteAll(scheduleRepository.findByPetId(petId));

        // 2. 반려동물 삭제
        petRepository.deleteById(petId);

        return ResponseEntity.noContent().build();
    }
}