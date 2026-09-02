const pool = require("./pool.js");

async function insertUser(user, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [user.firstName, user.lastName, user.email, hashedPassword],
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function insertMessage(message) {
  await pool.query(
    "INSERT INTO messages (message, date, author) VALUES ($1, $2, $3)",
    [message.message, message.date, message.author],
  );
}

async function updateMemberShipStatus(userId, status) {
  await pool.query("UPDATE users SET membership_status = $2 WHERE id= $1", [
    userId,
    status,
  ]);
}

module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  insertMessage,
  updateMemberShipStatus,
};
