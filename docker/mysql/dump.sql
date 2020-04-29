CREATE TABLE userreg (
    userid VARCHAR(20),
    auth VARCHAR(20),
    PRIMARY KEY (userid)
);

INSERT INTO userreg VALUES ("jhohlfel", "admin");
INSERT INTO userreg VALUES ("eheldt", "admin");

CREATE TABLE graph (
    graphname VARCHAR(25) NOT Null,
    prodname VARCHAR(25) NOT Null,
    PRIMARY KEY (graphname)
);

INSERT INTO graph VALUES ("sampleGraph", "Schrauben");
