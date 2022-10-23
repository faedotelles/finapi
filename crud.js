const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express();
const {convertLancamentos} = require('./lanfin')
const {convertCep} = require('./lanfin')


const port = 3000;

app.use(cors());
app.listen(port)
app.use(express.json());

app.get('/lancamentos/:idlanfin?', (req, res) => {
    let filter = '';
    if (req.params.idlanfin) {
        filter = ' WHERE IDLANFIN =' + parseInt(req.params.idlanfin)
    }
    let sql = `SELECT * FROM MYSQL.LANCAMENTOS ORDER BY IDLANFIN DESC LIMIT 10`;
    executeSQLQry(sql + filter, res);
});

app.delete('/lancamentos/:idlanfin', (req, res) => {
    let sql = 'DELETE FROM MYSQL.LANCAMENTOS WHERE IDLANFIN=' + parseInt(req.params.idlanfin);
    executeSQLQry(sql, res)
});

app.post('/lancamentos', (req, res) => {
    let rel  = convertLancamentos(req);
    let sql = `INSERT INTO MYSQL.LANCAMENTOS (value, method, accountid, category) 
    values (${rel.value},${rel.method},${rel.accountid},${rel.category})`
    executeSQLQry(sql, res);
});

app.post('/cep', (req, res) => {
    let rel  = convertCep(req);
    let sql = `INSERT INTO MYSQL.CEP (CEP,RUA,NUMERO,BAIRRO,CIDADE,UF,COMPLEMENTO) 
    values (${rel.cep},${rel.rua},${rel.numero},${rel.bairro},${rel.cidade},${rel.uf},${rel.complemento})`
    console.log(sql)
    executeSQLQry(sql, res);
});

app.patch('/lancamentos/:idlanfin', (req, res) =>{
    const rel = convertLancamentos(req)
    let filter = ''
    let sql = `UPDATE MYSQL.LANCAMENTOS SET VALUE = ${rel.value}, METHOD = ${rel.method},
     ACCOUNTID = ${rel.accountid}, CATEGORY = ${rel.category} WHERE IDLANFIN = ${req.params.idlanfin}`;
    executeSQLQry(sql, res)
})

// value method accountid category

function executeSQLQry(sql, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'ADMIN',
        password: 'KERNEL123',
        database: 'MySql'
    })
    connection.query(sql, (error, results, fields) => {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end()
    })
}
