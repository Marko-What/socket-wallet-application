CREATE DATABASE walletDb;

CREATE TABLE Wallet (
    id SERIAL PRIMARY KEY,
    playerId INT,
    datetime date,   
    balance INT
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    playerId INT,
    time date, 
    transactionAmount INT, 
    newWalletAmount INT
);


 CREATE TABLE transactionType  (
      id SERIAL PRIMARY KEY,
      type VARCHAR(24),
      timeCreated date,
      transactionId INT
);



/* database created for integration testing purposes */

CREATE DATABASE walletdbTests;

CREATE TABLE Wallet (
    id SERIAL PRIMARY KEY,
    playerId INT,
    datetime date,   
    balance INT
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    playerId INT,
    timeCreated date,
    transactionAmount INT,
    newWalletAmount INT
);


 CREATE TABLE transactionType (
      id SERIAL PRIMARY KEY,
      type VARCHAR(24),
      timeCreated date,
      transactionId INT
);
