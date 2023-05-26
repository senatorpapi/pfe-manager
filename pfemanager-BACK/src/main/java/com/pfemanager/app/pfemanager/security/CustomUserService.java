package com.pfemanager.app.pfemanager.security;

import com.pfemanager.app.pfemanager.entities.Utilisateur;
import com.pfemanager.app.pfemanager.repositories.UtilisateurRepository;
import com.pfemanager.app.pfemanager.services.UtilisateurService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class CustomUserService implements UserDetailsService {

    private UtilisateurService utilisateurService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = this.utilisateurService.findUserByLogin(username);
        return new User(utilisateur.getLogin(), utilisateur.getPassword(), new ArrayList<>());
    }
}
