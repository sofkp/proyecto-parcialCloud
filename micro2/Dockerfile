FROM openjdk:17-jdk-slim
WORKDIR /micro2
COPY target/micro22-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8002
ENTRYPOINT ["java", "-jar", "app.jar"]
