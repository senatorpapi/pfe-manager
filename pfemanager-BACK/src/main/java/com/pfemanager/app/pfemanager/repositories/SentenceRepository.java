package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Sentence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentenceRepository extends JpaRepository<Sentence, Long> {

}
