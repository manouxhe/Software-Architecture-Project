package com.ecam.clickup.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecam.clickup.models.IdeeValidee;

@Repository
public interface IdeeValideeRepository extends JpaRepository<IdeeValidee, Long> {

    // Récupérer les idées par statut (ex: "VALIDEE" pour la page publique,
    // "EN_ATTENTE" pour l'admin)
    // Triées de la plus récemment validée à la plus ancienne
    List<IdeeValidee> findByStatutOrderByDateValidationDesc(String statut);

    // Même chose, mais triées par date de début d'événement
    List<IdeeValidee> findByStatutOrderByDateDebutAsc(String statut);

    // Vérifier si une idée de l'urne a déjà été envoyée (évite les doublons)
    boolean existsByIdeeId(Long ideeId);
}