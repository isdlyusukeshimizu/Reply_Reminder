const mysql = require("mysql");

const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: "ice_number1",
  port: 3306,
  database: "chatapp",
  charset: "utf8mb4" // 文字セットを指定する
});

//接続確認
pool.getConnection((err, connection) => {
  console.log("Connected to the database・・・");
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }

  console.log("データベース接続に成功しました!!!");
  connection.release(); // 接続をリリース
});

module.exports = pool;
