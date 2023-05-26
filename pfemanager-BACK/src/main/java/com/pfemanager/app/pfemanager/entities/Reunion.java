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
public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;

    @Column
    private LocalDateTime dateStart;

    @Column
    private String nomSalle;

    @ManyToOne
    @JoinColumn(name = "enseignant_id", nullable = false)
    private Enseignant organiseBy;

    @ManyToOne
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiantConcernee;
}
