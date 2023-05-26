package com.pfemanager.app.pfemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupeExtraDataDTO {

    private long idGroupe;
    private String sujet;
    private String prof;
    private List<String> etudiants;
}
