package com.ecam.clickup.repositories;

import com.ecam.clickup.models.Idee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IdeeRepository extends JpaRepository<Idee, Long> {

    // pour chaque filtre Tri par (scoreUp - scoreDown)
    
    // Sans filtre
    @Query("SELECT i FROM Idee i ORDER BY (i.scoreUp - i.scoreDown) DESC")
    Page<Idee> findAllTrieesParScore(Pageable pageable);

    // Filtre : Catégorie uniquement
    @Query("SELECT i FROM Idee i WHERE i.categorie = :categorie ORDER BY (i.scoreUp - i.scoreDown) DESC")
    Page<Idee> findByCategorieTrieesParScore(@Param("categorie") String categorie, Pageable pageable);

    // Filtre : Année uniquement
    @Query("SELECT i FROM Idee i WHERE i.anneeConcernee = :annee ORDER BY (i.scoreUp - i.scoreDown) DESC")
    Page<Idee> findByAnneeTrieesParScore(@Param("annee") String annee, Pageable pageable);

    // Filtre croisé : Catégorie ET Année
    @Query("SELECT i FROM Idee i WHERE i.categorie = :categorie AND i.anneeConcernee = :annee ORDER BY (i.scoreUp - i.scoreDown) DESC")
    Page<Idee> findByCategorieAndAnneeTrieesParScore(@Param("categorie") String categorie, @Param("annee") String annee, Pageable pageable);



    // Compter les idées d'un auteur depuis une certaine date (ex: 7 jours)
    long countByAuteurIdAndDateCreationAfter(Long auteurId, LocalDateTime dateLimite);

    //Chercher les idées récentes d'une catégorie
    List<Idee> findByCategorieAndDateCreationAfter(String categorie, LocalDateTime dateLimite);

    // GÉNÉRATION PDF 

    // Extraction du Top 10 sur une période donnée
    @Query("SELECT i FROM Idee i WHERE i.dateCreation >= :dateDebut ORDER BY (i.scoreUp - i.scoreDown) DESC")
    List<Idee> findTopIdeesPourRapportPdf(@Param("dateDebut") LocalDateTime dateDebut, Pageable pageable);
}