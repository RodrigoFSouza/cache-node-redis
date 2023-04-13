const express = require('express')
const app = express();

const { createClient } = require('redis')
const client = createClient();

const getAllProducts = async() => {
    const time = Math.random * 5000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Produto 1', 'Produto 2']);
        }, time);
    })
}

app.get("/saved", async () => {
    await client.del('getAllProducts') // exclui a cache antes de atualizar o recurso
    res.send({ ok : true})
});

app.get("/", async (req, res) => {
    const productsFromCache = await client.get('getAllProducts');
    // verifica se o já existe um cache 
    if (productsFromCache) {
        return res.send(JSON.parse(productsFromCache))
    }
    const products = await getAllProducts();
    await client.set('getAllProducts', JSON.stringify(products))
    res.send(products);
});

const startup = async () => {
    await client.connect();

    app.listen(3000, () => {
        console.log("server running...")
    })
};

startup();