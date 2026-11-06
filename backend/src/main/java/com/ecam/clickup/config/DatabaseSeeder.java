package com.ecam.clickup.config;

import com.ecam.clickup.models.Utilisateur;
import com.ecam.clickup.repositories.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner initDatabase(UtilisateurRepository utilisateurRepo) {
        return args -> {
            // Ne s'exécute que si la table est complètement vide
            if (utilisateurRepo.count() == 0) {
                System.out.println("🌱 Initialisation des données de test...");

                Utilisateur manar = new Utilisateur();
                manar.setEmail("23346@ecam.be");
                manar.setMotDePasse("manar123");
                manar.setRole("ELEVE");

                Utilisateur charlotte = new Utilisateur();
                charlotte.setEmail("25458@ecam.be");
                charlotte.setMotDePasse("charlotte123");
                charlotte.setRole("ELEVE");

                Utilisateur kenza = new Utilisateur();
                kenza.setEmail("23268@ecam.be");
                kenza.setMotDePasse("kenza123");
                kenza.setRole("ELEVE");

                Utilisateur nomena = new Utilisateur();
                nomena.setEmail("22336@ecam.be");
                nomena.setMotDePasse("nomena123");
                nomena.setRole("ELEVE");

                Utilisateur ayoub = new Utilisateur();
                ayoub.setEmail("23218@ecam.be");
                ayoub.setMotDePasse("ayoub123");
                ayoub.setRole("ELEVE");

                // Sauvegarde de tous les utilisateurs
                utilisateurRepo.save(manar);
                utilisateurRepo.save(charlotte);
                utilisateurRepo.save(kenza);
                utilisateurRepo.save(nomena);
                utilisateurRepo.save(ayoub);

                System.out.println("✅ 5 utilisateurs créés avec succès !");
            } else {
                System.out.println("✅ Base de données déjà initialisée, aucun ajout nécessaire.");
            }
        };
    }
}