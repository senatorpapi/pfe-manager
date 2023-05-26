package com.pfemanager.app.pfemanager.repositories;

import com.pfemanager.app.pfemanager.entities.Remarque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RemarqueRepository extends JpaRepository<Remarque, Long> {
}
