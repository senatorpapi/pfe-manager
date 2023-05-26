package com.pfemanager.app.pfemanager.services;


import com.pfemanager.app.pfemanager.dto.RegisterDTO;
import com.pfemanager.app.pfemanager.dto.TypeUtilisateur;
import com.pfemanager.app.pfemanager.entities.Administrateur;
import com.pfemanager.app.pfemanager.entities.Enseignant;
import com.pfemanager.app.pfemanager.entities.Etudiant;
import com.pfemanager.app.pfemanager.entities.Utilisateur;
import com.pfemanager.app.pfemanager.exceptions.BadRequestException;
import com.pfemanager.app.pfemanager.exceptions.ErrorMessage;
import com.pfemanager.app.pfemanager.exceptions.NotFoundException;
import com.pfemanager.app.pfemanager.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final EnseignantService enseignantService;
    public Utilisateur register(RegisterDTO registerDTO) {
        alreadyExist(registerDTO);
        Utilisateur user = null;
        switch (registerDTO.getTypeUtilisateur()){
            case ADMIN: user = new Administrateur();
            break;
            case ETUDIANT: user = new Etudiant();
            break;
            case ENSEIGNANT: user = new Enseignant();
            break;
            
        }
        user.setDateCreation(LocalDateTime.now());
        user.setNom(registerDTO.getNom());
        user.setPrenom(registerDTO.getPrenom());
        user.setLogin(registerDTO.getLogin());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(registerDTO.getPassword());
        return  this.utilisateurRepository.saveAndFlush(user);
    }

    private void alreadyExist(RegisterDTO registerDTO) {
        this.utilisateurRepository.findByLogin(registerDTO.getLogin()).ifPresent(utilisateur -> {
            throw new BadRequestException(ErrorMessage.ALREADY_EXIST.getMessage());
        });
    }

    public Utilisateur findUserByLogin(String login) {
        return this.utilisateurRepository
                .findByLogin(login)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage()));
    }

    public Utilisateur findUserById(long id) {
        return this.utilisateurRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage()));
    }

    public TypeUtilisateur getTypeOfUser(long id) {
        Utilisateur user = this.utilisateurRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage()));
        if (user instanceof Etudiant) {
            return TypeUtilisateur.ETUDIANT;
        }
        if(user instanceof Administrateur) {
            return TypeUtilisateur.ADMIN;
        }
        if (user instanceof Enseignant) {
            return TypeUtilisateur.ENSEIGNANT;
        }
        return null;
    }


    public List<Enseignant> getAllEnseignants() {
        return this.enseignantService.getAllEnseignants();
    }


}
