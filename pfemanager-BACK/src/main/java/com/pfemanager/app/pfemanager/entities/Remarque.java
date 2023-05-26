package com.pfemanager.app.pfemanager.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Remarque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private LocalDateTime dateCreation;

    @Column
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Utilisateur remarqueBy;

    @ManyToOne
    @JoinColumn(name = "sujet_id", nullable = false)
    private Sujet sujet;

    @Lob
    private byte[] document;

    private String documentName;

    private String documentType;
}
