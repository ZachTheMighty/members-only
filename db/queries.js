const pool = require("./pool.js");

async function insertUser(user, hashedPassword, isAdmin) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)",
    [user.firstName, user.lastName, user.email, hashedPassword, isAdmin],
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

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  for (let i = 0; i < rows.length; i++) {
    const authorName = await pool.query(
      "SELECT first_name, last_name FROM users INNER JOIN messages ON users.id = author WHERE author = $1",
      [rows[i].author],
    );
    rows[i].author =
      `${authorName.rows[0].first_name} ${authorName.rows[0].last_name}`;
  }
  return rows;
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  insertMessage,
  updateMemberShipStatus,
  getAllMessages,
  deleteMessage,
};
