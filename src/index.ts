import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

// TypeORM
import { createConnection } from 'typeorm';

// import the routers
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import dashboardRouter from './routes/dashboard';

import device_info from './routes/device_info';

const app: express.Application = express();


console.log(`[INFO] Starting server [1/5]`)

// expressjs config
app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


console.log(`[INFO] Starting server [2/5]`)

//set session
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    cookie:{
        secure: false,
        maxAge: 6000000,
    }
}));

console.log(`[INFO] Starting server [3/5]`)

// set static files
app.use('/static', express.static('./src/static'))

console.log(`[INFO] Starting server [4/5]`)



// set the subrouters
app.use('/', loginRouter);
app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/device_info', device_info)

console.log(`[INFO] Starting server [5/5]`)


// try and set the database
console.log(`[INFO] Connecting to the database`)

createConnection()
    .catch()

console.log(`[INFO] Connection Successful`)

// run the server
app.listen(9000, ()=>{
    console.log(`[INFO] Server is listening on port 9000`)
});
