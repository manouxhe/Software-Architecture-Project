package com.ecam.clickup.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;



@Entity
public class Idee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK_id

    private String titre;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    private String categorie;
    private String anneeConcernee;
    private String statut;
    private LocalDateTime dateCreation;
    private int scoreUp;
    private int scoreDown;
    @Convert(converter = FloatArrayConverter.class)
    @Column(columnDefinition = "TEXT")
    private float[] embedding;

    public float[] getEmbedding() { return embedding; }
    public void setEmbedding(float[] embedding) { this.embedding = embedding; }

    // FK_auteur_id : Relie l'idée à un Utilisateur
    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private Utilisateur auteur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getAnneeConcernee() {
        return anneeConcernee;
    }

    public void setAnneeConcernee(String anneeConcernee) {
        this.anneeConcernee = anneeConcernee;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public int getScoreUp() {
        return scoreUp;
    }

    public void setScoreUp(int scoreUp) {
        this.scoreUp = scoreUp;
    }

    public int getScoreDown() {
        return scoreDown;
    }

    public void setScoreDown(int scoreDown) {
        this.scoreDown = scoreDown;
    }

    public Utilisateur getAuteur() {
        return auteur;
    }

    public void setAuteur(Utilisateur auteur) {
        this.auteur = auteur;
    }

}