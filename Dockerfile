FROM node:22

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
