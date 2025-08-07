package com.boi.carelendar.repository;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.boi.carelendar.entity.Pet;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

	@EntityGraph(attributePaths = "schedules")
	@NonNull
	List<Pet> findAll();

	Pet findPetById(Long id);
}
