package com.boi.carelendar.service.impl;


import com.boi.carelendar.entity.Pet;
import com.boi.carelendar.repository.PetRepository;
import com.boi.carelendar.service.PetService;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PetServiceImpl implements PetService {
    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository){
        this.petRepository = petRepository;
    }

    @Override
    public List<Pet> getAllPets() {

       List<Pet> petList = petRepository.findAll();
       return Optional.of(petList)
               .filter(list -> !list.isEmpty())
               .orElseGet(ArrayList::new);
    }

    @Override
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
