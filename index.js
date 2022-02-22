const express = require('express');
const path = require('path')
const fs = require('fs');


const app = express()
const PORT = process.env.PORT || 8080

// leo el archivo de forma sincrona

const products = fs.readFileSync('./data/products.txt', 'utf-8')

const productsParse = JSON.parse(products)

const getProducts = productsParse.map(p => p.title)



//middleware
//app.use(express.static('public'))

//routes

app.get('/api/products',(req, res) => {
    res.send(`${JSON.stringify(getProducts, null, 2)}`)
})

app.get('/api/products/:id',(req, res) => {
    const { id } = req.params;
    const getId = productsParse.find(num=> num.id === parseInt(id))
    res.send(`${JSON.stringify(getId, null, 2)}`)
    
})


const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});
