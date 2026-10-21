# ---------- Stage 1: Build ----------
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts ./

# Windows line endings (CRLF) काढणे आणि gradlew executable करणे
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

COPY src src
RUN ./gradlew bootJar -x test --no-daemon

# plain jar वगळून मुख्य jar निवडणे
RUN cp "$(ls build/libs/*.jar | grep -v plain | head -n 1)" /app/app.jar

# ---------- Stage 2: Run ----------
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/app.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]