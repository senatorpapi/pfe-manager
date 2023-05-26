package com.pfemanager.app.pfemanager.services;

import com.pfemanager.app.pfemanager.dto.CreateSujetDTO;
import com.pfemanager.app.pfemanager.dto.ModifySujetDTO;
import com.pfemanager.app.pfemanager.dto.SujetDetailsDTO;
import com.pfemanager.app.pfemanager.entities.Enseignant;
import com.pfemanager.app.pfemanager.entities.Status;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.entities.Utilisateur;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.EnseignantRepository;
import com.pfemanager.app.pfemanager.repositories.SujetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SujetService {

    private final SujetRepository sujetRepository;

    private final EnseignantRepository enseignantRepository;

    public List<Sujet> getAllSujet() {
        return this.sujetRepository.findAll();
    }

    public Sujet getSujetById(long id) {
         return this.sujetRepository
                .findById(id)
                 .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_SUJET.getMessage()));
    }

    public Sujet createSujet(CreateSujetDTO createSujetDTO, long creatorId) {
        Utilisateur user = this.getUtilisateur(creatorId);
        Sujet sujet = new Sujet();
        sujet.setTitre(createSujetDTO.getTitre());
        sujet.setDescription(createSujetDTO.getDescription());
        sujet.setDateCreation(LocalDateTime.now());
        sujet.setEnseignant((Enseignant) user);
        sujet.setStatus(Status.ENCOURS);
        System.out.println("create user");
        Sujet sujetCreated = this.sujetRepository.saveAndFlush(sujet);
        System.out.println("user created");
        return sujetCreated;
    }

    public Sujet changeStatus(long idSujet, Status status) {
        Sujet sujet =  this.getSujetById(idSujet);
        sujet.setStatus(status);
        return this.sujetRepository.saveAndFlush(sujet);
    }

    private Utilisateur getUtilisateur(long id) {
        return this.enseignantRepository.findById(id)
                .orElseThrow( () -> new NotFoundException(ErrorMessage.ENSEIGNANT_NOT_FOUND.getMessage()));
    }

    public List<Sujet> getMySujets(long id) {
        return this.getAllSujet()
                .stream()
                .filter(sujet -> sujet.getEnseignant().getId() == id)
                .collect(Collectors.toList());
    }

    public List<Sujet> getSujetNotAffected() {
        return this.getAllSujet()
                .stream()
                .filter(sujet -> sujet.getGroupe() == null)
                .collect(Collectors.toList());
    }

    public void deleteSujet(long id) {
        Sujet sujet = this.getSujetById(id);
        System.out.println(sujet.getTitre());
        this.sujetRepository.delete(sujet);
        System.out.println("delete sujet");
    }

    public Sujet modifySujet(ModifySujetDTO modifySujetDTO) {
        Sujet sujet =  this.getSujetById(modifySujetDTO.getId());
        sujet.setTitre(modifySujetDTO.getTitre());
        sujet.setDescription(modifySujetDTO.getDescription());
        sujet.setStatus(modifySujetDTO.getStatus());
        return this.sujetRepository.saveAndFlush(sujet);
    }

    public Sujet changeStatus(Sujet sujet, Status status) {
        sujet.setStatus(status);
        return this.sujetRepository.saveAndFlush(sujet);
    }

}
