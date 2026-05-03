FROM eclipse-temurin:23-jdk-alpine
WORKDIR /app
COPY target/*app.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]