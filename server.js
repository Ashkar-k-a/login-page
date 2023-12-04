const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const {v4:uuid4} = require('uuid')
const router = require('./router')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuid4(),
    resave:false,
    saveUninitialized:true
}))



app.use('/route',router)

app.get('/',(req,res)=>{
    res.render("index",{title:"Login Page"})
})

app.listen(port,()=>{
    console.log(`Server in http://localhost:${port}`);
});