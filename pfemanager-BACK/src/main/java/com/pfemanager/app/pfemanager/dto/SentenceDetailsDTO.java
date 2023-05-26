package com.pfemanager.app.pfemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SentenceDetailsDTO {
    private long idSentence;
    private SujetDetailsDTO sujet;
    private GroupeDetailsDTO groupe;
    private LocalDateTime dateSentence;

}
