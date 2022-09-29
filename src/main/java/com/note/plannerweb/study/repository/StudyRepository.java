package com.note.plannerweb.study.repository;

import com.note.plannerweb.study.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study,Long> {
    Optional<Study> findBySNO(Long SNO);
}
