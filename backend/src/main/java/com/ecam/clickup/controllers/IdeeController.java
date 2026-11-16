package com.ecam.clickup.controllers;

import com.ecam.clickup.models.Idee;
import com.ecam.clickup.services.IdeeService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/idees")
public class IdeeController {

    private final IdeeService ideeService;        //le controller dépend du service

    public IdeeController(IdeeService ideeService) {
        this.ideeService = ideeService;
    }

    @PostMapping        //Création, méthode HTPP POST
    public Idee creation(@Valid @RequestBody Idee idee) {
        return ideeService.creer(idee);
    }
}