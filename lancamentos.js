const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');


app.use(cors());

app.get('/', async (req, res) => {
    try {
        const {data} = await axios('http://127.0.0.1:3001/lancamentos');
        res.json(data)
    } catch (error) {
        console.error(error);
    }
})



app.listen(3002);
