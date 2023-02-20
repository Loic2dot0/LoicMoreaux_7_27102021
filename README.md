# GROUPOMANIA

Student Project 7 (final project) for [OpenClassrooms](https://openclassrooms.com).  
Create a corporate social network.

Using Vue.js, Node.js, Express, Sequelize.

## Prerequisites

You will need to have Node and `npm` installed locally on your machine.

# Backend

## Setup
Configure your `database` in the file `backend/config/sequelize.js`
```
    database : 'your_database_name',
    username: 'your_username',
    password: 'your_password',
    host: 'localhost',
```
From the folder `backend`
```
npm install
```

## Usage
Run the server
```
node server
```
The server should run on `localhost` with default port `3000`.  
Use `Ctrl+C` in the terminal to stop the local server.

# Frontend

## Setup
From the folder `frontend`
```
npm install
```
## Usage
```
npm run serve
```
App running at:
- Local: http://localhost:8080/  

Create account and enjoy!!  
To create a moderator account, add your user Id in the `moderators` table. 