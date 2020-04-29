FROM mysql:latest
ENV MYSQL_USER=varg
ENV MYSQL_PASSWORD=VarG2020
ENV MYSQL_DATABASE=vargdb
ENV MYSQL_ROOT_PASSWORD=geheim
VOLUME [ "./dump.sql:/docker-entrypoint-initdb.d/dump.sql" ]
ADD dump.sql /docker-entrypoint-initdb.d