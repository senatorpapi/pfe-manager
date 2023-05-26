package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

}
