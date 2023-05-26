package com.pfemanager.app.pfemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectSujetDTO {

    private long idEtudiant;

    private long idSujet;
}
