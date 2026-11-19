package com.ecam.clickup.dto;


/*
DTO : data transfer object car c'est un objet qui ne sert qu'à transporter des données
On ne renvoie pas Idee car il manque le score et ça contient trop d'autres infos
*/

public record IdeeSimilaire(Long id, String titre, float score) {}