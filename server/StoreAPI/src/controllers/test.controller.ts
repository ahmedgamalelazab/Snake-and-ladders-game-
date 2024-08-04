import express from 'express';

export default () => {
    const router = express.Router();
    
    router.get('/', (req, res) => {
        res.json({
            message: 'Hello World'
        });
    });

    return router;
}


