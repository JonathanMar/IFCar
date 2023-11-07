-- Cria o banco de dados IFcar
CREATE DATABASE IFcar;

-- Conecta-se ao banco de dados IFcar
\c IFcar;

-- Cria a tabela de caronas
CREATE TABLE public.caronas (
    cod serial NOT NULL,
    endereco character varying(255) NOT NULL,
    hora time without time zone NOT NULL,
    aceita integer NULL DEFAULT 0,
    quant_max integer NULL DEFAULT 4,
    PRIMARY KEY (cod)
);
