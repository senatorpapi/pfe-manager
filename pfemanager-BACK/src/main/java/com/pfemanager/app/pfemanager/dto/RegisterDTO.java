package com.pfemanager.app.pfemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {

    private String nom;
    private String prenom;
    private String email;
    private String login;
    private String password;
    private TypeUtilisateur typeUtilisateur;

}
