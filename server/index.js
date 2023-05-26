import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({message: 'Hello World'});
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/users', propertyRouter);

const startServer = async () => {
    try {
        //Connect to database        
        connectDB(process.env.MONGODB_URL);

        const port = process.env.PORT || 5000;    
        app.listen(port, () => `Server running on port ${port} 🔥`);        
    } catch (error) {
        console.log(error);
    }
};

startServer();