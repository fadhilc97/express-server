const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'barangApplication'
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.end('Hello world');
});

app.get('/api/barang', (req, res) => {
    connection.query('SELECT * FROM barang', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/api/barang/:id', (req, res) => {
    connection.query('SELECT * FROM barang WHERE id = ' + req.params.id, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/barang', (req, res) => {
    let nama = req.body.nama;
    let stok = parseInt(req.body.stok);
    let harga = parseInt(req.body.harga);

    let values = [nama, stok, harga];

    connection.query('INSERT INTO barang (nama, stok, harga) VALUES (?)', [values], (err, result) => {
        if(err) throw err;
        res.json({ 'info' : 'data berhasil dimasukkan' });
        console.log('Data berhasil dimasukkan');
    });
});

app.put('/api/barang/:id', (req, res) => {
    let id = req.params.id;
    let nama = req.body.nama;
    let stok = parseInt(req.body.stok);
    let harga = parseInt(req.body.harga);
    
    let updateQuery = `UPDATE barang SET nama = ${nama}, stok = ${stok}, harga = ${harga} WHERE id = ${id}`;

    connection.query(updateQuery, (err, result) => {
        if(err) throw err;
        res.json({ 'info' : 'data berhasil diubah' });
        console.log('Data berhasil diubah');
    });
});

app.delete('/api/barang/:id', (req, res) => {

});

app.listen(1234, () => {
    console.log('Server berhasil dijalankan');
});
