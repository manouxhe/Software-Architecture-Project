package com.ecam.clickup.controllers;

import com.ecam.clickup.models.Utilisateur;
import com.ecam.clickup.services.UtilisateurService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;        //le controller dépend du service

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping        //Création, méthode HTPP POST
    public Utilisateur inscription(@Valid @RequestBody Utilisateur utilisateur) {
        return utilisateurService.inscrire(utilisateur);
    }
}