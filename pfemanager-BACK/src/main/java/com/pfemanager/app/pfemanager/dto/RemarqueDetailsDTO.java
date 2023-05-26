package com.pfemanager.app.pfemanager.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RemarqueDetailsDTO {

    private long id;
    private long idUser;
    private long idSujet;
    private String message;
    private LocalDateTime dateCreation;
    private byte[] document;
    private String documentName;
    private String documentType;
}
