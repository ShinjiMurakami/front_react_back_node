const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3001

const connection = mysql.createConnection({
  host: 'manhourdb.ceu9ml5jdncv.ap-northeast-1.rds.amazonaws.com',
  user: 'manhour_user',
  password: 'mrsw1924',
  database: 'manhourdb'
});

app.get("/api", (req, res) => {
  connection.query(
    'SELECT * FROM `t_project`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results[0]});
    }
  );
  console.log("接続終了(正常)");
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})


