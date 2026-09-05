FROM nginx:alpine

# Només exposem el frontend; backend, BBDD i altres arxius
# queden fora del directori servit per Nginx.
COPY frontend/ /usr/share/nginx/html/

EXPOSE 80
