package com.ecam.clickup.services;
import com.ecam.clickup.models.Idee;
import com.ecam.clickup.repositories.IdeeRepository;
import com.ecam.clickup.services.UtilisateurService;
import com.ecam.clickup.models.Utilisateur;
import org.springframework.stereotype.Service;
import java.time.*;

@Service
public class IdeeService {
    private final IdeeRepository ideeRepository;
    private final UtilisateurService utilisateurService;

    public IdeeService(IdeeRepository ideeRepository, UtilisateurService utilisateurService) {
        this.ideeRepository = ideeRepository;
        this.utilisateurService = utilisateurService;
    }

    //Vérifier qu'un utilisateur n'envoie pas X idees par semaine -> à discuter pr le moment la limite est à 10
    //par quoi remplacer LocalDateTime
    private void verifierLimiteIdee(Idee idee){
        if (ideeRepository.countByAuteurIdAndDateCreationAfter(idee.getAuteur().getId(), LocalDateTime.now().minus(Period.ofDays(7)))>=10) {
            throw new RuntimeException("Le nombre limite d'idées envoyées au cours des 7 derniers jours est dépassée. ");
        }
    }

    // TODO : remplacer auteurId par l'utilisateur connecté quand l'authentification sera en place
    //Création d'une idée
    public Idee creer(Idee idee) {
        //checker si une idée similaire ou pareille est déjà sauvegardée dans la DB/checker le format/checker si la descrption passe les filtres
        idee.setId(null);                   //on garantit que l'inscription crée tjs une nouvelle idée
        idee.setStatut("EN_ATTENTE");
        Utilisateur auteur = utilisateurService.getById(1L);   //1L fait référence à l'user dont l'id est 1 et L représente un Long (si on avait mis 1 ce serait un int)
        idee.setAuteur(auteur);
        idee.setScoreUp(0);
        idee.setScoreDown(0);
        if (idee.getAnneeConcernee() == null || idee.getAnneeConcernee().isBlank()) {
            idee.setAnneeConcernee("TOUS");
        }
        idee.setDateCreation(LocalDateTime.now()); //on impose la date de création de l'idée à aujourd'hui
        verifierLimiteIdee(idee);
        //garantir que l'auteur de l'idée est l'utilisateur associé au compte connecté
        Idee sauvegarde = ideeRepository.save(idee);
        return sauvegarde;
    }

    private void supprimerIdee(Idee idee){
        ideeRepository.delete(idee);
    }
}