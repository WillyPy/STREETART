create table artists(
 artist_id serial,
 artist_name varchar(150),
 user_fk_id int not null,
 primary key (artist_id) 
);

create table users(
 user_id serial,
 user_firstname varchar(30) not null,
 user_lastname varchar(30) not null,
 user_username varchar(30)not null unique,
 user_email varchar(50) not null unique,
 user_password varchar(70) not null,
 user_bdate date not null,
 user_gender char(1) not null,
 primary key (user_id)
);

create table arts(
 art_id serial,
 art_year int not null,
 art_address varchar(100) not null,
 art_state varchar(15) not null,
 art_coords point not null,
 primary key (art_id)
);

create table images(
 image_id serial,
 image_link text not null,
 art_fk_id int not null,
 primary key (image_id)	
);

create table projects(
 project_id serial,
 project_name varchar(150) not null,
	primary key (project_id)
);

create table arts_projects(
 art_project_id serial,
 project_fk_id int,
 art_fk_id int,
 primary key (art_project_id)
);

create table arts_artists(
 art_artist_id serial,
 art_fk_id int not null,
 artist_fk_id int not null,
 primary key (art_artist_id)
);

ALTER TABLE arts_artists
ADD FOREIGN KEY (art_fk_id) REFERENCES arts(art_id);

ALTER TABLE arts_artists
ADD FOREIGN KEY (artist_fk_id) REFERENCES artists(artist_id);

ALTER TABLE artists 
ADD FOREIGN KEY (user_fk_id) REFERENCES users(user_id);

ALTER TABLE images
ADD FOREIGN KEY (art_fk_id) REFERENCES arts(art_id);

ALTER TABLE arts_projects
ADD FOREIGN KEY (project_fk_id) REFERENCES projects(project_id);

ALTER TABLE arts_projects
ADD FOREIGN KEY (art_fk_id) REFERENCES arts(art_id);
