package com.ecam.clickup;

import com.ecam.clickup.repositories.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClickupApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClickupApplication.class, args);
    }

    // Le test qui va s'exécuter au démarrage
    @Bean
    public CommandLineRunner testBDD(UtilisateurRepository utilisateurRepo) {
        return args -> {
            System.out.println("========================================");
            System.out.println("🧪 TEST DE LA BASE DE DONNÉES SQLite 🧪");
            System.out.println("Nombre d'utilisateurs en base : " + utilisateurRepo.count());
            
            utilisateurRepo.findAll().forEach(user -> {
                System.out.println("- Compte trouvé : " + user.getEmail() + " (Rôle: " + user.getRole() + ")");
            });
            System.out.println("========================================");
        };
    }
}