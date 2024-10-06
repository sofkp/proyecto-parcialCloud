FROM maven:3.9.6-eclipse-temurin-22-jammy AS BUILD
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine-jdk
WORKDIR /app
COPY target/micro22-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8002
ENTRYPOINT ["java", "-jar", "app.jar"]