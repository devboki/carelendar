package com.boi.carelendar.repository;

import com.boi.carelendar.entity.Butler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ButlerRepository extends JpaRepository<Butler, Long> {

    Butler findByEmailAndPassword(String email, String password);

    Optional<Butler> findByEmail(String email);

}
