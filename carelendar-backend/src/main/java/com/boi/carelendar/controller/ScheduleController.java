package com.boi.carelendar.controller;

import com.boi.carelendar.entity.Pet;
import com.boi.carelendar.entity.Schedule;
import com.boi.carelendar.repository.PetRepository;
import com.boi.carelendar.repository.ScheduleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleRepository scheduleRepository;
    private final PetRepository petRepository;

    public ScheduleController(ScheduleRepository scheduleRepository, PetRepository petRepository) {
        this.scheduleRepository = scheduleRepository;
        this.petRepository = petRepository;
    }

    // ✅ 전체 스케줄 조회
    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // ✅ petId에 해당하는 반려동물의 스케줄 추가
    @PostMapping("/{petId}")
    public ResponseEntity<Schedule> addSchedule(@PathVariable Long petId, @RequestBody Schedule schedule) {
        Optional<Pet> petOptional = petRepository.findById(petId);
        if (!petOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        schedule.setPet(petOptional.get());
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return ResponseEntity.ok(savedSchedule);
    }
    
    // petId에 해당하는 반려동물의 스케줄 삭제
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long scheduleId) {
        if (!scheduleRepository.existsById(scheduleId)) {
            return ResponseEntity.notFound().build();
        }
        scheduleRepository.deleteById(scheduleId);
        return ResponseEntity.noContent().build();
    }

}
