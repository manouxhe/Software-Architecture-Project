package com.ecam.clickup.repositories;

import com.ecam.clickup.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    // Recherche de compte (Login)
    Optional<Utilisateur> findByEmail(String email);        //utilisé pour la connexion
    boolean existsByEmail(String email);        //utilisé pour l'inscription -> on doit juste savoir si ça existe ou non
}