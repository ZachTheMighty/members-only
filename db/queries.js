const pool = require("./pool.js");

async function insertUser(user, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [user.firstName, user.lastName, user.email, hashedPassword],
  );
}

module.exports = {
  insertUser,
};
