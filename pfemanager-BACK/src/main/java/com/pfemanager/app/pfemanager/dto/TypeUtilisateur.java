package com.pfemanager.app.pfemanager.dto;

public enum TypeUtilisateur {
    ETUDIANT("ETUDIANT"),
    ENSEIGNANT("ENSEIGNANT"),
    ADMIN("ADMIN");

    private final String message;

    TypeUtilisateur(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
