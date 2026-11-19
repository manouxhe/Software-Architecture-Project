package com.ecam.clickup.exceptions;

import com.ecam.clickup.dto.IdeeSimilaire;

import java.util.List;

public class IdeesSimilairesException extends RuntimeException {

    private final List<IdeeSimilaire> similaires;    // la liste des doublons qu'on transporte

    public IdeesSimilairesException(List<IdeeSimilaire> similaires) {
        super("Des idées similaires existent déjà");  // le message, transmis à RuntimeException
        this.similaires = similaires;
    }

    public List<IdeeSimilaire> getSimilaires() {
        return similaires;
    }
}