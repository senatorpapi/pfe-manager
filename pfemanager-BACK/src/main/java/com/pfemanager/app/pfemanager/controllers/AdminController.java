package com.pfemanager.app.pfemanager.controllers;

import com.pfemanager.app.pfemanager.dto.*;
import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.services.AdminService;
import com.pfemanager.app.pfemanager.services.EtudiantService;
import com.pfemanager.app.pfemanager.services.GroupeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@RequestMapping("api/admin")
public class AdminController {

    private final AdminService adminService;
    private final EtudiantService etudiantService;
    private final GroupeService groupeService;

    @PostMapping("groupe")
    public ResponseEntity<GroupeDetailsDTO> createGroupe(@RequestBody CreateGroupeDTO createGroupeDTO) {
        Groupe groupe = this.adminService.createGroupe(createGroupeDTO);
        GroupeDetailsDTO groupeDetailsDTO = GroupeDetailsDTO.builder()
                .id(groupe.getId())
                .sujet(groupe.getSujet().getId())
                .etudiants(groupe.getEtudiants().stream().map(etudiant -> Long.valueOf(etudiant.getId())).collect(Collectors.toList()))
                .idEnseignant(groupe.getSujet().getEnseignant().getId())
                .build();
        List<Etudiant> etudiants = createGroupeDTO.getEtudiants()
                .stream()
                .map(id -> this.etudiantService.getEtudiantById(id))
                .collect(Collectors.toList());
        etudiants.stream()
                .forEach(etudiant -> this.etudiantService.saveGroupe(etudiant, groupe));
        return ResponseEntity.ok(groupeDetailsDTO);
    }

    @PostMapping("status/{id}")
    public ResponseEntity<SujetDetailsDTO> changeStatus(@PathVariable("id") long id, @RequestBody ChangeSujetStatusDTO changeSujetStatusDTO) {
        Sujet sujet = this.adminService.setSujetStatus(id, changeSujetStatusDTO.getStatus());
        SujetDetailsDTO sujetDetailsDTO = SujetDetailsDTO.builder()
                .id(sujet.getId())
                .createdBy(sujet.getEnseignant().getNom())
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .status(sujet.getStatus().getMssg())
                .dateCreation(sujet.getDateCreation())
                .build();
        return ResponseEntity.ok(sujetDetailsDTO);
    }

    @GetMapping("groupes")
    public ResponseEntity<List<GroupeExtraDataDTO>> getAllGroupes() {
        List<GroupeExtraDataDTO> groupes = this.groupeService.getAllGroupes()
                .stream().map(groupe -> GroupeExtraDataDTO.builder()
                        .idGroupe(groupe.getId())
                        .sujet(groupe.getSujet().getTitre())
                        .etudiants(groupe.getEtudiants().stream().map(etudiant -> etudiant.getNom()+" "+etudiant.getPrenom())
                                .collect(Collectors.toList()))
                        .prof(groupe.getSujet().getEnseignant().getNom()+" "+groupe.getSujet().getEnseignant().getNom())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(groupes);
    }

    @DeleteMapping("groupe")
    public ResponseEntity<GroupeDetailsDTO> removeGroupe(@RequestParam long idGroupe) {
        Groupe groupe = this.groupeService.removeGroupe(idGroupe);
        GroupeDetailsDTO groupeDetailsDTO = GroupeDetailsDTO.builder()
                .id(groupe.getId())
                .sujet(groupe.getSujet().getId())
                .idEnseignant(groupe.getSujet().getEnseignant().getId())
                .etudiants(groupe.getEtudiants().stream().map(etudiant -> etudiant.getId()).collect(Collectors.toList()))
                .build();
        return ResponseEntity.ok(groupeDetailsDTO);
    }

    @GetMapping("groupe")
    public ResponseEntity<GroupeDetailsDTO> getGroupeBySujetId(@RequestParam long idSujet) {
        Groupe groupe = this.groupeService.getGroupeBySujet(idSujet);
        GroupeDetailsDTO groupeDetailsDTO = GroupeDetailsDTO.builder()
                .id(groupe.getId())
                .etudiants(groupe.getEtudiants().stream().map(etudiant -> etudiant.getId()).collect(Collectors.toList()))
                .sujet(idSujet)
                .idEnseignant(groupe.getSujet().getEnseignant().getId())
                .build();
        return ResponseEntity.ok(groupeDetailsDTO);
    }
}
