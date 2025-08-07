package com.boi.carelendar.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SequenceService {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void adjustSequences() {
        adjustSequence("Pet", "pet_seq");
        //adjustSequence("User", "user_seq"); ** 테이블 추가할때 여기서 테이블, 시퀀스 넣으면 됨
        //adjustSequence("Order", "order_seq");
    }

    private void adjustSequence(String entityName, String sequenceName) {
        Long maxId = (Long) em.createQuery("SELECT COALESCE(MAX(e.id), 0) FROM " + entityName + " e")
                .getSingleResult();

        em.createNativeQuery("SELECT setval(:seq, :val, false)")
                .setParameter("seq", sequenceName)
                .setParameter("val", maxId + 1)
                .getSingleResult(); // SELECT니까 getSingleResult() 써야 함
    }
}
