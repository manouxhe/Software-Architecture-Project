package com.ecam.clickup.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Map;

@Component                                   // (a)
public class EmbeddingClient {

    private final RestClient restClient;     // (b)

    public EmbeddingClient(@Value("${embedding.url}") String url) {   // (c)
        this.restClient = RestClient.create(url);
    }

    public float[] embed(String texte) {     // (d)
        EmbedResponse reponse = restClient.post()
                .uri("/embed")
                .body(Map.of("texte", texte))
                .retrieve()
                .body(EmbedResponse.class);
        if (reponse == null || reponse.embedding() == null) {
            throw new RestClientException("Réponse vide du service d'embedding");
        }
        return reponse.embedding();

    }

    record EmbedResponse(float[] embedding) {}   // (e)
}