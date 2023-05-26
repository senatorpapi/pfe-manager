package com.pfemanager.app.pfemanager.services;

import com.pfemanager.app.pfemanager.dto.CreateSentenceDTO;
import com.pfemanager.app.pfemanager.dto.UpdateDateSentenceDTO;
import com.pfemanager.app.pfemanager.entities.Enseignant;
import com.pfemanager.app.pfemanager.entities.Groupe;
import com.pfemanager.app.pfemanager.entities.Sentence;
import com.pfemanager.app.pfemanager.entities.Sujet;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.SentenceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SentenceService {

    private final SentenceRepository sentenceRepository;

    private final SujetService sujetService;

    private final GroupeService groupeService;

    private final EnseignantService enseignantService;

    public Sentence createDateSentence(CreateSentenceDTO createSentenceDTO) {
        Sujet sujet = this.sujetService.getSujetById(createSentenceDTO.getIdSujet());
        Groupe groupe = this.groupeService.getGroupeById(createSentenceDTO.getIdGroupe());
        Enseignant enseignant = this.enseignantService.getEnseignantById(createSentenceDTO.getIdEnseignant());
        Sentence sentence = Sentence.builder()
                .dateSentence(createSentenceDTO.getDateSentence())
                .enseignant(enseignant)
                .groupe(groupe)
                .sujet(sujet)
                .build();
        return this.sentenceRepository.saveAndFlush(sentence);
    }

    public List<Sentence> getAllSentence() {
        return this.sentenceRepository.findAll();
    }

    public Sentence getSentenceById(long id) {
        return this.sentenceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.SENTENCE_NOT_FOUND.getMessage()));
    }

    public Sentence updateDateSentence(UpdateDateSentenceDTO updateDateSentenceDTO) {
        Sentence sentence = this.getSentenceById(updateDateSentenceDTO.getIdSentence());
        sentence.setDateSentence(updateDateSentenceDTO.getDateSentence());
        return this.sentenceRepository.saveAndFlush(sentence);
    }
}
