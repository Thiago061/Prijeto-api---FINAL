import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "212822@sarah10*",
  database: "crud",
});