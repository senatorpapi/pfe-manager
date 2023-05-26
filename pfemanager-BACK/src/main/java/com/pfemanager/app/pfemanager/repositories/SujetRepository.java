package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Sujet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SujetRepository extends JpaRepository<Sujet, Long> {
}
