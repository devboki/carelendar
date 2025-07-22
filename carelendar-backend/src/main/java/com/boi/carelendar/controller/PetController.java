package com.boi.carelendar.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<List<Pet>> createPets(@RequestBody List<Pet> pets) {
    	pets.forEach(pet -> {
            System.out.println(">> Pet Name: " + pet.getName() + ", Species: " + pet.getSpecies());
        });
    	
        List<Pet> savedPets = petRepository.saveAll(pets);
        return ResponseEntity.ok(savedPets);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
    	System.out.println("DELETE endpoint hit for id: " + id);
    	
    	//있는지 확인
        if (!petRepository.existsById(id)) {
        	System.out.println("Pet not found for id: " + id);
            return ResponseEntity.notFound().build(); // 없으면 404 반환
        }
        
        System.out.println("Pet deleted for id: " + id);
        petRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 삭제 성공 시 204 반환
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
