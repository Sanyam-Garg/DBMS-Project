show tables;
create table movie (
		id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL
);
DESCRIBE movie;

create table shows(
	showId INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id INT UNSIGNED Not Null ,
    start_time char(5) Not null,
    end_time char(5) Not null,
    foreign key(id) references movie(id) on delete cascade
);

show tables;
desc shows;
drop table shows;
create table tickets(
	showId INT UNSIGNED Not null,
    seat_number char(3) Not Null ,
    availability bool Not null,
    class varchar(8) Not null,
    primary key(seat_number,showID),
    foreign key(showId) references shows(showId) on delete cascade,
    foreign key(class) references class(class) on delete cascade
);
desc ti;
drop table ti;
desc tickets;
drop table tickets;
create table class(
	class varchar(8) NOT NULL PRIMARY KEY,
    price INT UNSIGNED Not Null 
);

show tables;
desc movie;
desc shows;
desc class;
desc tickets;