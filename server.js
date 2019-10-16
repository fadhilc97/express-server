const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'barang_app'
});

connection.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.end('Hello world');
});

app.get('/api/barang', (req, res) => {
    connection.query('SELECT * FROM barang', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

app.get('/api/barang/:id', (req, res) => {
    connection.query('SELECT * FROM barang WHERE id = ' + req.params.id, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

app.post('/api/barang', (req, res) => {
    let nama = req.body.nama;
    let stok = parseInt(req.body.stok);
    let harga = parseInt(req.body.harga);

    let values = [nama, stok, harga];

    connection.query('INSERT INTO barang (nama, stok, harga) VALUES (?)', [values], (err, result) => {
        if(err) throw err;
        res.status(200).json({ 'info' : 'data berhasil dimasukkan' });
        console.log('Data berhasil dimasukkan');
    });
});

app.put('/api/barang/:id', (req, res) => {

    connection.query('SELECT * FROM barang WHERE id = ' + req.params.id, (err, result) => {
        if (err) throw err;
        result.forEach((r) => {
            let id = req.params.id;
            let nama = r.nama;
            let stok = r.stok;
            let harga = r.harga;

            if(req.body.nama != null) nama = req.body.nama;
            if(req.body.stok != null) stok = req.body.stok;
            if(req.body.harga != null) harga = req.body.harga;

            let queryUpdate = `UPDATE barang SET nama = (?), stok = (?), harga = (?) WHERE id = ${id}`;

            connection.query(queryUpdate, [nama, stok, harga], (err, result) => {
                if(err) throw err;
                res.status(200).json({'info' : 'data berhasil diubah'});
            });

        });
    });

});

app.delete('/api/barang/:id', (req, res) => {
    connection.query('DELETE FROM barang WHERE id = ' + req.params.id, (err, result) => {
        res.status(200).json({'info' : 'data berhasil dihapus'});
    });
});

app.listen(1234, () => {
    console.log('Server berhasil dijalankan');
});
