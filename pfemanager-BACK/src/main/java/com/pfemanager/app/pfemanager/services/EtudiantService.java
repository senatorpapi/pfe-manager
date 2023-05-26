package com.pfemanager.app.pfemanager.services;

import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.EtudiantRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;
    private final GroupeService groupeService;


    public List<Etudiant> getEtudiants() {
        return this.etudiantRepository.findAll();
    }

    public Etudiant getEtudiantById(long id) {
        return this.etudiantRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.ETUDIANT_NOT_FOUND.getMessage()));
    }

    public void selectSujet(Sujet sujet, Etudiant etudiant) {
        this.groupeService.setSujet(sujet, etudiant);
    }

    public void deleteEtudiant(long id) {
        Etudiant etudiant = this.getEtudiantById(id);
        this.etudiantRepository.delete(etudiant);
    }

    public List<Etudiant> getDispoEtudiants() {
        return this.getEtudiants()
                .stream()
                .filter(etudiant -> etudiant.getGroupe() == null)
                .collect(Collectors.toList());
    }

    public void saveGroupe(Etudiant etudiant, Groupe groupe) {
        etudiant.setGroupe(groupe);
        this.etudiantRepository.save(etudiant);
    }

}
