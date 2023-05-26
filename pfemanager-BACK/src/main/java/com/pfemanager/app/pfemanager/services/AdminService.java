package com.pfemanager.app.pfemanager.services;


import com.pfemanager.app.pfemanager.dto.CreateGroupeDTO;
import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Status;
import com.pfemanager.app.pfemanager.entities.Sujet;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AdminService {

    private final GroupeService groupeService;

    private final EtudiantService etudiantService;

    private final SujetService sujetService;

    public Groupe createGroupe(CreateGroupeDTO createGroupeDTO) {
        List<Etudiant> etudiants = createGroupeDTO.getEtudiants()
                .stream()
                .map(this.etudiantService::getEtudiantById)
                .collect(Collectors.toList());
        return this.groupeService.createGroupe(etudiants, this.sujetService.getSujetById(createGroupeDTO.getSujet()));
    }

    public Sujet setSujetStatus(long idSujet, Status status) {
        return this.sujetService.changeStatus(idSujet, status);
    }
}
