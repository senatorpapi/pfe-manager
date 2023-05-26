package com.pfemanager.app.pfemanager.services;


import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Status;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.exceptions.BadRequestException;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.GroupeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GroupeService {

    private final GroupeRepository groupeRepository;
    private final SujetService sujetService;

    public List<Groupe> getAllGroupes() {
        return this.groupeRepository.findAll();
    }

    public Groupe getGroupeById(long id) {
        return this.groupeRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.GROUPE_NOT_FOUND.getMessage()));
    }

    public Groupe removeGroupe(long idGroupe) {
        Groupe groupe = this.getGroupeById(idGroupe);
        this.groupeRepository.delete(groupe);
        return groupe;
    }

    public Groupe getGroupeBySujet(long idSujet) {
        return this.groupeRepository.findOneBySujetId(idSujet)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.GROUPE_NOT_FOUND.getMessage()));
    }

    public Groupe getGroupeByEtudiant(long idEtudiant) {
        Groupe groupes = getAllGroupes()
                .stream().filter(groupe -> groupe.getEtudiants().stream().anyMatch(etudiant -> etudiant.getId() == idEtudiant))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(ErrorMessage.GROUPE_NOT_FOUND.getMessage()));
        return groupes;
    }

    public Groupe createGroupe(List<Etudiant> etudiants, Sujet sujet) {
        if(etudiants.size() > 3) {
            throw new BadRequestException(ErrorMessage.OVER_SIZE.getMessage());
        }
        Groupe groupe = new Groupe();
        groupe.setEtudiants(etudiants);
        groupe.setSujet(this.sujetService.changeStatus(sujet, Status.VALIDE));
        return this.groupeRepository.saveAndFlush(groupe);
    }

    public Groupe setSujet(Sujet sujet, Etudiant etudiant) {
        Groupe groupe = etudiant.getGroupe();
        groupe.setSujet(sujet);
        return this.groupeRepository.saveAndFlush(groupe);
    }


}