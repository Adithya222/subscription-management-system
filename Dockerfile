# Stage 1: Build the Angular app
FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

# Stage 2: Serve the Angular app with nginx
FROM nginx:alpine
COPY --from=build /app/dist/admindashboard /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

