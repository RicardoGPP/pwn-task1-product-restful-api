//Imports required dependencies.
const express = require('express');

//Initializes dataset.
const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
};

//Creates a new route to be used by products.
const router = express.Router();

//Sets 'post product' middleware.
router.post('/', (req, res) => {
    const id = (Math.max(...lista_produtos.produtos.map(p => p.id)) | 0) + 1;

    const product = {
        id,
        ...req.body
    };

    lista_produtos.produtos.push(product);

    res.status(201).json(product);
});

//Sets 'get all products' middleware.
router.get('/', (_, res) => {
    res.status(200).json(lista_produtos.produtos);
});

//Sets 'get product by id' middleware.
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = lista_produtos.produtos.find(p => p.id == id);
    
    if (!product) {
        res.status(404).send(`<h2>No product could be found with ID ${id}.</h2>`);
        return;
    }

    res.status(200).json(product);
});

//Sets 'put product' middleware.
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = lista_produtos.produtos.map(p => p.id).indexOf(id);
    
    if (index == -1) {
        res.status(404).send(`<h2>No product could be found with ID ${id}.</h2>`);
        return;
    }

    const product = {
        id,
        ...req.body
    };

    lista_produtos.produtos.splice(index, 1, product);

    res.status(200).json(product);
});

//Sets 'delete product' middleware.
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = lista_produtos.produtos.find(p => p.id == id);
    
    if (!product) {
        res.status(404).send(`<h2>No product could be found with ID ${id}.</h2>`);
        return;
    }

    lista_produtos.produtos = lista_produtos.produtos.filter(p => p.id != id);

    res.status(200).json(product);
});

//Exports router.
module.exports = router;