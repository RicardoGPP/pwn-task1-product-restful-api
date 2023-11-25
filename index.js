//Imports required dependencies.
import express from 'express';
import morgan from 'morgan';
import products from './routes/products.js';

//Creates an express server.
const server = express();

//Sets conversion middlewares.
server.use(express.json());

//Sets logging middleware.
server.use(morgan('common'));

//Sets products resource/router middleware.
server.use('/produtos', products);

//Sets default 404 middleware.
server.use((_, res) => {
    res.status(404).send('<h2>404 - Resource not found.</h2>');
});

//Puts server up.
server.listen(3000, () => {
    console.log('Server is running on port 3000.');
})