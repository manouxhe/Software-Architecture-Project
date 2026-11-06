# On part d'une base officielle contenant Java 21
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# On donne les droits d'exécution au wrapper Maven
RUN chmod +x mvnw

# La commande qui s'exécutera au démarrage
CMD ["./mvnw", "spring-boot:run"]