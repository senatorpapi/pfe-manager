package com.pfemanager.app.pfemanager.controllers;

import com.pfemanager.app.pfemanager.dto.*;
import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.services.EtudiantService;
import com.pfemanager.app.pfemanager.services.GroupeService;
import com.pfemanager.app.pfemanager.services.SujetService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Controller
@RequestMapping("/api/etudiant")
public class EtudiantContoller {

    private final EtudiantService etudiantService;

    private final SujetService sujetService;

    private final GroupeService groupeService;

    @GetMapping
    @CrossOrigin(origins = "*", methods = {RequestMethod.GET})
    public ResponseEntity<List<EtudiantDetailsDTO>> getEtudiants() {
        List<EtudiantDetailsDTO> etudiantDetailsDTOS = this.etudiantService.getEtudiants()
                .stream()
                .map(etudiant -> EtudiantDetailsDTO.builder()
                        .id(etudiant.getId())
                        .nom(etudiant.getNom())
                        .prenom(etudiant.getPrenom())
                        .email(etudiant.getEmail())
                        .login(etudiant.getLogin())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(etudiantDetailsDTOS);
    }

    @PostMapping("select")
    public void selectSujet(@RequestBody SelectSujetDTO selectSujetDTO) {
        Sujet sujet = this.sujetService.getSujetById(selectSujetDTO.getIdSujet());
        Etudiant etudiant = this.etudiantService.getEtudiantById(selectSujetDTO.getIdEtudiant());
        this.etudiantService.selectSujet(sujet, etudiant);
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteEtudiant(@RequestBody DeleteEtudiantDTO deleteEtudiantDTO) {
        try {
            this.etudiantService.deleteEtudiant(deleteEtudiantDTO.getId());
            return ResponseEntity.ok(true);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("byetudiant")
    @CrossOrigin(origins = "*", methods = {RequestMethod.GET})
    public ResponseEntity<GroupeDetailsDTO> getGroupeOfEtudiant(@RequestParam long id) {
        Groupe groupe = this.groupeService.getGroupeByEtudiant(id);
        GroupeDetailsDTO groupeDetailsDTO = GroupeDetailsDTO.builder()
                .id(groupe.getId())
                .sujet(groupe.getSujet().getId())
                .etudiants(groupe.getEtudiants().stream().map(etudiant -> etudiant.getId()).collect(Collectors.toList()))
                .idEnseignant(groupe.getSujet().getEnseignant().getId())
                .build();
        return ResponseEntity.ok(groupeDetailsDTO);
    }

    @GetMapping("dispoetudiant")
    @CrossOrigin(origins = "*", methods = {RequestMethod.GET})
    public ResponseEntity<List<EtudiantDetailsDTO>> getDispoEtudiant() {
        List<EtudiantDetailsDTO> etudiantDetails = this.etudiantService
                .getDispoEtudiants()
                .stream()
                .map(etudiant -> EtudiantDetailsDTO.builder()
                        .id(etudiant.getId())
                        .nom(etudiant.getNom())
                        .prenom(etudiant.getPrenom())
                        .email(etudiant.getEmail())
                        .login(etudiant.getLogin())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(etudiantDetails);
    }

    @GetMapping("details")
    @CrossOrigin(origins = "*", methods = {RequestMethod.GET})
    public ResponseEntity<EtudiantDetailsDTO> getEtudiantDetails(@RequestParam long id) {
        Etudiant etudiant = this.etudiantService.getEtudiantById(id);
        EtudiantDetailsDTO etudiantDetailsDTO = EtudiantDetailsDTO.builder()
                .id(etudiant.getId())
                .dateCreation(etudiant.getDateCreation())
                .email(etudiant.getEmail())
                .nom(etudiant.getNom())
                .login(etudiant.getLogin())
                .prenom(etudiant.getPrenom())
                .sujet(etudiant.getGroupe() != null ? builder(etudiant.getGroupe().getSujet()) : null)
                .build();
        return ResponseEntity.ok(etudiantDetailsDTO);
    }

    private SujetDetailsDTO builder(Sujet sujet) {
        return SujetDetailsDTO.builder()
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .createdBy(sujet.getEnseignant().getNom()+ " "+ sujet.getEnseignant().getPrenom())
                .id(sujet.getId())
                .status(sujet.getStatus().getMssg())
                .dateCreation(sujet.getDateCreation())
                .build();
    }


}
