# Teebox
###### React web application for Pinpointscore.

Remove files in gitignore that you want to keep in the repository:

```bash
git rm -r --cached .
```

---

# Course
###### TypeScript Node proxy server for Pinpointscore.

Run: 
ts-node index.ts

Build Dockerfile: 
docker build -t pinpointscore/course .

Deploy to Azure Container Registry:
az login
az acr login --name pinpointscore

<!-- docker pull mcr.microsoft.com/mcr/hello-world
docker tag mcr.microsoft.com/mcr/hello-world pinpointscore.azurecr.io/samples/hello-world -->
docker build -t pinpointscore/course .
docker tag pinpointscore/course pinpointscore.azurecr.io/pinpointscore/course:latest

docker push pinpointscore.azurecr.io/pinpointscore/course:latest

test the container:
docker run -d -p 8080:8080 pinpointscore.azurecr.io/pinpointscore/course

---

# Clubhouse
###### Spring Boot Java backend application for Pinpointscore.

https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21

https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.5.3&packaging=jar&jvmVersion=21&groupId=golf.pinpointscore&artifactId=clubhouse&name=clubhouse&description=Clubhouse%20for%20Pinpointscore&packageName=golf.pinpointscore.clubhouse&dependencies=lombok,docker-compose,web,security,data-jpa,h2,data-jdbc,devtools

Start the application:
```bash
./gradlew bootRun
```

Build:
```bash
./gradlew build && java -jar build/libs/pinpointscore-clubhouse-1.0.0.jar
```

Docker:
```bash
docker build --build-arg JAR_FILE=build/libs/\*.jar -t pinpointscore/clubhouse .
docker tag pinpointscore/clubhouse pinpointscore.azurecr.io/pinpointscore/clubhouse:latest
docker push pinpointscore.azurecr.io/pinpointscore/clubhouse:latest
./gradlew bootBuildImage --imageName=pinpointscore/clubhouse
```

Add user to the database:
```bash
INSERT INTO dbo.user_entity (user_id, user_name, user_first_name, user_last_name, user_email, user_country, user_city, user_course, user_handicap) 
VALUES (1, 'pinpointscore', 'Pinpoint', 'Score', 'pinpointscore@example.com', 'USA', 'Buffalo', 'Country Club of Internet', 0);
```

Search users in the database:
```bash
SELECT TOP 10 * 
FROM dbo.user_entity
ORDER BY user_id DESC;
```

Add scorecards to the database:
```bash
INSERT INTO dbo.scorecard_entity (user_id, golf_course, golf_course_par, holes_played, total_score, hole_one_score, hole_two_score, hole_three_score, hole_four_score, hole_five_score, hole_six_score, hole_seven_score, hole_eight_score, hole_nine_score, hole_ten_score, hole_eleven_score, hole_twelve_score, hole_thirteen_score, hole_fourteen_score, hole_fifteen_score, hole_sixteen_score, hole_seventeen_score, hole_eighteen_score) 
VALUES (1, 'Country Club of Internet', 72, 18, 72, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4);
```

Search scorecards in the database:
```bash
SELECT TOP 10 * 
FROM dbo.scorecard_entity
ORDER BY user_id DESC;
```

---

# Caddy
###### React Native mobile application for Pinpointscore.
