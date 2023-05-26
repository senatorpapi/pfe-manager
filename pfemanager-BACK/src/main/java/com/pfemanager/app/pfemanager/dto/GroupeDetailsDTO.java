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
public class GroupeDetailsDTO {

    private long id;

    private List<Long> etudiants;

    private long sujet;

    private long idEnseignant;

}
