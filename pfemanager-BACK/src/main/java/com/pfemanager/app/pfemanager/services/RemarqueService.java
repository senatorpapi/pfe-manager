package com.pfemanager.app.pfemanager.services;

import com.pfemanager.app.pfemanager.dto.CreateRemarqueDTO;
import com.pfemanager.app.pfemanager.entities.Remarque;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.RemarqueRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RemarqueService {


    private final RemarqueRepository remarqueRepository;
    private final SujetService sujetService;
    private final UtilisateurService utilisateurService;

    public Remarque getRemarqueById(long id) {
        return this.remarqueRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.REMARQUE_NOT_FOUND.getMessage()));
    }

    public void removeRemarqueById(long id) {
        Remarque remarque = this.getRemarqueById(id);
        this.remarqueRepository.delete(remarque);
    }

    public List<Remarque> getRemarquesOfSujet(long id) {
        return this.remarqueRepository
                .findAll()
                .stream()
                .filter(remarque -> remarque.getSujet().getId() == id)
                .collect(Collectors.toList());
    }

    public List<Remarque> getRemarqueOfUser(long idUser) {
        return this.remarqueRepository
                .findAll()
                .stream()
                .filter(remarque -> remarque.getRemarqueBy().getId() == idUser)
                .collect(Collectors.toList());

    }

    public List<Remarque> getRemarqueOfUserInSujet(long idUser, long idSujet) {
        return this.remarqueRepository
                .findAll()
                .stream()
                .filter(remarque -> remarque.getSujet().getId() == idSujet && remarque.getRemarqueBy().getId() == idUser)
                .collect(Collectors.toList());
    }

    public Remarque createRemarque(CreateRemarqueDTO createRemarqueDTO) {
        Remarque remarque = Remarque.builder()
                .sujet(this.sujetService.getSujetById(createRemarqueDTO.getIdSujet()))
                .remarqueBy(this.utilisateurService.findUserById(createRemarqueDTO.getIdUser()))
                .message(createRemarqueDTO.getMessage())
                .dateCreation(LocalDateTime.now())
                .build();
        return this.remarqueRepository.saveAndFlush(remarque);
    }

    public Remarque createRemaqueWithFile(CreateRemarqueDTO createRemarqueDTO, MultipartFile file) throws IOException {
        Remarque remarque = Remarque.builder()
                .sujet(this.sujetService.getSujetById(createRemarqueDTO.getIdSujet()))
                .remarqueBy(this.utilisateurService.findUserById(createRemarqueDTO.getIdUser()))
                .message(createRemarqueDTO.getMessage())
                .dateCreation(LocalDateTime.now())
                .document(file.getBytes())
                .documentName(file.getOriginalFilename())
                .documentType(file.getContentType())
                .build();
        return this.remarqueRepository.saveAndFlush(remarque);
    }

}
