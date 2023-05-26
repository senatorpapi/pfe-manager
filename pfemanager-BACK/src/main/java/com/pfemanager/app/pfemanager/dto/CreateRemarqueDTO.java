package com.pfemanager.app.pfemanager.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateRemarqueDTO {

    private long idSujet;

    private long idUser;

    private String message;
}
