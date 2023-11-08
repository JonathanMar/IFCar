-- Create the database IFcar
CREATE DATABASE IFcar;

-- Connect to the IFcar database
\c IFcar;

-- Create the rides table
CREATE TABLE public.rides_tb (
    cod_ride serial NOT NULL,
    address_ride character varying(255) NOT NULL,
    time_ride time without time zone NOT NULL,
    accepted_ride integer NULL DEFAULT 0,
    max_quant_ride integer NULL DEFAULT 4,
    date_ride DATE DEFAULT CURRENT_DATE, 
    PRIMARY KEY (cod_ride)
);

-- Create the users table
CREATE TABLE
  public.users_tb (
    cod_user serial NOT NULL,
    email_user character varying(255) NOT NULL,
    password_user character varying(61) NOT NULL,
    PRIMARY KEY (cod_ride)
);
