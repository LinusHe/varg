Create Table userreg (
    userid VARCHAR(20),
    auth Varchar(20),
    PRIMARY KEY (userid)
);

Insert Into userreg Values ("jhohlfel", "admin");
Insert Into userreg Values ("eheldt", "admin");

Create Table Graph (
    graphname VARCHAR(25) Not Null,
    prodname VARCHAR(25) Not Null,
    id Number(9),
    PRIMARY KEY (id)
);

INSERT INTO userreg Values ("test", "Schrauben", 1);