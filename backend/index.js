const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors())

// MySQL
const pool = mysql.createPool({
    multipleStatements: true,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'contact',
    port            :'3306'
})

// Mengambil semua data user
app.get('/user', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from users', (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})


// Mengambil data user berdasarkan ID
app.get('/user/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from users WHERE id_user = ?', [req.params.id], (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

// Hapus data user
app.delete('/user/delete/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE FROM users WHERE id_user = ?', [req.params.id], (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(`Beer with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})


// Menambahkan user baru
app.post('/user/add', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO users SET ?', params , (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`User dengan nama: ${params.nama_lengkap} telah ditambahkan.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Update data user
app.put('/user/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id_user, nama_lengkap, no_handphone, email, alamat } = req.body

        connection.query('UPDATE users SET nama_lengkap = ?, no_handphone = ?, email = ?, alamat = ? WHERE id_user = ?', [nama_lengkap, no_handphone, email, alamat, id_user] , (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(`User dengan nama: ${nama_lengkap} telah diubah.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})



// Listen on enviroment port 5000
app.listen(port, () => console.log(`Listen on port ${port}`))