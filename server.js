const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODBURI
const MongoDBStore = require('connect-mongodb-session')(session)

//SET CORS Middleware
const whitelist = ['http://localhost:3001', 'https://r-u-tracking-frontend.herokuapp.com/']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

const SESSION_SECRET = process.env.SESSION_SECRET
app.set('trust proxy', 1 )
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODBURI,
        collection: 'mySessions'
    }), 
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))

//SETUP mongoose
const db = mongoose.connection
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Welcome to the Database!')
})

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else{
        res.status(403).json({ message: "Login is required"})
    }
}


app.use(express.json())

app.use('/swims', require('./controllers/swimController'))
app.use('/runs', require('./controllers/runController'))
app.use('/exercises', require('./controllers/workoutController'))
app.use('/users', require('./controllers/userController'))

app.listen(PORT, () => {
  console.log('Tracking on port', PORT,)
})