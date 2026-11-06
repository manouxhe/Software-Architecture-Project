package com.ecam.clickup.repositories;

import com.ecam.clickup.models.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    
    // Vérification de sécurité (un seul émoji par idée)
    Optional<Reaction> findByUtilisateurIdAndIdeeId(Long utilisateurId, Long ideeId);

    // Initialisation de l'interface
    List<Reaction> findByUtilisateurId(Long utilisateurId);

    // Suppression en cascade (Admin)
    void deleteByIdeeId(Long ideeId);
}