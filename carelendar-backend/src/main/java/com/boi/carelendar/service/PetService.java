package com.boi.carelendar.service;

import com.boi.carelendar.entity.Pet;

import java.util.List;

public interface PetService {
    List<Pet> getAllPets();

    Pet savePet(Pet pet);

    void deletePet(Long id);
}
