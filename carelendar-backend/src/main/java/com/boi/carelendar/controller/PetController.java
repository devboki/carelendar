package com.boi.carelendar.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.boi.carelendar.dto.PetRequest;
import com.boi.carelendar.dto.PetResponse;
import com.boi.carelendar.repository.ScheduleRepository;
import com.boi.carelendar.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boi.carelendar.entity.Pet;
import com.boi.carelendar.repository.PetRepository;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    private final PetRepository petRepository;
    private final ScheduleRepository scheduleRepository;

    @GetMapping
    public List<PetResponse> getAllPets() {
        List<Pet> results = petRepository.findAll();
        return results.stream().map(PetResponse::new).collect(Collectors.toList());
    }
    
    @PostMapping("/add")
    @Transactional
    public List<PetResponse> createPets(@RequestBody PetRequest request) {
        Pet pet = new Pet();
        pet.setName(request.getName());
        pet.setSpecies(request.getSpecies());
        petService.savePet(pet);

        return getAllPets();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public List<PetResponse> deletePet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            scheduleRepository.deleteByPetId(id);
            petRepository.deleteById(id);
        }
        return getAllPets();
    }


    // Update API: 특정 id의 Pet 정보 갱신 (전체 필드 업데이트)
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        return petRepository.findById(id)
            .map(existingPet -> {
                existingPet.setName(petDetails.getName());
                existingPet.setSpecies(petDetails.getSpecies());
                Pet updatedPet = petRepository.save(existingPet);
                return ResponseEntity.ok(updatedPet);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
}
