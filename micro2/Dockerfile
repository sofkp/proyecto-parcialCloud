FROM openjdk:22-jdk
COPY micro2/target/micro22-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
