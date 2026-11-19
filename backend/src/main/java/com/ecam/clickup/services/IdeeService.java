package com.ecam.clickup.services;
import com.ecam.clickup.client.EmbeddingClient;
import com.ecam.clickup.dto.IdeeSimilaire;
import com.ecam.clickup.models.Idee;
import com.ecam.clickup.exceptions.IdeesSimilairesException;
import com.ecam.clickup.repositories.IdeeRepository;
import com.ecam.clickup.services.UtilisateurService;
import com.ecam.clickup.models.Utilisateur;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.time.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class IdeeService {
    private final IdeeRepository ideeRepository;
    private final UtilisateurService utilisateurService;
    private final EmbeddingClient embeddingClient;
    private final float seuil;
    private final int maxParSemaine;

    public IdeeService(IdeeRepository ideeRepository, UtilisateurService utilisateurService, EmbeddingClient embeddingClient,@Value("${ideas.similarity-threshold}") float seuil, @Value("${ideas.max-per-week}") int maxParSemaine) {
        this.ideeRepository = ideeRepository;
        this.utilisateurService = utilisateurService;
        this.embeddingClient = embeddingClient;
        this.seuil = seuil;
        this.maxParSemaine = maxParSemaine;
    }

    public List<IdeeSimilaire> trouverIdeeSimilaire(String texte) {
        //1) on demande le vecteur de noter idée à Python
        float[] vecteur; //création d'une liste de float pour représenter l'embedding du texte
        try{
            vecteur = embeddingClient.embed(texte);
        } catch (RestClientException e) {
            return List.of();   //si on ne reeçoit pas de réponse de embed on renvoit ue liste vide -> aucune idée similaire et on publie tant pis
        }
        //comparaison avec les embedddings des idées déjà en base
        List<IdeeSimilaire> resultats = new ArrayList<>();
        for(Idee idee : ideeRepository.findAll()) {
            if (idee.getEmbedding() == null) continue ; //si une idée n'a aps d'embeddings on l'ignore
            float score = produitScalaire(vecteur, idee.getEmbedding());
            if (score >= seuil){
                resultats.add(new IdeeSimilaire(idee.getId(),idee.getTitre(),score));
            }
        }
        resultats.sort(Comparator.comparing(IdeeSimilaire::score) .reversed());
        return resultats.stream().limit(5).toList();
    }

    private static float produitScalaire(float[] a, float[] b) {
        float somme = 0;
        for (int i = 0; i < a.length; i++) {
            somme += a[i] * b[i];
        }
        return somme;
    }

    //Vérifier qu'un utilisateur n'envoie pas X idees par semaine -> à discuter pr le moment la limite est à 10
    //par quoi remplacer LocalDateTime
    private void verifierLimiteIdee(Idee idee){

        if (ideeRepository.countByAuteurIdAndDateCreationAfter(idee.getAuteur().getId(), LocalDateTime.now().minus(Period.ofDays(7)))>=maxParSemaine) {
            throw new RuntimeException("Le nombre limite d'idées envoyées au cours des 7 derniers jours est dépassée. ");
        }
    }

    // Vérifie qu'il n'existe pas déjà des idées similaires → sinon on bloque et on renvoie la liste
    private void verifierDoublons(Idee idee) {
        List<IdeeSimilaire> similaires = trouverIdeeSimilaire(idee.getTitre());
        if (!similaires.isEmpty()) {
            throw new IdeesSimilairesException(similaires);
        }
    }

    // TODO : remplacer auteurId par l'utilisateur connecté quand l'authentification sera en place
    //Création d'une idée
    public Idee creer(Idee idee, boolean forcer) {                       // ← forcer ajouté
        idee.setId(null);
        idee.setStatut("EN_ATTENTE");
        Utilisateur auteur = utilisateurService.getById(1L);
        idee.setAuteur(auteur);
        idee.setScoreUp(0);
        idee.setScoreDown(0);
        if (idee.getAnneeConcernee() == null || idee.getAnneeConcernee().isBlank()) {
            idee.setAnneeConcernee("TOUS");
        }
        idee.setDateCreation(LocalDateTime.now());
        verifierLimiteIdee(idee);

    /*
    Vérification des doublons : au premier essai (forcer = false), on bloque si des idées similaires existent.
    L'exception remonte au Controller, qui renvoie la liste au front (react)
    Si l'étudiant choisit "Publier quand même" le front renvoie la requête avec forcer = true
    et on saute la vérification
    */
        if (!forcer) {                                                    // ← nouveau
            verifierDoublons(idee);
        }

        try {
            idee.setEmbedding(embeddingClient.embed(idee.getTitre()));
        } catch (RestClientException e) {
            // Python en panne → on enregistre quand même, sans vecteur (embedding = null)
        }

        return ideeRepository.save(idee);
    }

    private void supprimerIdee(Idee idee){
        ideeRepository.delete(idee);
    }
}