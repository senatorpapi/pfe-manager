package com.pfemanager.app.pfemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSentenceDTO {

    private long idEnseignant;

    private long idSujet;

    private long idGroupe;

    private LocalDateTime dateSentence;
}
