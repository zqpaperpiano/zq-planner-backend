const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:Eisuke0111@localhost:5433/planner-app');

module.exports = db;