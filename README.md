#  Docker IP Dev Project
Repo for work around containerization of IP Dev Project

```
for docker_eve

docker-compose up --build
```

```
for docker_app

docker run -p 3000:3000 --network=docker_eve_default docker_app
```
