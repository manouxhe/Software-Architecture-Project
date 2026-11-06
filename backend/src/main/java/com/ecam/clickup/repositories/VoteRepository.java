package com.ecam.clickup.repositories;

import com.ecam.clickup.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    
    // Vérification de sécurité : L'élève a-t-il déjà voté pour cette idée ?
    Optional<Vote> findByUtilisateurIdAndIdeeId(Long utilisateurId, Long ideeId);

    // Initialisation de l'interface : Récupérer tous les votes d'un élève pour colorer les flèches
    List<Vote> findByUtilisateurId(Long utilisateurId);

    // Suppression en cascade (Admin) : Effacer les votes d'une idée supprimée
    void deleteByIdeeId(Long ideeId);
}