import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import routes from './routes';

const swaggerDocs = require('./swagger.json');

mongoose.connect('mongodb+srv://default:ol0VITgkIpbjjgLq@desafiogama.glf2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/v1',routes);

app.listen(port);