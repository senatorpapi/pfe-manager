package com.pfemanager.app.pfemanager.exceptions;

public enum ErrorMessage {

    NOT_FOUND_SUJET("Sujet est introuvable !"),
    ALREADY_EXIST("Utilisateur deja exist !"),
    INVALIDE_ACCOUNT("Le compte invalide !"),
    USER_NOT_FOUND("Utilisateur introuvable !"),
    ENSEIGNANT_NOT_FOUND("L'enseignant introuvable !"),
    ETUDIANT_NOT_FOUND("Etudiant not found"),
    GROUPE_NOT_FOUND("Groupe introuvable !"),
    SENTENCE_NOT_FOUND("Cannot foud this sentence"),
    OVER_SIZE("Must to be max 3"),
    REMARQUE_NOT_FOUND("Cette remarque introuvable !"),
    ALREADY_HAS_SUBJECT("Il y a deja un sujet");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage(Object ...args) {
        return String.format(message, args);
    }
}
