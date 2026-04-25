SETUP NOTES

1. Database initialization
create database and run init.sql

2. Environment variables
Create a .env file based on .env.example, fill in the required values

3. nginx configuration
    - all /api/ requests must be proxied to backend: /api/ => http://localhost:3000
    - all non-/api/ routes => index.html
    - uploads folder handling: /uploads/ => /backend/uploads