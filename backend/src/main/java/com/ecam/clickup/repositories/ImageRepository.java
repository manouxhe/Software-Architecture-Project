package com.ecam.clickup.repositories;

import com.ecam.clickup.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    
    // Récupérer les images associées à une idée
    List<Image> findByIdeeId(Long ideeId);

    // Suppression en cascade (Admin)
    void deleteByIdeeId(Long ideeId);
}