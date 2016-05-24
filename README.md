# LoveMondays-App

### Install dependencies

    npm install && bower install

Run application:

    npm run dev

Server started http://localhost:8000 - LiveReload started on port 35729

Generate build the application:

    npm run build

Server started http://localhost:8001 - LiveReload started on port 35729

### Run aplication with Docker:

Dockerfile inside the project:

    docker build -t love-mondays-app .
    
Create Container:

    docker run -it --net host love-mondays-app /bin/bash
    
Go to application folder whitin the container:
    
    cd usr/app/
    
Run or build application:

    npm run dev || npm run build