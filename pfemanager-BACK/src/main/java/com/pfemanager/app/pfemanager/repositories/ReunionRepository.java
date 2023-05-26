package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Reunion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReunionRepository extends JpaRepository<Reunion, Long> {
}
