package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    Optional<Groupe> findOneBySujetId(long id);
}
