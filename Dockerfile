FROM nginx:alpine

# El frontend és l'únic contingut servit per Nginx.
COPY frontend/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
