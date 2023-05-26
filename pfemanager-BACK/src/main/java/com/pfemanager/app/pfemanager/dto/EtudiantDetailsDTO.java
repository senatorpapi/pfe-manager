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
public class EtudiantDetailsDTO {

    private long id;
    private String nom;
    private String prenom;
    private String email;
    private String login;
    private LocalDateTime dateCreation;
    private SujetDetailsDTO sujet;
}
