var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
/*
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error(`teacher.js: sql execute error:${err}`);
    } else {
      console.log("teacher.js: sql execute success");
    }
    //pool.end();
    //res.send(results);
  });

  //res.render("teacher", { username: req.session.username });
});
//
*/

router.get("/", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;

  if (!username || !password) {
    console.log("No username or password in session");
    return res.redirect("/");
  }

  pool.query(
    "SELECT user_id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      //if (err) throw err;
      if (err) {
        console.error(`GET /teacher: Error querying user_id: ${err.message}`);
        return res.status(500).send("Database error");
      }

      if (results.length > 0) {
        const userId = results[0].user_id;
        const send2 = "Onoteacher";

        pool.query(
          "SELECT * FROM messages WHERE send2 = ? OR sender = 'Onoteacher' ORDER BY created_at ASC",
          [send2],
          (err, messages) => {
            //if (err) throw err;
            if (err) {
              console.error(
                `GET /teacher: Error querying messages: ${err.message}`
              );
              return res.status(500).send("Database error");
            }
            const sql = "SELECT username FROM users WHERE username <> ?;";

            pool.query(sql, ["Onoteacher"], (err, userList) => {
              if (err) {
                console.error(
                  `GET /teacher: Error querying messages: ${err.message}`
                );
                return res.status(500).send("Database error");
              }

              //console.log(userList);
              //console.log(messages);
              res.render("teacher", {
                username: username,
                messages: messages,
                userList: userList,
              });
            });

            //console.log("GET /teacher: Messages fetched:", messages);
          }
        );
      } else {
        console.log("No matching user found");
        res.redirect("/");
      }
    }
  );
});

// メッセージ送信
router.post("/send", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  const message = req.body.message;
  const status = "返信済";
  const send2 = req.body.selectedUser;

  console.log("選択されたユーザー:", send2);

  if (!username || !password) {
    return res.redirect("/");
  }

  pool.query(
    "SELECT user_id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        const userId = results[0].user_id;

        pool.query(
          "INSERT INTO messages (user_id, message, status, sender, send2) VALUES (?, ?, ?, ?, ?)",
          [userId, message, status, username, send2],
          (err) => {
            if (err) throw err;
            const query = "UPDATE messages SET status = ? WHERE sender = ?";
            const readStatus="返信済";
            pool.query(query,[readStatus,send2],(err,results)=>{
              if (err) throw err;
              console.log("status changed!");
            });

            res.redirect("/teacher");
          }
        );
      } else {
        res.redirect("/");
      }
    }
  );
});

module.exports = router;
