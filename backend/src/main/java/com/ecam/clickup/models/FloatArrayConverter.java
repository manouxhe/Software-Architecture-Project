package com.ecam.clickup.models;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;


/*
Le but de cette fonction est de transofmer l'embeddings en texte pour pouvoir le stocker dans SQLite.

 */
@Converter
public class FloatArrayConverter implements AttributeConverter<float[], String> {


    // Java → base : float[] devient "[0.12, -0.03, ...]"
    @Override
    public String convertToDatabaseColumn(float[] vecteur) {
        if (vecteur == null) return null;
        return Arrays.toString(vecteur);
    }

    // Base → Java : "[0.12, -0.03, ...]" redevient float[]
    @Override
    public float[] convertToEntityAttribute(String texte) {
        if (texte == null || texte.isBlank()) return null;
        String[] morceaux = texte.substring(1, texte.length() - 1).split(",");  // enlève [ ] puis découpe
        float[] vecteur = new float[morceaux.length];
        for (int i = 0; i < morceaux.length; i++) {
            vecteur[i] = Float.parseFloat(morceaux[i].trim());
        }
        return vecteur;
    }
}