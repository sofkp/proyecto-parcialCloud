FROM amazoncorretto:21-alpine-jdk
COPY ./target/micro22-0.0.1-SNAPSHOT.jar /tmp
WORKDIR /tmp
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "micro22-0.0.1-SNAPSHOT.jar"]