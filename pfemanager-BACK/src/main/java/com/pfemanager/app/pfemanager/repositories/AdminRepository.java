package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Administrateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Administrateur, Long> {
}

