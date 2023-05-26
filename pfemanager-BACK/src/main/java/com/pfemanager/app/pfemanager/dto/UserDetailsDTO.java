package com.pfemanager.app.pfemanager.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetailsDTO {

    private long userId;

    private String username;

    private String token;

    private TypeUtilisateur typeUtilisateur;

}
