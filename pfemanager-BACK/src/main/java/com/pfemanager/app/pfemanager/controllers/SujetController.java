package com.pfemanager.app.pfemanager.controllers;


import com.pfemanager.app.pfemanager.dto.CreateSujetDTO;
import com.pfemanager.app.pfemanager.dto.DeleteSujetDTO;
import com.pfemanager.app.pfemanager.dto.ModifySujetDTO;
import com.pfemanager.app.pfemanager.dto.SujetDetailsDTO;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.services.SujetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@RequestMapping("api/sujet")
public class SujetController {

    private final SujetService sujetService;

    @GetMapping
    public ResponseEntity<SujetDetailsDTO> getSujets(@RequestParam long id) {
        Sujet sujet = this.sujetService.getSujetById(id);
        SujetDetailsDTO sujetDetailsDTO = SujetDetailsDTO.builder()
                .id(sujet.getId())
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .createdBy(sujet.getEnseignant().getPrenom())
                .dateCreation(sujet.getDateCreation())
                .status(sujet.getStatus().getMssg())
                .build();
        return ResponseEntity.ok(sujetDetailsDTO);
    }

    @GetMapping("mysujet")
    public ResponseEntity<List<SujetDetailsDTO>> getMysujets(@RequestParam long id) {
        List<SujetDetailsDTO> sujetDetailsDTOS = this.sujetService.getMySujets(id)
                .stream()
                .map(sujet -> SujetDetailsDTO.builder()
                        .id(sujet.getId())
                        .titre(sujet.getTitre())
                        .description(sujet.getDescription())
                        .createdBy(sujet.getEnseignant().getPrenom())
                        .dateCreation(sujet.getDateCreation())
                        .status(sujet.getStatus().getMssg())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(sujetDetailsDTOS);
    }

    @GetMapping("sujetdispo")
    public ResponseEntity<List<SujetDetailsDTO>> getSujetDispo() {
        List<SujetDetailsDTO> sujets = this.sujetService.getSujetNotAffected()
                .stream()
                .map(sujet -> SujetDetailsDTO.builder()
                        .id(sujet.getId())
                        .titre(sujet.getTitre())
                        .description(sujet.getDescription())
                        .createdBy(sujet.getEnseignant().getPrenom())
                        .dateCreation(sujet.getDateCreation())
                        .status(sujet.getStatus().getMssg())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(sujets);
    }

    @GetMapping("all")
    public ResponseEntity<List<SujetDetailsDTO>> getAllSujet() {
        List<SujetDetailsDTO> sujetDetailsDTOS = this.sujetService.getAllSujet()
                .stream()
                .map(sujet -> SujetDetailsDTO.builder()
                        .id(sujet.getId())
                        .titre(sujet.getTitre())
                        .description(sujet.getDescription())
                        .createdBy(sujet.getEnseignant().getPrenom())
                        .dateCreation(sujet.getDateCreation())
                        .status(sujet.getStatus().getMssg())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(sujetDetailsDTOS);
    }

    @PostMapping("/create")
    public ResponseEntity<SujetDetailsDTO> createSujet(@RequestBody CreateSujetDTO createSujetDTO, @RequestHeader("user-id") long id) {
        Sujet sujet = this.sujetService.createSujet(createSujetDTO, id);
        SujetDetailsDTO sujetDetailsDTO = SujetDetailsDTO.builder()
                .id(sujet.getId())
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .createdBy(sujet.getEnseignant().getPrenom())
                .dateCreation(sujet.getDateCreation())
                .status(sujet.getStatus().getMssg())
                .build();
        return ResponseEntity.ok(sujetDetailsDTO);
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteSujet(@RequestBody DeleteSujetDTO deleteSujetDTO) {
        try {
            System.out.println(deleteSujetDTO.getId());
            this.sujetService.deleteSujet(deleteSujetDTO.getId());
            return ResponseEntity.ok(true);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("modify")
    public ResponseEntity<SujetDetailsDTO> modify(@RequestBody ModifySujetDTO modifySujetDTO) {
        Sujet sujet = this.sujetService.modifySujet(modifySujetDTO);
        SujetDetailsDTO sujetDetailsDTO = SujetDetailsDTO.builder()
                .id(sujet.getId())
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .status(sujet.getStatus().getMssg())
                .createdBy(sujet.getEnseignant().getNom()+ " "+ sujet.getEnseignant().getPrenom())
                .dateCreation(sujet.getDateCreation())
                .build();
        return ResponseEntity.ok(sujetDetailsDTO);
    }

}
