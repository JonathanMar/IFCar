-- Crie o banco de dados IFcar
CREATE DATABASE IF NOT EXISTS IFcar;

-- Conecte-se ao banco de dados IFcar
USE IFcar;

-- -- Crie a tabela de endereços
-- CREATE TABLE address_ride (
--     cod_address INT AUTO_INCREMENT PRIMARY KEY,
--     name_address VARCHAR(255) NOT NULL,
--     create_date_address DATE DEFAULT CURRENT_DATE(),
--     location_point_ride VARCHAR(255) NOT NULL
-- );

-- Crie a tabela de corridas
CREATE TABLE rides_tb (
    cod_ride INT AUTO_INCREMENT NOT NULL,
    status_ride INT NOT NULL DEFAULT 1,
    address_ride VARCHAR(255) NOT NULL,
    time_ride TIME NOT NULL,
    accepted_ride INT NULL DEFAULT 0,
    max_quant_ride INT NULL DEFAULT 4,
    date_ride TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cod_ride)
);

-- Crie a tabela de usuários
CREATE TABLE users_tb (
    cod_user INT AUTO_INCREMENT NOT NULL,
    email_user VARCHAR(255) NOT NULL,
    password_user VARCHAR(61) NOT NULL,
    PRIMARY KEY (cod_user)
);
