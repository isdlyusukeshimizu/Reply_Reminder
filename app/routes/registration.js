var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("registration.js: sql execute error");
    } else {
      console.log("registration.js: sql execute success");
    }
    //pool.end();
    //res.send(results);
  });

  res.render("registration", { error: null, route: null });
});

// ユーザー登録エンドポイント
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`regist_username:${username}`);
  console.log(`regist_pass:${password}`);

  const sql = `
  INSERT INTO users (username, password)
  SELECT ?, ?
  WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = ?
  );
`;
  pool.query(sql, [username, password, username], (err, result) => {
    if (err) {
      res.render("registration", {
        error: "Error registering user",
        route: null,
      });
    } else if (result.affectedRows === 0) {
      // ユーザー名が既に存在する場合
      res.render("registration", {
        error: "Username already exists",
        route: null,
      });
    } else {
      res.render("index", { error: null, route: "/" });
    }
  });
});

module.exports = router;
