package com.boi.carelendar.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SequenceInitializer implements CommandLineRunner {

    @PersistenceContext
    private EntityManager em;

    private final SequenceService sequenceService;

    public SequenceInitializer(SequenceService sequenceService) {
        this.sequenceService = sequenceService;
    }

    @Override
    public void run(String... args) {
        sequenceService.adjustSequences();
    }
}
