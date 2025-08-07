package com.boi.carelendar.dto;

import com.boi.carelendar.entity.Pet;
import com.boi.carelendar.entity.Schedule;
import lombok.Data;

@Data
public class PetResponse {
    private Long id;
    private String name;
    private String species;
    private String message;
    private Schedule schedule;

    public PetResponse(Pet pet){
        this.id = pet.getId();
        this.species = pet.getSpecies();
        this.name = pet.getName();
    }

    public PetResponse(Schedule schedule){
        this.schedule = schedule;
    }

    public PetResponse(String message){
        this.message = message;
    }

}
