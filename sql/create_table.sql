DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules(

  user_id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  day VARCHAR(60) NOT NULL,
  start_at TIME NOT NULL,
  end_at TIME NOT NULL
);
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(250) NOT NULL,
  lastname VARCHAR(250) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(100) NOT NULL
);


