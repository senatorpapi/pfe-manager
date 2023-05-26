package com.pfemanager.app.pfemanager.dto;

import com.pfemanager.app.pfemanager.entities.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModifySujetDTO {

    private long id;

    private String titre;

    private String description;

    private Status status;
}
