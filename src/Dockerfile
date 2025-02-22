FROM httpd:2.4

RUN rm /usr/local/apache2/htdocs/index.html

COPY ./conf/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./conf/htaccess /usr/local/apache2/htdocs/.htaccess
COPY ./theme /usr/local/apache2/htdocs/theme

RUN ln -s /home /usr/local/apache2/htdocs/home

EXPOSE 8080
