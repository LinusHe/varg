ALTER USER 'varg' IDENTIFIED WITH mysql_native_password BY 'l_GD6P67+V';
FLUSH PRIVILEGES;

CREATE TABLE userreg (
    userName VARCHAR(25),
    password BLOB NOT NULL,
    role CHAR(7) DEFAULT 'student' NOT NULL,
    PRIMARY KEY (userName)
);

CREATE TABLE cytographs (
    fileName VARCHAR(25) BINARY,
    userName VARCHAR(25),
    graphObject JSON,
    PRIMARY KEY (fileName, userName)
);
