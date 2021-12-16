const express = require('express')
const router = express.Router()
const db = require('./database.js')
const sqlite3 = require('sqlite3').verbose()

//auth user
router.post('/auth', function (req, res, next) {
  let { email, password } = req.body
  db.all(`select *  from user where email='${email}' and password='${password}'`, function (err, rows) {
    if (rows.length > 0) {
      res.json({})
    } else {
      res.json({ error: 'Wrong email or password.' })
    }
  })
})
//auth user
router.post('/info', function (req, res, next) {
  let email = req.body.email
  db.all(`select *  from user where email='${email}'`, function (err, rows) {
    if (rows.length > 0) {
      res.json(rows[0])
    } else {
      res.json({ error: 'Not found' })
    }
  })
})
//user register
router.post('/register', function (req, res, next) {
  let { email, password, phone, first_name, last_name } = req.body
  db.all(`select * from user where email='${email}'`, function (err, rows) {
    if (rows.length > 0) {
      return res.json({ error: 'Email already exists！' })
    } else {
      console.log(`insert into user(first_name,last_name,email,password,phone)
                      values ('${first_name}','${last_name}','${email}','${email}','${password}','${phone}')`)
      db.run(`insert into user(first_name,last_name,email,password,phone)
                      values ('${first_name}','${last_name}','${email}','${password}','${phone}')`,
        function (err, rows) {
        console.log(err,rows)
          return res.json({})
        })
    }
  })
})

module.exports = router
