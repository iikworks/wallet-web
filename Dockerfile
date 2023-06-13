# BUILD FOR DEVELOPMENT
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# BUILD FOR PRODUCTION

FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

# PRODUCTION

# BUILD FOR PRODUCTION
FROM nginx:mainline-alpine3.17 AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]