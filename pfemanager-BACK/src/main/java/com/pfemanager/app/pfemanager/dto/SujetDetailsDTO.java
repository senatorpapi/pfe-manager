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
public class SujetDetailsDTO {

    private long id;

    private String titre;

    private String description;

    private String createdBy;

    private LocalDateTime dateCreation;

    private String status;
}
