-- Drop the database if it exists
DROP DATABASE IF EXISTS workout_app_db;

-- Create the database
CREATE DATABASE workout_app_db;

-- Connect to the newly created database
\c workout_app_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(100) NOT NULL
);

-- Create index on gyms.user_id for performance
CREATE INDEX IF NOT EXISTS idx_gyms_user_id ON gyms(user_id);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

-- Create unique constraint to prevent duplicate equipment names within the same gym
ALTER TABLE equipment
ADD CONSTRAINT unique_equipment_name_per_gym UNIQUE (gym_id, name);

-- Create index on equipment.gym_id for performance
CREATE INDEX IF NOT EXISTS idx_equipment_gym_id ON equipment(gym_id);

-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  gym_id INTEGER NOT NULL REFERENCES gyms(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  routine JSONB NOT NULL
);

-- Create indexes on workouts.user_id and workouts.gym_id for performance
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_workouts_gym_id ON workouts(gym_id);
