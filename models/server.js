const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.moviePath = '/api/movies';
        this.ratingPath = '/api/ratings';
        this.ratingMoviesPath = '/api/ratings/ratings';
        this.authPath = '/api/auth';

        //conexión con base de datos
        this.conectarDb();

        // middlewares
        this.middlewares();    

        // rutas de la aplicación
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // lectura de datos
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'))
        this.app.use(this.moviePath, require('../routes/movies'))
        this.app.use(this.ratingPath, require('../routes/ratings'))
        this.app.use(this.ratingMoviesPath, require('../routes/ratings'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        })
    }
}

module.exports = Server;