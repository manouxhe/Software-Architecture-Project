package com.ecam.clickup.controllers;

import com.ecam.clickup.dto.IdeeSimilaire;                         // NOUVEAU
import com.ecam.clickup.exceptions.IdeesSimilairesException;       // NOUVEAU
import com.ecam.clickup.models.Idee;
import com.ecam.clickup.services.IdeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;                         // NOUVEAU
import org.springframework.http.ResponseEntity;                     // NOUVEAU
import org.springframework.web.bind.annotation.*;

import java.util.List;                                              // NOUVEAU

@RestController
@RequestMapping("/api/idees")
public class IdeeController {

    private final IdeeService ideeService;        // le controller dépend du service

    public IdeeController(IdeeService ideeService) {
        this.ideeService = ideeService;
    }

    @PostMapping        // Création, méthode HTTP POST
    public Idee creation(@Valid @RequestBody Idee idee,
                         @RequestParam(defaultValue = "false") boolean forcer) {   // NOUVEAU
        return ideeService.creer(idee, forcer);                                    // NOUVEAU
        // reçoit la requête et transmet au service, qui vérifie les doublons sauf si forcer = true
    }

    // NOUVEAU : si le service détecte des doublons, on renvoie 409 + la liste au lieu d'une erreur 500
    @ExceptionHandler(IdeesSimilairesException.class)
    public ResponseEntity<List<IdeeSimilaire>> gererDoublons(IdeesSimilairesException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getSimilaires());
    }
}