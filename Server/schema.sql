
-- create database DevMeets
-- use DevMeets

  -- create table users
    -- id  (PRIMARYKEY) (integer)
    -- first name (varchar 50)
    -- email (varchar 50)
    -- password (varchar 50)


  -- create table saved-starred 
    -- user id (integer) FOREIGN KEY
    -- meetup id (integer) FOREIGN KEY


  -- create table austin meetups
    -- id (PRIMARY KEY)
    -- date 
    -- time
    -- location
    -- title
    -- description

CREATE DATABASE DevMeet;

Use DevMeet;

CREATE TABLE users(
        id SERIAL
    ,   first_name VARCHAR(30)
    ,   email VARCHAR(40)
    ,   password VARCHAR(50)
    ,   PRIMARY KEY (id)
);

CREATE TABLE meetups(
        id SERIAL
    ,   name VARCHAR(30)
    ,   description VARCHAR(500)
    ,   start_time TIMESTAMP
    ,   end_time TIMESTAMP
    ,   PRIMARY KEY (id)
);


CREATE TABLE starred(
        id SERIAL
    ,   meetup_id INT
    ,   user_id INT 
    ,   FOREIGN KEY (meetup_id) REFERENCES meetups(id)
    ,   FOREIGN KEY (user_id) REFERENCES users(id)
);


