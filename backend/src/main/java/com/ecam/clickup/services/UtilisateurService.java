package com.ecam.clickup.services;
import com.ecam.clickup.models.Utilisateur;
import com.ecam.clickup.repositories.UtilisateurRepository;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    //verifier que l'email n'est pas déjà utilisé
    private void verifierEmailUnique(String email) {
        if (utilisateurRepository.existsByEmail(email)) {
            throw new RuntimeException("Email déjà utilisé : " + email);
        }
    }

    //inscription -> le format n'est pas checké iici mais directement via @Email dans le model
    public Utilisateur inscrire(Utilisateur utilisateur) {
        verifierEmailUnique(utilisateur.getEmail());  //checker si l'email n'est pas déjà utilisé
        utilisateur.setId(null);                   //on garantit que l'inscription crée tjs un nv compte
        utilisateur.setRole("ELEVE");
        // TODO : rajouter l'authentification / le hashage etc
        Utilisateur sauvegarde = utilisateurRepository.save(utilisateur);
        return sauvegarde;
    }




    //recherche d'un utilisateur
    public Utilisateur getById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
    }

    //connexion (différentre entre connexion en tant qu'admin/eleve)


    //modif d'un utilisateur

    //suppression d'un user -> vérif que l'user existe + que fait-on avec ses idées ?
}