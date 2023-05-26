package com.pfemanager.app.pfemanager.controllers;

import com.pfemanager.app.pfemanager.config.JwtTokenUtil;
import com.pfemanager.app.pfemanager.dto.*;
import com.pfemanager.app.pfemanager.entities.Utilisateur;
import com.pfemanager.app.pfemanager.security.JwtRequest;
import com.pfemanager.app.pfemanager.security.JwtResponse;
import com.pfemanager.app.pfemanager.services.UtilisateurService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@RequestMapping("api/utilisateur")
@CrossOrigin
public class UtilisateurController {


    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserDetailsService jwtInMemoryUserDetailsService;

    private final UtilisateurService utilisateurService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> register(@RequestBody RegisterDTO registerDTO) {
        registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        return ResponseEntity.ok(this.utilisateurService.register(registerDTO));
    }

    @GetMapping("user")
    public ResponseEntity<UserDetailsDTO> getUserDetails(@RequestParam String username) {
        Utilisateur user = this.utilisateurService.findUserByLogin(username);
        TypeUtilisateur type = this.utilisateurService.getTypeOfUser(user.getId());

        UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder()
                .userId(user.getId())
                .username(username)
                .typeUtilisateur(type)
                .build();
        return ResponseEntity.ok(userDetailsDTO);
    }

    @GetMapping("profs")
    public ResponseEntity<List<EnseignantDetailsDTO>> getAllProfs() {
        List<EnseignantDetailsDTO> enseignantDetails = this.utilisateurService.getAllEnseignants()
                .stream()
                .map(enseignant -> EnseignantDetailsDTO.builder()
                        .id(enseignant.getId())
                        .nom(enseignant.getNom())
                        .prenom(enseignant.getPrenom())
                        .email(enseignant.getEmail())
                        .login(enseignant.getLogin())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(enseignantDetails);
    }

    @GetMapping("details")
    public ResponseEntity<UserDTO> getUserById(@RequestParam long id) {
        Utilisateur utilisateur = this.utilisateurService.findUserById(id);
        UserDTO userDTO = UserDTO.builder()
                .id(utilisateur.getId())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .email(utilisateur.getEmail())
                .login(utilisateur.getLogin())
                .build();
        return ResponseEntity.ok(userDTO);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        Utilisateur user = this.utilisateurService.findUserByLogin(authenticationRequest.getUsername());
        TypeUtilisateur type = this.utilisateurService.getTypeOfUser(user.getId());

        UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder()
                .userId(user.getId())
                .username(authenticationRequest.getUsername())
                .typeUtilisateur(type)
                .token(token)
                .build();
        return ResponseEntity.ok(userDetailsDTO);
    }

    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
