package com.pfemanager.app.pfemanager.entities;

public enum Status {
    VALIDE("VALIDE"),
    ENCOURS("ENCOURS"),
    REJET("REJET");

    private final String mssg;

    Status(final String mssg) {
        this.mssg = mssg;
    }

    public String getMssg() {
        return mssg;
    }
}
