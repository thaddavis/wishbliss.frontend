FROM nginx:stable-alpine

COPY build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]