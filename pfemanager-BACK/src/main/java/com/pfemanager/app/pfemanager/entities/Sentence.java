package com.pfemanager.app.pfemanager.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Sentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Enseignant enseignant;

    @OneToOne(cascade = CascadeType.ALL)
    private Groupe groupe;

    @OneToOne(cascade = CascadeType.ALL)
    private Sujet sujet;

    private LocalDateTime dateSentence;
}
