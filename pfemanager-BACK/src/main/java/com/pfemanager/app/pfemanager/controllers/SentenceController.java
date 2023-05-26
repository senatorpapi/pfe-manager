package com.pfemanager.app.pfemanager.controllers;

import com.pfemanager.app.pfemanager.dto.*;
import com.pfemanager.app.pfemanager.entities.Sentence;
import com.pfemanager.app.pfemanager.entities.Utilisateur;
import com.pfemanager.app.pfemanager.services.SentenceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RequestMapping("api/sentence")
@Controller
public class SentenceController {

    private final SentenceService sentenceService;

    @PostMapping("create")
    public ResponseEntity<SentenceDetailsDTO> createSentence(CreateSentenceDTO createSentenceDTO) {
        Sentence sentence = this.sentenceService.createDateSentence(createSentenceDTO);
        SujetDetailsDTO sujetDetailsDTO = SujetDetailsDTO.builder()
                .id(sentence.getSujet().getId())
                .titre(sentence.getSujet().getTitre())
                .description(sentence.getSujet().getDescription())
                .dateCreation(sentence.getSujet().getDateCreation())
                .createdBy(sentence.getSujet().getEnseignant().getNom())
                .status(sentence.getSujet().getStatus().getMssg())
                .build();

        GroupeDetailsDTO groupeDetailsDTO = GroupeDetailsDTO.builder()
                .id(sentence.getGroupe().getId())
                .etudiants(sentence.getGroupe().getEtudiants().stream().map(Utilisateur::getId).collect(Collectors.toList()))
                .sujet(sentence.getSujet().getId())
                .build();

        SentenceDetailsDTO sentenceDetailsDTO = SentenceDetailsDTO
                .builder()
                .idSentence(sentence.getId())
                .dateSentence(sentence.getDateSentence())
                .groupe(groupeDetailsDTO)
                .sujet(sujetDetailsDTO)
                .build();

        return ResponseEntity.ok(sentenceDetailsDTO);
    }

}
