package com.pfemanager.app.pfemanager.controllers;

import com.pfemanager.app.pfemanager.dto.CreateRemarqueDTO;
import com.pfemanager.app.pfemanager.dto.RemarqueDetailsDTO;
import com.pfemanager.app.pfemanager.entities.Remarque;
import com.pfemanager.app.pfemanager.services.RemarqueService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@RequestMapping("api/remarque")
public class RemarqueController {

    private final RemarqueService remarqueService;

    @GetMapping("bysujet")
    public ResponseEntity<List<RemarqueDetailsDTO>> getRemarquesBySujet(@RequestParam long id) {
        List<Remarque> remarques = this.remarqueService.getRemarquesOfSujet(id);
        List<RemarqueDetailsDTO> remarqueDetailsDTOS = remarques.stream()
                .map(remarque -> RemarqueDetailsDTO.builder()
                        .id(remarque.getId())
                        .message(remarque.getMessage())
                        .dateCreation(remarque.getDateCreation())
                        .document(remarque.getDocument())
                        .idUser(remarque.getRemarqueBy().getId())
                        .idSujet(remarque.getSujet().getId())
                        .documentName(remarque.getDocumentName())
                        .documentType(remarque.getDocumentType())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(remarqueDetailsDTOS);
    }

    @GetMapping
    public ResponseEntity<RemarqueDetailsDTO> getRemarqueById(@RequestParam long id) {
        Remarque remarque = this.remarqueService.getRemarqueById(id);

        RemarqueDetailsDTO remarqueDetailsDTO = RemarqueDetailsDTO.builder()
                .id(remarque.getId())
                .message(remarque.getMessage())
                .dateCreation(remarque.getDateCreation())
                .document(remarque.getDocument())
                .idUser(remarque.getRemarqueBy().getId())
                .idSujet(remarque.getSujet().getId())
                .documentName(remarque.getDocumentName())
                .documentType(remarque.getDocumentType())
                .build();

        return ResponseEntity.ok(remarqueDetailsDTO);

    }

    @GetMapping("byuser")
    public ResponseEntity<List<RemarqueDetailsDTO>> getRemarquesByUser(@RequestParam long id) {
        List<Remarque> remarques = this.remarqueService.getRemarqueOfUser(id);
        List<RemarqueDetailsDTO> remarqueDetailsDTOS = remarques.stream()
                .map(remarque -> RemarqueDetailsDTO.builder()
                        .id(remarque.getId())
                        .message(remarque.getMessage())
                        .dateCreation(remarque.getDateCreation())
                        .document(remarque.getDocument())
                        .idUser(remarque.getRemarqueBy().getId())
                        .idSujet(remarque.getSujet().getId())
                        .documentName(remarque.getDocumentName())
                        .documentType(remarque.getDocumentType())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(remarqueDetailsDTOS);
    }

    @GetMapping("byuser/bysujet")
    public ResponseEntity<List<RemarqueDetailsDTO>> getRemarquesByUserBySujet(@RequestParam long idUser, @RequestParam long idSujet) {
        List<Remarque> remarques = this.remarqueService.getRemarqueOfUserInSujet(idUser, idSujet);
        List<RemarqueDetailsDTO> remarqueDetailsDTOS = remarques.stream()
                .map(remarque -> RemarqueDetailsDTO.builder()
                        .id(remarque.getId())
                        .message(remarque.getMessage())
                        .dateCreation(remarque.getDateCreation())
                        .document(remarque.getDocument())
                        .idUser(remarque.getRemarqueBy().getId())
                        .idSujet(remarque.getSujet().getId())
                        .documentName(remarque.getDocumentName())
                        .documentType(remarque.getDocumentType())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(remarqueDetailsDTOS);
    }

    @PostMapping("create")
    public ResponseEntity<RemarqueDetailsDTO> createRemarque(@RequestBody CreateRemarqueDTO createRemarqueDTO ) {
        Remarque remarque = this.remarqueService.createRemarque(createRemarqueDTO);
        RemarqueDetailsDTO remarqueDetailsDTO = RemarqueDetailsDTO.builder()
                .id(remarque.getId())
                .message(remarque.getMessage())
                .dateCreation(remarque.getDateCreation())
                .document(remarque.getDocument())
                .idUser(remarque.getRemarqueBy().getId())
                .idSujet(remarque.getSujet().getId())
                .documentName(remarque.getDocumentName())
                .documentType(remarque.getDocumentType())
                .build();

        return ResponseEntity.ok(remarqueDetailsDTO);
    }

    @PostMapping("createwithFile")
    public ResponseEntity<RemarqueDetailsDTO> createRemarqueWithFile(@RequestParam("idSujet") long idSujet, @RequestParam("idUser") long idUser, @RequestParam("message") String message, @RequestParam("file") MultipartFile file) throws IOException {
        System.out.println(idSujet + " " + idUser + message);
        CreateRemarqueDTO createRemarqueDTO = CreateRemarqueDTO.builder()
                .idSujet(idSujet)
                .idUser(idUser)
                .message(message)
                .build();
        Remarque remarque = this.remarqueService.createRemaqueWithFile(createRemarqueDTO, file);
        RemarqueDetailsDTO remarqueDetailsDTO = RemarqueDetailsDTO.builder()
                .id(remarque.getId())
                .message(remarque.getMessage())
                .dateCreation(remarque.getDateCreation())
                .document(remarque.getDocument())
                .idUser(remarque.getRemarqueBy().getId())
                .idSujet(remarque.getSujet().getId())
                .documentName(remarque.getDocumentName())
                .documentType(remarque.getDocumentType())
                .build();

        return ResponseEntity.ok(remarqueDetailsDTO);
    }
}
