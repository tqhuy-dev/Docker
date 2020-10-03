const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const redisp = require('./redis-provider/redis.provider')

app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// redisp.initRedis()


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.get('/api/v1/', (req, res, next) => {
    res.status(200).json({
        message: 'api is working',
        status: 'success'
    })
});

app.get('/api/v1/redis',async  (req, res, next) => {
    const data = await redisp.getKey()
    res.status(200).json({
        message: data,
        status: 'success'
    })
});

app.post('/api/v1/redis',(req, res, next) => {
    redisp.addKey(req.body.key)
    res.status(200).json({
        message: true,
        status: 'success'
    })
});

app.use((req, res, next) => {
    next({
        status: 404,
        message: 'request not found 3'
    })
})

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.json({
        message: error.message
    })
})

module.exports = app;