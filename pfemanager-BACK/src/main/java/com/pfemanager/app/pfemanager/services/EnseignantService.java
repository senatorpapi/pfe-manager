package com.pfemanager.app.pfemanager.services;

import com.pfemanager.app.pfemanager.entities.Enseignant;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.EnseignantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class EnseignantService {

    private EnseignantRepository enseignantRepository;

    public Enseignant getEnseignantById(long id) {
        return this.enseignantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.ENSEIGNANT_NOT_FOUND.getMessage()));
    }

    public List<Enseignant> getAllEnseignants() {
        return this.enseignantRepository.findAll();
    }
}
