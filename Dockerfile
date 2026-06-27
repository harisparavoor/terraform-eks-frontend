#FROM node:20
FROM 532607548077.dkr.ecr.us-east-1.amazonaws.com/mynodeapp-frontend-dev:latest
ARG REACT_APP_BACKEND_URL=http://localhost:8080
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

WORKDIR /app

COPY package.json ./
COPY webpack.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npx", "webpack", "serve", "--host", "0.0.0.0", "--port", "3000"]
