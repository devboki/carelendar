package com.boi.carelendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boi.carelendar.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

	List<Pet> findAll();

}
