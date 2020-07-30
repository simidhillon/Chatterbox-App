DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
	username CHAR(20) NOT NULL,
	PRIMARY KEY (username)
);

CREATE TABLE rooms (
	roomname CHAR(20) NOT NULL,
	PRIMARY KEY (roomname)
);

CREATE TABLE messages (
	id INT NOT NULL AUTO_INCREMENT,
	username CHAR(20),
	message TEXT,
	roomname CHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES users (username),
	FOREIGN KEY (roomname) REFERENCES rooms (roomname)
);


