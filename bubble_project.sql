
CREATE DATABASE  IF NOT EXISTS `bubble_project`;

USE `bubble_project`;
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `dataRegistrazione` date not null,
  `bestScore` int(11) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

INSERT INTO user 
VALUES (1,'pippo','pippo@gmail.com','pippo',current_date,1000),
       (2,'pluto','pluto@ymail.com','pluto',current_date,1000),
       (3,'john92','john92@hotmail.it','john92',current_date,340),
       (4,'mark_71','m.mark@gmail.com','mark_71',current_date,630),
       (5,'Fefuzz','fefuzz97@gmail.com','Fefuzz',current_date,280),
       (6,'paperino','paperino@disney.com','paperino',current_date,9370),
	   (7,'minny_52','minny_52@disney.com','minny_52',current_date,3390),
       (8,'test','test@test.com','test',current_date,4640),
       (9,'pweb','pweb@pweb.com','pweb',current_date,920),
       (10,'lisanna','lisanna@hotmail.com','lisanna',current_date,1000),
       (11,'natsu','natsu@gmail.com','natsu',current_date,5000),
       (12,'erza','erza@gmail.com','erza',current_date,1000),
       (13,'mistgun','mistgun@ymail.com','mistgun',current_date,4600),
       (14,'laxus','laxus@hotmail.com','laxus',current_date,5900),
       (15,'grey','grey@hotmail.com','grey',current_date,3800);