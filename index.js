const express = require("express");
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'manhourdb.ceu9ml5jdncv.ap-northeast-1.rds.amazonaws.com',
  user: 'manhour_user',
  password: 'mrsw1924',
  database: 'manhourdb'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/posts", function(req, res) {
  var strSql = `
    SELECT
    t_manhour_list.id
    , t_manhour_list.yyyymm
    , m_user.user_name
    , t_project.project_code
    , m_product.product_name
    , t_project.project_name
    , m_process.process_name
    , t_manhour_list.hh
    , t_process_group.process_name AS process_detail
  FROM 
    t_manhour_list
    INNER JOIN m_user ON m_user.id = t_manhour_list.user_id
    INNER JOIN t_project ON t_project.id = t_manhour_list.project_id
    INNER JOIN m_product ON m_product.id = t_project.product_id
    INNER JOIN t_process_group ON t_process_group.id = t_manhour_list.process_group_id
    INNER JOIN m_process ON m_process.id = t_project.process_id
  ORDER BY
    t_manhour_list.yyyymm
    , m_user.user_name
    , t_project.project_code
  ;`
  connection.query(strSql, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/posts', function(req, res, next) {
 // Handle the post for this route
});

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});


