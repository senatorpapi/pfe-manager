package com.pfemanager.app.pfemanager.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Enseignant extends Utilisateur{

    @OneToMany(mappedBy = "enseignant")
    private Set<Sujet> sujets;

}
