package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
}
